import lz from 'lz-string';

type TOnMessage = (opt: MessageEvent<any>) => void;
type TPostMessage = (opt: [string, any]) => void;
type Status = "USER_OPEN" | "USER_CLOSE" | "OPEN" | "CONNECT" | "CLOSE" | "ERROR" | "ABORT";
type TDecoding = (message: ArrayBuffer) => [string | null, any | null, number | null];
type TEncoding = (message: [string | null, any | null, number | null] | object[]) => Uint8Array;
type TClientOptions = {
    url: string;
    params: { [key: string]: string | number; };
}

class Timeout {
    private timeoutIndexMax: number = 5;
    private timeoutIndex: number = 0;
    private timeout: any;
    private get timeoutDelay() { return [1000, 2000, 5000, 10000][this.timeoutIndex] || 10000 };
    private get isError() { return this.timeoutIndex >= this.timeoutIndexMax }

    closeTimeout = () => {
        clearTimeout(this.timeout);
        this.timeoutIndex = 0;
        this.timeout = null;
    }
    startTimeout = (callback: () => void, error: () => void) => {
        clearTimeout(this.timeout);
        this.timeout = null;
        this.timeout = setTimeout(() => {
            this.timeoutIndex = this.timeoutIndex + 1;
            this.isError ? error() : callback();
        }, this.timeoutDelay)
    }
}

class Client extends Timeout {
    client?: WebSocket;
    clientURL: TClientOptions["url"];
    clientParams: TClientOptions["params"];

    socketStatus: Status = "CLOSE";

    constructor(opt: TClientOptions) {
        super();
        this.clientURL = opt.url;
        this.clientParams = opt.params;
        this.client = this.initSocket();
    }

    get isConnecting() { return this.client?.readyState === this.client?.CONNECTING };
    get isOpened() { return this.client?.readyState === this.client?.OPEN };
    get isOpen() { return (this.isConnecting || this.isOpened) };

    get isClosing() { return this.client?.readyState === this.client?.CLOSING };
    get isClosed() { return this.client?.readyState === this.client?.CLOSED };
    get isClose() { return (this.isClosed || this.isClosing) }

    get status() { return this.socketStatus; }
    set status(value) {
        if (["OPEN", "CONNECT", "CLOSE", "ERROR"].includes(value) && this.status != "USER_CLOSE") {
            switch (value) {
                case "USER_OPEN": this.eventUserOpen(); break;
                case "USER_CLOSE": this.eventUserClose(); break;
                case "OPEN": this.eventOpen(); break;
                case "CONNECT": this.eventConnect(); break;
                case "CLOSE": this.eventClose(); break;
                case "ERROR": this.eventError(); break;
            }
        } else {
            switch (value) {
                case "USER_OPEN": this.eventUserOpen(); break;
                case "USER_CLOSE": this.eventUserClose(); break;
                case "ABORT": this.eventUserClose(); break;
            }
        }
        this._postMessage([value, {}, null])
        this.socketStatus = value;
    }

    connect = () => { if (this.isClose) { this.status = "USER_OPEN" } };
    disconnect = () => { if (this.isOpen) { this.status = "USER_CLOSE" } };

    onmessage?: TOnMessage;
    postMessage: TPostMessage = ([event, value]) => {
        switch (event) {
            case "send": this.send(value); break;
            case "connect": this.connect(); break;
            case "disconnect": this.disconnect(); break;
        }
    }
    private _postMessage = (opt: [string, any, number | null]) => {
        const e = { data: opt }
        this.onmessage && this.onmessage((e as MessageEvent<any>));
    }

    /** Инициализация нового сокета */
    initSocket = () => {
        const socket = new WebSocket(this.clientURL);
        socket.binaryType = "arraybuffer";
        socket.onmessage = this.eventMessage;
        socket.onopen = () => this.status = "OPEN";
        socket.onclose = () => this.status = "CLOSE";
        return socket;
    }

    //** Закрытие соединения на сокете */
    private destroySocket = () => { this.client?.close(); }

    /** Ручное открытие соединения */
    private eventUserOpen = () => {
        this.closeTimeout();
        this.client = this.initSocket();
    }

    /** Ручное закрытие соединения */
    private eventUserClose = () => {
        this.closeTimeout();
        this.destroySocket();
    }

    /** Открытие со стороны сервера */
    private eventOpen = () => { }

    /** 
     * Успешная авторизация.
     * Отправляем все запросы которые были в кеше.
    */
    private eventConnect = () => { this.closeTimeout() }

    /** Закрытие со стороны сервера */
    private eventClose = () => {
        this.destroySocket();
        this.startTimeout(() => {
            this.client = this.initSocket();
        }, () => {
            this.closeTimeout();
            this.status = "ERROR";
        })
    }

    /** Полное закрытие из за превышения лимита переподключений*/
    eventError = () => { }

    /** Обработка сообщений после успешного подключения */
    eventMessage = (event: MessageEvent<any>) => {
        const [type, value, requestId] = this.decoding(event.data);
        if (this.status === "CONNECT" && type) { this._postMessage([type, value, requestId]) }
        else if (this.status === "OPEN" && type === "connect") { this.status = "CONNECT" }
        else if (this.status === "OPEN" && type === "handshake") { this.send(["handshake", this.clientParams, 1]); }
    }

    send = ([event, value, requestId]: [string, any, number]) => {
        const message = this.encoding([event, value, requestId]);
        this.client && this.client.send(message);
    }

    decoding: TDecoding = (message) => {
        try {
            const string = new TextDecoder("utf8").decode(message, { stream: true });
            const [type, value, requstId] = JSON.parse(lz.decompress(string) || "");
            return type ? [type, value, requstId] : [null, null, null];
        } catch { return [null, null, null] }
    }

    encoding: TEncoding = (message) => {
        try {
            const string = JSON.stringify(message);
            return new TextEncoder().encode(string)
        } catch { return new TextEncoder().encode("") }
    }

}

export default Client;
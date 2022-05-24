type TOnMessage = (opt: MessageEvent<any>) => void;
type TPostMessage = (opt: [string, any]) => void;
type Status = "USER_OPEN" | "USER_CLOSE" | "OPEN" | "CONNECT" | "CLOSE" | "ERROR" | "ABORT";
type TDecoding = (message: ArrayBuffer) => [string | null, any | null, number | null];
type TEncoding = (message: [string | null, any | null, number | null] | object[]) => Uint8Array;
type TClientOptions = {
    url: string;
    params: { [key: string]: string | number; };
}

const worker = (() => {
    class Client {
        client;
        clientURL;
        clientParams;

        socketStatus: Status = "CLOSE";

        timeoutIndexMax = 5;
        timeoutIndex = 0;
        timeout: any;

        constructor(opt: TClientOptions) {
            this.clientURL = opt.url;
            this.clientParams = opt.params;
            this.client = this.initSocket();
        }

        timeoutDelay() { return [1000, 2000, 5000, 10000][this.timeoutIndex] || 10000 };
        isError() { return this.timeoutIndex >= this.timeoutIndexMax }

        isConnecting() { return this.client.readyState === this.client.CONNECTING };
        isOpened() { return this.client.readyState === this.client.OPEN };
        isOpen() { return (this.isConnecting || this.isOpened) };

        isClosing() { return this.client.readyState === this.client.CLOSING };
        isClosed() { return this.client.readyState === this.client.CLOSED };
        isClose() { return (this.isClosed || this.isClosing) }

        getStatus() { return this.socketStatus; }
        setStatus(value: Status) {
            if (["OPEN", "CONNECT", "CLOSE", "ERROR"].includes(value) && this.getStatus() != "USER_CLOSE") {
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
            postMessage([value, {}, null]);
            this.socketStatus = value;
        }

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
                this.isError() ? error() : callback();
            }, this.timeoutDelay())
        }

        connect = () => { if (this.isClose()) { this.setStatus("USER_OPEN") } };
        disconnect = () => { if (this.isOpen()) { this.setStatus("USER_CLOSE") } };

        /** Инициализация нового сокета */
        initSocket = () => {
            const socket = new WebSocket(this.clientURL);
            socket.binaryType = "arraybuffer";
            socket.onmessage = this.eventMessage;
            socket.onopen = () => this.setStatus("OPEN");
            socket.onclose = ({ code }) => this.setStatus(code === 1006 ? "ABORT" : "CLOSE");
            return socket;
        }

        //** Закрытие соединения на сокете */
        private destroySocket = () => { this.client.close(); }

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
        private eventConnect = () => { this.closeTimeout(); }

        /** Закрытие со стороны сервера */
        private eventClose = () => {
            this.destroySocket();
            this.startTimeout(() => {
                this.client = this.initSocket();
            }, () => {
                this.closeTimeout();
                this.setStatus("ERROR");
            })
        }

        /** Полное закрытие из за превышения лимита переподключений*/
        eventError = () => { }

        /** Обработка сообщений после успешного подключения */
        eventMessage = (event: MessageEvent<any>) => {
            const [type, value, requestId] = this.decoding(event.data);
            if (this.getStatus() === "CONNECT" && type) { postMessage([type, value, requestId]) }
            else if (this.getStatus() === "OPEN" && type === "connect") { this.setStatus("CONNECT") }
            else if (this.getStatus() === "OPEN" && type === "handshake") { this.send(["handshake", this.clientParams, 1]); }
        }

        send = ([event, value, requestId]: [string, any, number]) => {
            const message = this.encoding([event, value, requestId]);
            this.client && this.client.send(message);
        }

        decoding: TDecoding = (message) => {
            try {
                const string = new TextDecoder("utf8").decode(message);
                const [type, value, requstId] = JSON.parse(string);
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

    let client: Client | undefined = undefined;
    onmessage = (e) => {
        const [event, value] = e.data;
        switch (event) {
            case "init": client = new Client(value); break;
            case "send": client && client.send(value); break;
            case "connect": client && client.connect(); break;
            case "disconnect": client && client.disconnect(); break;
        }
    }
});

export default worker; 
import ClientWorker from './client.worker';
import ClientModule from './client.module';

declare global {
    interface Window {
        esocket?: customClient
    }
}

type TClientOptions = {
    url: string;
    params: { [key: string]: string | number };
}

type TEvents = (callback: (event: string, value: any) => void) => void;

class customClient {
    private client: Worker | ClientModule;
    private requestCallback: { [key: number]: (value: any, type: string, requestId: number) => void } = {};
    private eventsCallback: (event: string, value: any) => void = () => { };

    private requestId: number = 1;
    private get getID() { return ++this.requestId; };

    constructor(opt: TClientOptions) {
        if (typeof window.Worker === "function") {
            const code = ClientWorker.toString();
            const blob = new Blob([code], { type: 'text/javascript' })
            const client = new Worker(URL.createObjectURL(blob));
            client.onmessage = this.eventMessage;
            client.postMessage(["init", opt]);
            this.client = client;
        } else {
            const client = new ClientModule(opt);
            client.onmessage = this.eventMessage;
            this.client = client;
        }
    }

    eventMessage = (e: MessageEvent<any>) => {
        const [type, value, requestId] = e.data;
        const callback = this.requestCallback[requestId];
        callback && callback(value, type, requestId);
        this.eventsCallback(type, value);
    }

    events: TEvents = (callback) => this.eventsCallback = callback;
    connect = () => { this.client.postMessage(["connect", {}]) }
    disconnect = () => { this.client.postMessage(["disconnect", {}]) }
    send = (event: string, value: any) => {
        this.client.postMessage(["send", [event, value, this.getID]])
    }
}

export default customClient;
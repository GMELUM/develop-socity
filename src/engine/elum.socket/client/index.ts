import { useEffect } from 'react';
import eventClose from "./events/close";
import eventConnect from "./events/connect";
import eventDisconnect from "./events/disconnect";
import eventEvents from "./events/events";
import eventOpen from "./events/open";
import eventSend from "./events/send";

type TCallback = (event: string, value: any) => void;
type TUseEvents = (callback: TCallback) => void;

const client = {
    open: eventOpen,
    close: eventClose,
    connect: eventConnect,
    disconnect: eventDisconnect,
    events: eventEvents,
    send: eventSend,
}

export const useEvents: TUseEvents = (callback) => {
    useEffect(() => { client.events(callback) }, [])
}

export default client;
type TEvents = (callback: (event: string, value: any) => void) => void;

const eventEvents: TEvents = (callback) => {
    const socket = window.esocket;
    socket && socket.events(callback);
}

export default eventEvents;
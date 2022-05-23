const eventSend = (event: string, value: any) => {
    if(window) {
        
    }
    const socket = window.esocket;
    socket && socket.send(event, value);
}

export default eventSend;
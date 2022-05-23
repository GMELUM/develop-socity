const eventDisconnect = () => {
    const socket = window.esocket;
    socket && socket.disconnect();
}

export default  eventDisconnect;
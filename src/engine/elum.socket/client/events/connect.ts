const eventConnect = () => {
    const socket = window.esocket;
    socket && socket.connect();
}

export default eventConnect;
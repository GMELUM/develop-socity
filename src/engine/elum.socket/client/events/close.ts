const eventClose = () => {
    const esocket = window.esocket;
    esocket ?
        console.log() :
        delete window.esocket;
}

export default eventClose;
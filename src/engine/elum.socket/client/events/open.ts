import customClient from "../worker";

type TEventOpen = (opt: {
    url: string;
    params: { [key: string]: string | number };
}) => void;

const eventOpen: TEventOpen = (opt) => { window.esocket = new customClient(opt) }

export default eventOpen;
import { useEffect } from "react";

type TUsetTimeout = (callback: () => void, delay?: number) => void;
const useTimeout: TUsetTimeout = (callback, delay = 1000) => {
    useEffect(() => {
        const timer = window.setTimeout(callback, delay);
        return () => { window.clearTimeout(timer) };
    }, [delay, callback])
}

export default useTimeout;
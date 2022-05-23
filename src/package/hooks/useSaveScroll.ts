import { ScrollContext } from "package";
import { RefObject, useContext, useLayoutEffect, useRef, MouseEvent } from "react";
import useEventListener from "./useEventListener";

declare global {
    interface Window {
        scrollPanels: { [key: string]: number }
    }
}

type TUseSaveScroll = (
    name: string,
    element: RefObject<HTMLDivElement>,
    handler?: (event: MouseEvent<HTMLDivElement>) => void
) => void;

const useSaveScroll: TUseSaveScroll = (name, element, handler) => {
    const context = useContext(ScrollContext);
    const scrollTop = useRef(context.getvalue(name));
    if (!context) { throw new Error('AppContext must be used with AppProvider!') }

    useEventListener("scroll", scrollHandler, element, { passive: false });

    useLayoutEffect(() => {
        element.current?.scrollTo({ top: scrollTop.current || 0 });
        return () => { context.setValue(name, scrollTop.current) }
    }, [])

    function scrollHandler(event: MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        if (context && event.target instanceof HTMLDivElement) {
            scrollTop.current = event.target.scrollTop;
            handler && handler(event);
        }
    }
}

export class SaveContext {
    private value: { [key: string]: number } = {};
    constructor(value: { [key: string]: number }) {
        this.value = value;
    }
    public getvalue = (title: string) => this.value[title] || 0;
    public setValue = (title: string, value: number) => this.value[title] = value;
}

export default useSaveScroll;
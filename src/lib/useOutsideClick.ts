import {useEffect, useRef} from "react";

export const useOutsideClick = (callback: (e: MouseEvent) => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!ref?.current?.contains(e.target as Node)) {
                callback(e);
            }
        }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [callback]);

    return ref;
};
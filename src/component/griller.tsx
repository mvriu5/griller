"use client";

import React, {forwardRef, HTMLAttributes, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {cn} from "@/lib/utlis";
import {X} from "lucide-react";

interface GrillerProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    secondTitle?: string;
    icon?: ReactNode;
    placement?: "tr" | "tl" | "br" | "bl";
    closeButton?: boolean;
    duration?: number;
    closeSize?: number;
    titleClassname?: string;
    secondTitleClassname?: string;
    closeClassname?: string;
}

type GrillerRef =  {
    show: () => void;
    hide: () => void;
    current: HTMLDivElement | null;
};

const Griller = forwardRef<GrillerRef, GrillerProps>(({ title, secondTitle, icon, placement, closeButton, duration, closeSize,
                                                    titleClassname, secondTitleClassname, closeClassname, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const [animate, setAnimate] = useState(false);
    const grillerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let showTimeout: NodeJS.Timeout, hideTimeout: NodeJS.Timeout;
        if (visible) {
            setAnimate(true);
            showTimeout = setTimeout(() => {
                if (grillerRef.current) {
                    grillerRef.current.classList.add('opacity-100', 'translate-y-0');
                    grillerRef.current.classList.remove('opacity-0', 'translate-y-full');
                }
            }, 10);
            if (duration) {
                hideTimeout = setTimeout(() => {
                    if (grillerRef.current) {
                        grillerRef.current.classList.remove('opacity-100', 'translate-y-0');
                        grillerRef.current.classList.add('opacity-0', 'translate-y-full');
                    }
                    hideTimeout = setTimeout(() => {
                        setVisible(false);
                        setAnimate(false);
                    }, 500);
                }, duration);
            }
        }
        return () => {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
        };
    }, [visible, duration]);

    useImperativeHandle(ref, () => ({
        show: () =>  {
            setVisible(true);
            setAnimate(true);
        },
        hide: () => {
            setVisible(false);
            setVisible(false);
        },
        current: grillerRef.current,
    }));

    return (
        <>
            {animate &&
                <div className={cn("fixed z-50 shadow-lg", {
                    "bottom-4 right-4": !placement || placement === "br",
                    "top-4 right-4": placement === "tr",
                    "top-4 left-4": placement === "tl",
                    "bottom-4 left-4": placement === "bl",
                })}>

                    <div className={cn("w-72 h-16 flex flex-row justify-between p-2 pl-4 bg-zinc-200 rounded-lg",className)} ref={grillerRef} {...props}>
                        <div className={"flex flex-row items-center space-x-4"}>
                            {icon}
                            <div className={"flex flex-col"}>
                                <span className={cn("text-sm text-zinc-700 font-medium", titleClassname)}>{title}</span>
                                {secondTitle && <span className={cn("text-xs text-zinc-500", secondTitleClassname)}>{secondTitle}</span>}
                            </div>
                        </div>
                        {closeButton &&
                            <div className={"h-max p-0.5 rounded-lg cursor-pointer hover:bg-zinc-300"}
                                 onClick={() => {setVisible(false); setAnimate(false);}}
                            >
                                <X size={closeSize ?? 16} className={cn("text-zinc-500", closeClassname)}/>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    );
});
Griller.displayName = "Griller";

export {Griller};
export type { GrillerRef };


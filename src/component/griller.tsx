"use client";

import React, {forwardRef, HTMLAttributes, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {cn} from "@/lib/utlis";
import {X} from "lucide-react";
import {rgb} from "polished";

type Position = "tr" | "tl" | "tc" | "br" | "bl" | "bc";

interface GrillerProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    secondTitle?: string;
    icon?: ReactNode;
    position?: Position;
    color?: string;
    closeButton?: boolean;
    duration?: number;
    titleClassname?: string;
    secondTitleClassname?: string;
    iconClassname?: string;
    closeClassname?: string;
    closeDivClassname?: string;
    outerClassname?: string;
}

type GrillerRef =  {
    show: () => void;
    hide: () => void;
    current: HTMLDivElement | null;
};

const Griller = forwardRef<GrillerRef, GrillerProps>(({title, secondTitle, icon, position, closeButton, duration,
                                                          color, titleClassname, secondTitleClassname,
                                                          closeClassname, closeDivClassname, outerClassname, iconClassname,
                                                          className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [width, setWidth] = useState<number>(0);
    const grillerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (grillerRef.current) {
            setWidth(grillerRef.current.offsetWidth);
        }
    }, [visible]);

    useEffect(() => {
        let showTimeout: NodeJS.Timeout, hideTimeout: NodeJS.Timeout;
        if (visible) {
            setAnimate(true);
            showTimeout = setTimeout(() => open(), 10);
            if (duration) {
                hideTimeout = setTimeout(() => close(), duration);
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
            setAnimate(false);
        },
        current: grillerRef.current,
    }));

    const close = () => {
        if (grillerRef.current) {
            if (position === "bl" || position === "bc" || position === "br" || !position) {
                grillerRef.current.classList.remove('opacity-100', 'translate-y-0');
                grillerRef.current.classList.add('opacity-0', 'translate-y-full');
            } else if (position === "tl" || position === "tc" || position === "tr") {
                grillerRef.current.classList.remove('opacity-100', '-translate-y-0');
                grillerRef.current.classList.add('opacity-0', '-translate-y-full');
            }
        }
        setTimeout(() => {
            setVisible(false);
            setAnimate(false);
        }, 500);
    }

    const open = () => {
        if (grillerRef.current) {
            if (position === "bl" || position === "bc" || position === "br" || !position) {
                grillerRef.current.classList.add('opacity-100', 'translate-y-0');
                grillerRef.current.classList.remove('opacity-0', 'translate-y-full');
            } else if (position === "tl" || position === "tc" || position === "tr") {
                grillerRef.current.classList.add('opacity-100', '-translate-y-0');
                grillerRef.current.classList.remove('opacity-0', '-translate-y-full');
            }
        }
    }

    return (
        <>
            {animate &&
                <div className={cn("fixed z-50 shadow-lg shadow-zinc-300 rounded-lg transition-all duration-500 ease-in-out opacity-0", {
                    "top-4 right-4 -translate-y-full": position === "tr",
                    "top-4 left-4 -translate-y-full": position === "tl",
                    "top-4 left-1/2 -translate-y-full": position === "tc",
                    "bottom-4 right-4 translate-y-full": !position || position === "br",
                    "bottom-4 left-4 translate-y-full": position === "bl",
                    "bottom-4 left-1/2 translate-y-full": position === "bc",
                }, outerClassname)}
                     style={position === "tc" || position === "bc" ? { marginLeft: `-${width / 2}px` } : {}}
                     ref={grillerRef}
                >

                    <div className={cn("min-w-72 min-h-16 flex flex-row justify-between p-2 pl-4 rounded-lg border border-zinc-200", className)}
                         style={color ? { backgroundColor: color } : { backgroundColor: rgb(250, 250, 250) }}
                         {...props}
                    >
                        <div className={"flex flex-row items-center"}>
                            <div className={cn("text-zinc-700", iconClassname)}>
                                {icon}
                            </div>
                            <div className={cn("flex flex-col max-w-60", icon && "ml-4")}>
                                <span className={cn("text-sm text-zinc-700 font-medium text-nowrap truncate", titleClassname)}>{title}</span>
                                {secondTitle && <span className={cn("text-xs text-zinc-500", secondTitleClassname)}>{secondTitle}</span>}
                            </div>
                        </div>
                        {closeButton &&
                            <div className={cn("h-max p-0.5 rounded-lg cursor-pointer hover:bg-zinc-100", closeDivClassname)}
                                 onClick={() => close()}
                            >
                                <X size={16} className={cn("text-zinc-500", closeClassname)}/>
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
export type { GrillerRef, Position };

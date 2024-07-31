"use client";

import React, {HTMLAttributes, ReactNode, useEffect, useRef, useState} from "react";
import {X} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import clsx, {ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));

type Position = "tr" | "tl" | "tc" | "br" | "bl" | "bc";

export const positionClasses = (position: Position) => {
    if (position === 'tr') return `top-4 right-4`;
    if (position === 'tl') return `top-4 left-4`;
    if (position === 'tc') return `top-4 left-1/2`;
    if (position === 'br') return 'bottom-4 right-4';
    if (position === 'bl') return 'bottom-4 left-4';
    if (position === 'bc') return 'bottom-4 left-1/2';
    return '';
}

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
    id: string;
    title: string;
    secondTitle?: string;
    icon?: ReactNode;
    position?: Position;
    color?: string;
    closeButton?: boolean;
    actionButton?: boolean;
    onAction?: () => void;
    actionButtonText?: string;
    duration?: number;
    titleClassname?: string;
    secondTitleClassname?: string;
    iconClassname?: string;
    closeClassname?: string;
    closeDivClassname?: string;
    motionClassname?: string;
    actionButtonClassname?: string;
}

const Toast: React.FC<ToastProps & {
    removeToast: (id: string) => void,
    isPaused: boolean,
}> = ({id, title, secondTitle, icon, position = "br", closeButton,
                       actionButton, onAction, actionButtonText, duration = 3000, color, titleClassname,
         secondTitleClassname, closeClassname, closeDivClassname, motionClassname, iconClassname, actionButtonClassname,
         className, removeToast, isPaused, ...props }) => {

    const [visible, setVisible] = useState(true);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const toastRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const remainingTimeRef = useRef<number>(duration);

    useEffect(() => {
        if (toastRef.current) {
            setWidth(toastRef.current.offsetWidth);
            setHeight(toastRef.current.offsetHeight);
        }
    }, [visible]);

    useEffect(() => {
        let startTime: number;

        const tick = () => {
            if (!isPaused) {
                const now = Date.now();
                remainingTimeRef.current -= now - startTime;
                startTime = now;

                if (remainingTimeRef.current <= 0) {
                    setVisible(false);
                } else {
                    timeoutRef.current = setTimeout(tick, 100); // Check every 100ms
                }
            } else {
                timeoutRef.current = setTimeout(tick, 100);
            }
        };

        startTime = Date.now();
        timeoutRef.current = setTimeout(tick, 100);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [duration, isPaused]);

    const isTopPositioned = ['tr', 'tl', 'tc'].includes(position);

    const variants = {
        initial: { opacity: 0, y: isTopPositioned ? '-120%' : '120%' },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: isTopPositioned ? '-120%' : '120%' }
    };

    return (
        <AnimatePresence onExitComplete={() => removeToast(id)}>
            {visible && (
                <motion.div
                    key={id}
                    ref={toastRef}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    transition={{duration: 0.5,}}
                    className={cn("shadow-xs shadow-zinc-900 rounded-lg", positionClasses(position), motionClassname)}
                    style={position === "tc" || position === "bc" ? { marginLeft: `-${width / 2}px` } : {}}
                >
                    <div
                        className={cn("min-w-72 min-h-16 flex flex-row justify-between p-2 pl-4 rounded-lg border border-zinc-200", className)}
                        style={{backgroundColor: color || 'rgb(250, 250, 250)'}}
                        {...props}
                    >
                        <div className={cn("flex flex-row items-center space-x-2", closeButton && "mr-2")}>
                            {icon && (
                                <div className={cn("text-zinc-700", iconClassname)}>
                                    {icon}
                                </div>
                            )}
                            <div className={cn("flex flex-col max-w-60", icon && "ml-4", actionButton)}>
                                <span className={cn("text-sm text-zinc-700 font-medium text-nowrap truncate", titleClassname)}>{title}</span>
                                {secondTitle && (<span className={cn("text-xs text-zinc-500", secondTitleClassname)}>{secondTitle}</span>)}
                            </div>
                            {actionButton &&
                                <button className={cn("h-max py-1 px-2 rounded-lg bg-zinc-100 " +
                                    "border border-zinc-300 text-xs text-zinc-500 hover:bg-zinc-200", actionButtonClassname)}
                                        onClick={onAction}>
                                    {actionButtonText || "Undo"}
                                </button>
                            }
                        </div>
                        {closeButton &&
                            <div className={cn("h-max p-0.5 rounded-lg cursor-pointer hover:bg-zinc-100", closeDivClassname)}
                                 onClick={() => setVisible(false)}
                            >
                                <X size={16} className={cn("text-zinc-500", closeClassname)}/>
                            </div>
                        }
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export {Toast};
export type {ToastProps, Position};


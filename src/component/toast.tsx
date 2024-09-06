"use client";

import React, {HTMLAttributes, ReactNode, useEffect, useRef, useState} from "react";
import {X} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import clsx, {ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));

// Position & Theme type declarations
type Position = "tr" | "tl" | "tc" | "br" | "bl" | "bc";
type Theme = "light" | "dark";

// positionClasses function to determine the position of the toast
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
    // unique id for the toast
    id: string;
    // title of the toast
    title: string;
    // subtitle of the toast
    subtitle?: string;
    // icon for the toast
    icon?: ReactNode;
    // position of the toast (default is "br")
    position?: Position;
    // theme of the toast (default is "light")
    theme?: Theme;
    // scale of the toast (default is 1), only changes by giving a value to the scaleDecrease property in the toaster
    scale?: number;
    // show close button
    closeButton?: boolean;
    // show action button
    actionButton?: boolean;
    // action button callback function
    onAction?: () => void;
    // action button text
    actionButtonText?: string;
    // duration until the toast disappears (default is 3000ms)
    duration?: number;

    // custom classnames
    titleClassname?: string;
    subtitleClassname?: string;
    iconClassname?: string;
    closeClassname?: string;
    closeDivClassname?: string;
    motionClassname?: string;
    actionButtonClassname?: string;
}

const Toast: React.FC<ToastProps & {
    removeToast: (id: string) => void,
    isPaused: boolean,
}> = ({
   id, title, subtitle, icon, scale = 1, position = "br", closeButton, actionButton, onAction, actionButtonText,
   duration = 3000, theme = "light", titleClassname, subtitleClassname, closeClassname, closeDivClassname,
   motionClassname, iconClassname, actionButtonClassname, className, removeToast, isPaused, ...props
}) => {

    // state for visibility of the toast
    const [visible, setVisible] = useState(true);
    // state for width and height of the toast, for position-purposes
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    // reference for the toast element
    const toastRef = useRef<HTMLDivElement>(null);
    // reference for the timeout
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    // reference for the remaining time, pauses if toast is hovered
    const remainingTimeRef = useRef<number>(duration);

    // mount and unmount effect for the timeout
    useEffect(() => {
        if (toastRef.current) {
            setWidth(toastRef.current.offsetWidth);
            setHeight(toastRef.current.offsetHeight);
        }
    }, [visible]);

    // mounts the timeout for the duration of the toast
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

    // checks if the toast is top or bottom positioned
    const isTopPositioned = ['tr', 'tl', 'tc'].includes(position);

    // framer-motion variants for the toast-motion
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
                    className={cn("rounded-lg", positionClasses(position), motionClassname)}
                    style={{...(position === "tc" || position === "bc" ? { marginLeft: `-${(width * scale) / 2}px` } : {}),
                        transformOrigin: isTopPositioned ? 'center top' : 'center bottom'}}
                >
                    <div className={cn("min-w-72 min-h-16 flex flex-row justify-between p-2 pl-4 rounded-lg shadow-md",
                            theme === "light" ?
                                "bg-zinc-50 border border-zinc-200" :
                                "bg-zinc-800 border border-zinc-700",
                            className
                        )}
                        style={{ transform: `scale(${scale})` }}
                        {...props}
                    >
                        <div className={cn("flex flex-row items-center space-x-2", closeButton && "mr-2")}>
                            {icon &&
                                <div className={cn(iconClassname, theme === "light" ? "text-zinc-600" : "text-zinc-100",)}>
                                    {icon}
                                </div>
                            }
                            <div className={cn("flex flex-col max-w-60", icon && "ml-4", actionButton)}>
                                <span className={cn("text-sm font-medium text-nowrap truncate",
                                    theme === "light" ? "text-zinc-600" : "text-zinc-100", titleClassname)}
                                >
                                    {title}
                                </span>
                                {subtitle && subtitle.trim() !== "" && (
                                    <span className={cn("text-xs", theme === "light" ? "text-zinc-400" : "text-zinc-300", subtitleClassname)}>
                                        {subtitle}
                                    </span>
                                )}
                            </div>
                            {actionButton &&
                                <button
                                    className={cn("h-max py-1 px-2 rounded-lg text-xs",
                                        theme === "light" ?
                                        "bg-zinc-100 border border-zinc-200 text-zinc-500 hover:bg-zinc-200" :
                                        "bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700",
                                        actionButtonClassname)}
                                    onClick={onAction}>
                                    {actionButtonText || "Undo"}
                                </button>
                            }
                        </div>
                        {closeButton &&
                            <div className={cn("h-max p-0.5 rounded-lg cursor-pointer",
                                    theme === "light" ? "hover:bg-zinc-200" : "hover:bg-zinc-700",
                                    closeDivClassname)}
                                 onClick={() => setVisible(false)}
                            >
                                <X size={16} className={cn(theme === "light" ? "text-zinc-500" : "text-zinc-400", closeClassname)}/>
                            </div>
                        }
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
export type { ToastProps, Position, Theme };


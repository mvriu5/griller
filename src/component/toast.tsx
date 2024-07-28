"use client";

import React, {HTMLAttributes, ReactNode, useEffect, useState} from "react";
import {cn} from "@/lib/utlis";
import {X} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {remove} from "@jridgewell/set-array";

type Position = "tr" | "tl" | "tc" | "br" | "bl" | "bc";

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
    id: string;
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

const Toast: React.FC<ToastProps & { removeToast: (id: string) => void }> =
    ({id, title, secondTitle, icon, position = "br", closeButton, duration = 3000, color, titleClassname,
         secondTitleClassname, closeClassname, closeDivClassname, outerClassname, iconClassname,
         className, removeToast, ...props }) => {

        useEffect(() => {
            const timer = setTimeout(() => {
                removeToast(id);
            }, duration);

            return () => {
                clearTimeout(timer);
            };
        }, [id, duration, removeToast]);

    const positionClasses = {
        'tr': 'top-4 right-4',
        'tl': 'top-4 left-4',
        'tc': 'top-4 left-1/2 transform -translate-x-1/2',
        'br': 'bottom-4 right-4',
        'bl': 'bottom-4 left-4',
        'bc': 'bottom-4 left-1/2 transform -translate-x-1/2',
    };

    return (
        <motion.div key={id}
                    className={cn(
                        "fixed z-50 shadow-xs shadow-zinc-900 rounded-lg transition-all duration-500 ease-in-out",
                        positionClasses[position],
                        outerClassname
                    )}
                    initial={{
                        y: ['tr', 'tl', 'tc'].includes(position) ? '-120%' : '120%',
                        opacity: 0
                    }}
                    animate={{
                        y: '0%',
                        opacity: 1
                    }}
                    exit={{
                        y: ['tr', 'tl', 'tc'].includes(position) ? '120%' : '-120%',
                        opacity: 0

                    }}
        >
            <div className={cn("min-w-72 min-h-16 flex flex-row justify-between p-2 pl-4 rounded-lg border border-zinc-200", className)}
                 style={{ backgroundColor: color || 'rgb(250, 250, 250)' }}
                 {...props}
            >
                <div className="flex flex-row items-center">
                    {icon && (
                        <div className={cn("text-zinc-700", iconClassname)}>
                            {icon}
                        </div>
                    )}
                    <div className={cn("flex flex-col max-w-60", icon && "ml-4")}>
                        <span className={cn("text-sm text-zinc-700 font-medium text-nowrap truncate", titleClassname)}>{title}</span>
                        {secondTitle && (<span className={cn("text-xs text-zinc-500", secondTitleClassname)}>{secondTitle}</span>)}
                    </div>
                </div>
                {closeButton && (
                    <div className={cn("h-max p-0.5 rounded-lg cursor-pointer hover:bg-zinc-100", closeDivClassname)}
                         onClick={() => removeToast(id)}
                    >
                        <X size={16} className={cn("text-zinc-500", closeClassname)}/>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export {Toast};
export type { ToastProps, Position };


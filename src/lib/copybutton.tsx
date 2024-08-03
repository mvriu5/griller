"use client";

import React, {HTMLAttributes, useEffect, useState} from "react";
import {Check, Copy} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";

interface CopyButtonProps extends HTMLAttributes<HTMLDivElement> {
    copyText: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ copyText, className, ...props }) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsChecked(false), 5000);
        return () => clearTimeout(timer);
    }, [isChecked]);

    return (
        <button className={"h-max bg-zinc-100 border border-zinc-200 p-1 rounded-lg text-zinc-500"}
                onClick={() => {
                    setIsChecked(true);
                    navigator.clipboard.writeText(copyText).then(() => {
                        console.log("Copied");
                    }).catch(err => {
                        console.error('Fehler beim Kopieren in die Zwischenablage:', err);
                    });
                }}
        >
            <AnimatePresence mode={"wait"}>
                {isChecked ? (
                    <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.4}}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.4, y: '100%'}}
                        transition={{ duration: 0.2 }}
                    >
                        <Check size={14} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="clipboard"
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.4, y: '100%' }}
                        transition={{ duration: 0.2 }}
                    >
                        <Copy size={14} />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}

export { CopyButton };

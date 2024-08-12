"use client";

import React, {createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState} from 'react';
import {Position, positionClasses, Toast, ToastProps} from './toast';
import {AnimatePresence, motion} from "framer-motion";
import { ToastPortal } from './toastportal';

interface ToastContextType {
    addToast: (props: Omit<ToastProps, 'id'>) => string;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast muss innerhalb eines Toasters verwendet werden');
    }
    return context;
};

interface ToasterProps {
    children: ReactNode;
    layout?: "stack" | "expand";
}

export const Toaster: React.FC<ToasterProps> = ({ children, layout = "stack" }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    const [isPaused, setIsPaused] = useState(false);

    const addToast = useCallback((props: Omit<ToastProps, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prevToasts) => [...prevToasts, { id, ...props }]);
        return id;
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    const groupedToasts = useMemo(() => {
        return toasts.reduce((acc, toast) => {
            const position = toast.position || 'br';
            if (!acc[position]) acc[position] = [];
            acc[position].push(toast);
            if (acc[position].length > 3) acc[position].shift();
            return acc;
        }, {} as Record<Position, ToastProps[]>);
    }, [toasts]);

    const isTopPositioned =  (position: string) => {
        return ['tr', 'tl', 'tc'].includes(position);
    }

    const containerVariants = {
        initial: {
        },
        hover: {
        }
    };

    const childStackVariants = {
        initial: (position: Position) => ({
            marginTop: isTopPositioned(position) ? '0' : '-3rem',
            marginBottom: isTopPositioned(position) ? '-3rem' : '0',
            transition: { duration: 0.3 }
        }),
        hover: (position: Position) => ({
            marginTop: isTopPositioned(position) ? '0' : '0.5rem',
            marginBottom: isTopPositioned(position) ? '0.5rem' : '0',
            transition: { duration: 0.3 }
        })
    };

    const childExpandVariants = {
        initial: (position: Position) => ({
            marginTop: isTopPositioned(position) ? '0' : '0.5rem',
            marginBottom: isTopPositioned(position) ? '0.5rem' : '0',
            transition: { duration: 0.3 }
        }),
        hover: {}
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastPortal>
                {Object.entries(groupedToasts).map(([position, positionToasts]) => (
                    <motion.div
                        key={position}
                        className={`fixed z-50 flex flex-col ${positionClasses(position as Position)}`}
                        variants={containerVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="hover"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <AnimatePresence>
                            {positionToasts.map((toast) => {
                                return(
                                    <motion.div
                                        key={toast.id}
                                        layout
                                        variants={layout === "stack" ? childStackVariants : childExpandVariants}
                                        custom={position as Position}
                                    >
                                        <Toast key={toast.id}
                                               removeToast={removeToast}
                                               isPaused={isPaused}
                                               {...toast}
                                        />
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </ToastPortal>
        </ToastContext.Provider>
    );
};

export {useToast};
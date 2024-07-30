"use client";

import React, {createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState} from 'react';
import {Position, positionClasses, Toast, ToastProps} from './toast';
import {AnimatePresence, motion} from "framer-motion";

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
}

export const Toaster: React.FC<ToasterProps> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    const [isPaused, setIsPaused] = useState(false);

    const toastRef = useRef<HTMLDivElement>(null);

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

    const childVariants = {
        initial: (position: Position) => ({
            marginTop: isTopPositioned(position) ? '0' : '-3rem',
            marginBottom: isTopPositioned(position) ? '-3rem' : '0',
            transition: { duration: 0.3 }
        }),
        hover: (position: Position) => ({
            marginTop: isTopPositioned(position) ? '-1rem' : '1rem',
            transition: { duration: 0.3 }
        })
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            {Object.entries(groupedToasts).map(([position, positionToasts]) => (
                <motion.div
                    key={position}
                    className={`fixed z-50 flex flex-col ${positionClasses(position as Position)}`}
                    variants={containerVariants}
                    initial="initial"
                    whileHover="hover"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <AnimatePresence>
                        {positionToasts.map((toast) => (
                            <motion.div
                                key={toast.id}
                                variants={childVariants}
                                custom={{ position }}
                            >
                                <Toast key={toast.id}
                                       removeToast={removeToast}
                                       isPaused={isPaused}
                                       {...toast}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ))}
        </ToastContext.Provider>
    );
};

export {useToast};
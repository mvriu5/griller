"use client";

import React, {createContext, ReactNode, useCallback, useContext, useMemo, useState} from 'react';
import {Position, Toast, ToastProps} from './toast';
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

    console.log(toasts)

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

    const positionClasses = {
        'tr': 'top-4 right-4',
        'tl': 'top-4 left-4',
        'tc': 'top-4 left-1/2 transform -translate-x-1/2',
        'br': 'bottom-4 right-4',
        'bl': 'bottom-4 left-4',
        'bc': 'bottom-4 left-1/2 transform -translate-x-1/2',
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            {Object.entries(groupedToasts).map(([position, positionToasts]) => (
                <motion.div
                    key={position}
                    className={`fixed z-50 flex flex-col -space-y-12 hover:space-y-4 ${positionClasses[position]}`}
                >
                    <AnimatePresence>
                        {positionToasts.map((toast) => (
                            <motion.div key={toast.id}>
                                <Toast key={toast.id} removeToast={removeToast} {...toast} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ))}
        </ToastContext.Provider>
    );
};

export {useToast};
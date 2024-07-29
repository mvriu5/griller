"use client";

import React, {createContext, ReactNode, useCallback, useContext, useState} from 'react';
import {Toast, ToastProps} from './toast';
import {AnimatePresence} from "framer-motion";

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

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            {toasts.map((toast) => (
                <Toast key={toast.id}
                       removeToast={removeToast}
                       {...toast}
                />
            ))}
        </ToastContext.Provider>
    );
};

export {useToast};
"use client";

import React, {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import Toast, {Position, positionClasses, ToastProps} from './toast';
import {AnimatePresence, motion} from "framer-motion";
import {createPortal} from "react-dom";

const ToastPortal: React.FC<{children: ReactNode}> = ({ children }) => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let element = document.getElementById('toast-portal-root');
            if (!element) {
                element = document.createElement('div');
                element.id = 'toast-portal-root';
                document.body.appendChild(element);
            }
            setPortalElement(element);
        }

        return () => {
            if (portalElement && portalElement.parentNode) {
                portalElement.parentNode.removeChild(portalElement);
            }
        };
    }, [portalElement]);

    if (!portalElement) return null;

    return createPortal(children, portalElement);
};

// ToastContext add/remove from the provider
interface ToastContextType {
    addToast: (props: Omit<ToastProps, 'id'>) => string;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// useToast hook to access the context
export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast muss innerhalb eines Toasters verwendet werden');
    }
    return context;
};

interface ToasterProps {
    // wrap the children, where toasts can be displayed
    children: ReactNode;
    // stack: toasts display behind each other,
    // expand: toasts display on top of each other
    layout?: "stack" | "expand";
    // how much scale decreases through each toast, when layout is "stack"
    scaleDecrease?: number;
}

const Toaster: React.FC<ToasterProps> = ({ children, layout = "stack", scaleDecrease = 0.03 }) => {
    // holds all current active toasts
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    // hover state to pause animations and change toast-display
    const [isHovered, setIsHovered] = useState(false);

    const addToast = useCallback((props: Omit<ToastProps, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prevToasts) => [...prevToasts, { id, ...props }]);
        return id;
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    // groups toast by positioning in the viewport
    const groupedToasts = useMemo(() => {
        return toasts.reduce((acc, toast) => {
            const position = toast.position || 'br';
            if (!acc[position]) acc[position] = [];
            acc[position].push(toast);
            if (acc[position].length > 3) acc[position].shift();
            return acc;
        }, {} as Record<Position, ToastProps[]>);
    }, [toasts]);

    // checks if a toast is positioned at the top or the bottom
    const isTopPositioned =  (position: string) => {
        return ['tr', 'tl', 'tc'].includes(position);
    }

    // calculates the scale of each toast if layout is "stack"
    const calculateScale = (index: number, total: number) => {
        if (layout === "expand") return 1;
        const reverseIndex = total - index - 1;
        return Math.max(1 - (reverseIndex * scaleDecrease), 0.5);
    };

    // framer-motion properties for the stack-variant
    const childStackVariants = {
        initial: (position: Position) => ({
            marginTop: isTopPositioned(position) ? '0' : '-3rem',
            marginBottom: isTopPositioned(position) ? '-3rem' : '0',
            transition: { duration: 0.3 }
        }),
        hover: (position: Position) => ({
            marginTop: isTopPositioned(position) ? '0' : '0.5rem',
            marginBottom: isTopPositioned(position) ? '0.5rem' : '0',
            transition: { duration: 0.3 },
            scale: 1
        })
    };

    // framer-motion properties for the expand-variant
    const childExpandVariants = {
        initial: (position: Position) => ({
            marginTop: isTopPositioned(position) ? '0' : '0.5rem',
            marginBottom: isTopPositioned(position) ? '0.5rem' : '0',
            transition: { duration: 0.3 }
        }),
        hover: {}
    };

    // ToastPortal maps the toast-groups and each group maps the current active toasts to the display
    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastPortal>
                {Object.entries(groupedToasts).map(([position, positionToasts]) => (
                    <motion.div
                        key={position}
                        className={`fixed z-50 flex flex-col ${positionClasses(position as Position)}`}
                        initial="initial"
                        whileHover="hover"
                        whileTap="hover"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <AnimatePresence>
                            {positionToasts.map((toast, index) => {
                                const scale = isHovered ? 1 : calculateScale(index, positionToasts.length);
                                const { scale: _, ...toastProps } = toast;
                                return (
                                    <motion.div
                                        key={toast.id}
                                        layout
                                        variants={layout === "stack" ? childStackVariants : childExpandVariants}
                                        custom={position as Position}
                                        style={{ scale, zIndex: index }}
                                    >
                                        <Toast
                                            key={toast.id}
                                            removeToast={removeToast}
                                            isPaused={isHovered}
                                            scale={scale}
                                            {...toastProps}
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

export default Toaster;

import ReactDOM from 'react-dom';
import React, {ReactNode, useEffect, useState} from 'react';

interface ToastPortalProps {
    children: ReactNode;
}

export const ToastPortal: React.FC<ToastPortalProps> = ({ children }) => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        let element = document.getElementById('toast-portal-root');
        if (!element) {
            element = document.createElement('div');
            element.id = 'toast-portal-root';
            document.body.appendChild(element);
        }
        setPortalElement(element);

        return () => {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, []);

    if (!portalElement) return null;

    return ReactDOM.createPortal(children, portalElement);
};
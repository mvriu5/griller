import {createPortal} from 'react-dom';
import React, {ReactNode, useEffect, useState} from 'react';


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
    }, []);

    if (!portalElement) return null;

    return createPortal(children, portalElement);
};

export { ToastPortal };
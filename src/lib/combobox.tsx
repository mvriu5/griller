import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {Check, ChevronDown, ChevronUp} from "lucide-react";
import { cn } from "@/component/toast";
import {useOutsideClick} from "@/lib/useOutsideClick";
import ReactDOM from "react-dom";

interface ComboProps{
    title: string;
    values: string[];
    label?: string;
    preSelectedValue?: string;
    onChange?: (value: string) => void;
}

type ComboRef = {
    getValue: () => string | number;
}

const ComboboxPortal: React.FC<{children: ReactNode}> = ({ children }) => {
    return ReactDOM.createPortal(
        children,
        document.body
    );
}

const Combobox = forwardRef<ComboRef, ComboProps>(({ title, values, label, preSelectedValue, onChange }, ref) => {
    const [value, setValue] = useState<string>(preSelectedValue || values[0] || "");
    const [open, setOpen] = useState<boolean>(false);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const itemRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const portalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open && itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            setDropdownPosition({ top: rect.bottom + 4, left: rect.left });
        }
    }, [open]);

    useOutsideClick((e) => {
        if ((menuRef.current && !menuRef.current.contains(e.target as Node)) &&
            (portalRef.current && !portalRef.current.contains(e.target as Node)))
        {
            setOpen(false);
        }
    });

    useImperativeHandle(ref, () => ({
        getValue: () => value
    }), [value]);

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
        setOpen(false);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className={"flex flex-col space-y-1"}>

            {label && <span className={"text-zinc-500 text-xs px-1"}>{label}</span>}

            <div className={"flex flex-col space-y-1"} ref={menuRef}>
                <div className={"w-max flex flex-row items-center space-x-8 justify-between px-2 py-1 bg-zinc-100 border border-zinc-200 rounded-lg text-zinc-500 text-sm cursor-pointer"}
                     onClick={() => setOpen(!open)}
                     ref={itemRef}
                >
                    <span>{value}</span>
                    {open ? <ChevronDown size={16}/> : <ChevronUp size={16}/>}
                </div>

                {open &&
                    <ComboboxPortal>
                        <div className={"absolute z-50 w-max p-1 space-y-1 bg-zinc-100 border border-zinc-200 rounded-lg"}
                             style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
                             ref={portalRef}
                        >
                            {values.map((item, index) => (
                                <div key={index}
                                     className={cn(
                                         "flex flex-row items-center space-x-2 px-1.5 py-0.5 w-full rounded-lg hover:bg-zinc-200 cursor-pointer",
                                         value === item ? "bg-zinc-200" : ""
                                     )}
                                     onClick={() => handleValueChange(item)}
                                >
                                    <span className={"text-zinc-500 text-sm"}>{item}</span>
                                    {value === item && <Check size={16} className={"text-zinc-500"}/>}
                                </div>
                            ))}
                        </div>
                    </ComboboxPortal>
                }
            </div>
        </div>
    );
});
Combobox.displayName = "Combobox";

export {Combobox};
export type {ComboRef};
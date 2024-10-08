import { cn } from "@/component/toast";
import {forwardRef, useImperativeHandle, useState} from "react";

interface SwitchButtonProps {
    label: string;
    titleOne: string;
    titleTwo: string;
    onChange?: (value: boolean) => void;
}

type SwitchButtonRef = {
    getValue: () => boolean;
}


const SwitchButton = forwardRef<SwitchButtonRef, SwitchButtonProps>(({ label, titleOne, titleTwo, onChange }, ref) => {
    const [value, setValue] = useState(false);

    useImperativeHandle(ref, () => ({
        getValue: () => value
    }), [value]);

    const handleChange = (value: boolean) => {
        setValue(value);
        onChange && onChange(value);
    }

    return (
        <div className={"flex flex-col space-y-1"}>
            {label && <span className={"text-xs text-zinc-500 truncate"}>{label}</span>}

            <div className={"w-max flex flex-row space-x-1 rounded-lg border border-zinc-200 bg-zinc-100"}>
                <div className={cn("px-1.5 py-1 text-sm text-zinc-400 cursor-pointer rounded-lg", !value && "bg-zinc-200 text-zinc-600")}
                    onClick={() => handleChange(!value)}
                >
                    <span>{titleOne}</span>
                </div>
                <div className={cn("px-1.5 py-1 text-sm text-zinc-400 cursor-pointer rounded-lg", value && "bg-zinc-200 text-zinc-600")}
                     onClick={() => handleChange(!value)}
                >
                    <span>{titleTwo}</span>
                </div>
            </div>
        </div>

    );
});
SwitchButton.displayName = "SwitchButton";

export {SwitchButton};
export type {SwitchButtonRef};
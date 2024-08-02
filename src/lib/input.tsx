import React, {forwardRef, InputHTMLAttributes, useImperativeHandle, useState} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    label?: string;
    preSelectedValue?: string;
}

type InputRef = {
    getValue: () => string;
}

const Input = forwardRef<InputRef, InputProps>(({label, placeholder, preSelectedValue, ...props}, ref) => {
    const [value, setValue] = useState<string>(preSelectedValue || "");

    useImperativeHandle(ref, () => ({
        getValue: () => value
    }), [value]);


    return (
        <div className={"flex flex-col space-y-1"}>

            {label &&
                <span className={"text-zinc-500 text-xs px-1"}>{label}</span>
            }
            <input className={"w-full px-2 py-1 bg-zinc-100 border border-zinc-200 text-zinc-500 text-sm rounded-lg focus:outline-none focus:border-zinc-300"}
                   placeholder={placeholder}
                   spellCheck={false}
                   value={value}
                   onChange={(e) => setValue(e.target.value)}
                   {...props}
            />
        </div>
    );
});
Input.displayName = "Input";

export {Input};
export type {InputRef};
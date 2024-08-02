import React, {forwardRef, InputHTMLAttributes, useImperativeHandle, useState} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    title?: string;
    preSelectedValue?: string;
}

type InputRef = {
    getValue: () => string;
}

export const Input = forwardRef<InputRef, InputProps>(({title, placeholder, preSelectedValue, ...props}, ref) => {
    const [value, setValue] = useState<string>(preSelectedValue || "");

    useImperativeHandle(ref, () => ({
        getValue: () => value
    }), [value]);


    return (
        <div className={"flex flex-col space-y-1"}>

            {title &&
                <span className={"text-zinc-500 text-xs"}>{title}</span>
            }
            <input className={"w-full p-2 border border-zinc-200 text-zinc-500 rounded-lg focus:outline-none focus:border-zinc-300"}
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
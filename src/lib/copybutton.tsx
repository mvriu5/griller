"use client";

import React, {HTMLAttributes, useEffect, useState} from "react";
import {Check, Clipboard} from "lucide-react";

interface CopyButtonProps extends HTMLAttributes<HTMLDivElement> {
    copyText: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ copyText, className, ...props }) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsChecked(false), 3000);
    }, [isChecked]);

    return (
        <button className={"h-max bg-zinc-100 border border-zinc-200 p-1 rounded-lg text-zinc-500"}
                onClick={() => {
                    setIsChecked(true);
                    navigator.clipboard.writeText(copyText);
                }}
        >
            {isChecked ? <Check size={16}/> : <Clipboard size={14}/>}
        </button>
    );
}

export { CopyButton };

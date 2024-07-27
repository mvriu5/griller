"use client";

import React, {ButtonHTMLAttributes, ReactNode} from "react";
import {cn} from "@/lib/utlis";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ title, icon, className, ...props }) => {
    return (
        <button
            className={cn("flex flex-row items-center w-max px-3 py-1 text-zinc-500 rounded-lg " +
                "bg-zinc-100 border border-zinc-200 hover:bg-zinc-300 hover:text-zinc-700", className)} {...props}>
            {icon}
            {title}
        </button>
    );
}

export {Button};
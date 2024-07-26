import React, {HTMLAttributes, ReactNode} from "react";

interface GrillerProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    secondTitle?: string;
    icon?: ReactNode;
    placement?: "tr" | "tl" | "br" | "bl";
}

export const Griller: React.FC<GrillerProps> = ({ title, secondTitle, icon, className, ...props }) => {

    return (
        <div className={"fixed bottom-4 right-4 z-50 w-72 h-16 flex flex-row items-center space-x-4 px-4 py-2 " +
            "bg-zinc-200 rounded-lg"} {...props}
        >
            {icon}
            <div className={"flex flex-col space-y-0.5"}>
                <span className={"text-sm text-zinc-700 font-medium"}>{title}</span>
                {secondTitle && <span className={"text-xs text-zinc-500"}>{secondTitle}</span>}
            </div>
        </div>
    );
}
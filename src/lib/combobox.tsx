import {forwardRef, useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";

interface ComboProps {
    title: string;
    values: string[];
}

type ComboRef = {
    getValue: () => string;
}

export const Combobox = forwardRef<ComboRef, ComboProps>(({ title, values }, ref) => {
    const [value, setValue] = useState<string>(values[0] || "");
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={"flex flex-col space-y-1"}>

            <div className={"w-max flex flex-row items-center space-x-4 justify-between px-2 py-1 bg-zinc-100 border border-zinc-200 rounded-lg text-zinc-500 text-sm"}
                    onClick={() => setOpen(!open)}
            >
                <span>{title}</span>
                {open ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </div>

            {open &&
                <div className={"w-max p-1 space-y-1 bg-zinc-100 border border-zinc-200 rounded-lg"}>
                    {values.map((value, index) => (
                        <div key={index}
                             className={"px-1.5 py-0.5 w-full rounded-lg hover:bg-zinc-200 cursor-pointer"}
                             onClick={() => {
                                 setValue(value);
                                 setOpen(false);
                             }}
                        >
                            <span className={"text-zinc-500 text-sm"}>{value}</span>
                        </div>
                    ))}
                </div>
            }

        </div>
    );
});
Combobox.displayName = "Combobox";
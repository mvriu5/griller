"use client";

import {Blocks, GitBranch, Github, Clipboard, SquareArrowOutUpRight, Check} from "lucide-react";
import {Griller, GrillerRef} from "@/component/griller";
import {useRef, useState} from "react";

export default function Home() {
    const [isChecked, setIsChecked] = useState(false);
    const grillerRef = useRef<GrillerRef>(null);

    return (
        <>
            <div className={"flex flex-col space-y-4"}>

                <div className={"flex flex-row justify-between items-center"}>
                    <div className={"flex flex-row space-x-4 items-center"}>
                        <Blocks size={28} className={"text-zinc-700"}/>
                        <div className={"flex flex-col space-y-1"}>
                            <span className={"text-lg text-zinc-700 font-medium"}>Griller</span>
                            <span className={"text-sm text-zinc-500"}>A fully customizable React Toast Component</span>
                        </div>
                    </div>

                    <div
                        className={"flex flex-row space-x-2 items-center text-zinc-500 px-3 py-1 rounded-lg cursor-pointer hover:bg-zinc-100"}>
                        <span className={"text-sm font-medium"}>Code</span>
                        <Github/>
                    </div>
                </div>

                <div className={"rounded-full"}>
                    <hr className={"w-full text-black text-opacity-40"}></hr>
                </div>

                <div className={"flex flex-row justify-between"}>
                    <div className={"flex flex-row space-x-2"}>
                        <button className={"w-max px-3 py-1.5 text-zinc-200 rounded-lg bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-100"}
                                onClick={() => grillerRef.current?.show()}
                        >
                            Summon
                        </button>
                        <button className={"flex flex-row items-center w-max px-3 py-1.5 text-zinc-500 rounded-lg bg-zinc-100 hover:bg-zinc-300 hover:text-zinc-700"}>
                            <SquareArrowOutUpRight size={16} className={"mr-2"}/>
                            Docs
                        </button>
                    </div>

                    <div className={"flex flex-row space-x-8 items-center bg-zinc-50 p-2 text-zinc-500 rounded-lg border border-zinc-200"}>
                        <span className={"font-mono"}>npm install griller</span>
                        <button className={"bg-zinc-100 border border-zinc-200 p-1.5 rounded-lg"}
                                onClick={() => setIsChecked(true)}
                        >
                            {isChecked ? <Check size={16}/> : <Clipboard size={16}/>}
                        </button>
                    </div>
                </div>

            </div>

            <Griller title={"This is a griller"}
                     secondTitle={"Click again to see a GrillStack!"}
                     icon={<GitBranch size={24}/>}
                     duration={5000}
                     ref={grillerRef}
                     />
        </>
    );
}

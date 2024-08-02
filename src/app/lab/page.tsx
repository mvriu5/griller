"use client";

import {CodeBlock} from "@/lib/codeblock";
import React from "react";
import {ArrowLeftFromLine} from "lucide-react";
import {useRouter} from "next/navigation";
import {Button} from "@/lib/button";
import { Input } from "@/lib/input";
import {Combobox} from "@/lib/combobox";

export default function Home() {
    const router = useRouter();

    return (
        <div className={"flex flex-col space-y-4 p-4 lg:px-40 lg:py-16 2xl:px-96 2xl:py-32"}>

            <div className={"flex flex-row items-center space-x-4 border-b border-zinc-200 pb-4"}>
                <div className={"rounded-lg p-1 hover:bg-zinc-300 cursor-pointer"}
                    onClick={() => router.back()}
                >
                    <ArrowLeftFromLine size={20} className={"text-zinc-700"}/>
                </div>

                <span className={"text-lg text-zinc-700 font-medium"}>Griller/Lab</span>
            </div>

            <span className={"text-zinc-500 text-sm pt-4"}>
                Customize your griller component and get the code ready for production.
            </span>

            <div className={"h-80 w-full flex flex-col space-y-2 p-2 rounded-lg border border-zinc-200 bg-zinc-50"}>
                <Input placeholder={"Title"}
                       title={"Title"}
                       preSelectedValue={"Toast Component"}
                />
                <Input placeholder={"Second Title"}
                       title={"Second Title"}
                       preSelectedValue={"This is a Toast Component!"}
                />

                <Combobox title={"Title"} values={["hauhfa", "wnbgbwgbuw"]}/>
            </div>

            <CodeBlock title={"Generated Code"}
                       fileName={"component.tsx"}
                       filePath={"component-example.txt"}
            />

            <Button title={"Test"}
                    className={"text-zinc-200 bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-100 py-1.5"}
                    onClick={() => {}}
            />

        </div>
    );
}
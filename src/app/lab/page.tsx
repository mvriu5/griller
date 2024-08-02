"use client";

import {CodeBlock} from "@/lib/codeblock";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {ArrowLeftFromLine} from "lucide-react";
import {useRouter} from "next/navigation";
import {Button} from "@/lib/button";
import {Input, InputRef} from "@/lib/input";
import {Combobox, ComboRef} from "@/lib/combobox";
import {SwitchButton, SwitchButtonRef} from "@/lib/switchbutton";
import {Combo} from "next/dist/compiled/@next/font/dist/google";
import {CopyButton} from "@/lib/copybutton";
import TextareaAutosize from "react-textarea-autosize";
import {Position, Theme, ToastProps} from "@/component/toast";
import { useToast } from "@/component/toaster";


export default function Home() {
    const router = useRouter();
    const { addToast } = useToast();

    const titleRef = useRef<InputRef>(null);
    const secondTitleRef = useRef<InputRef>(null);
    const positionRef = useRef<ComboRef>(null);
    const durationRef = useRef<ComboRef>(null);
    const themeRef = useRef<SwitchButtonRef>(null);
    const closeButtonRef = useRef<SwitchButtonRef>(null);
    const actionButtonRef = useRef<SwitchButtonRef>(null);

    const [code, setCode] = useState("");
    const [toast, setToast] = useState<Omit<ToastProps, 'id'> | null>(null);

    useEffect(() => {
        const title = titleRef.current?.getValue();
        const secondTitle = secondTitleRef.current?.getValue();
        const position = positionRef.current?.getValue();
        const duration = durationRef.current?.getValue();
        const theme = themeRef.current?.getValue();
        const closeButton = closeButtonRef.current?.getValue();
        const actionButton = actionButtonRef.current?.getValue();

        if (title && position && duration && theme) {
            const toast: Omit<ToastProps, 'id'> = {
                title: title,
                secondTitle: secondTitle,
                position: position as Position,
                duration: Number(duration),
                theme: theme ? "dark" : "light",
                closeButton: closeButton,
                actionButton: actionButton
            };
            setToast(toast);
        }


    }, [titleRef, secondTitleRef, positionRef, durationRef, themeRef, closeButtonRef, actionButtonRef]);

    return (
        <div className={"h-screen flex flex-col space-y-4 p-4 lg:px-40 lg:py-16 2xl:px-96 2xl:py-32"}>

            <div className={"flex flex-row items-center space-x-4 border-b border-zinc-200 pb-4"}>
                <div className={"rounded-lg p-1 hover:bg-zinc-300 cursor-pointer"}
                     onClick={() => router.back()}
                >
                    <ArrowLeftFromLine size={20} className={"text-zinc-700"}/>
                </div>
                <span className={"text-lg text-zinc-700 font-medium"}>
                    Griller/Lab
                </span>
                <span className={"text-zinc-500 text-sm"}>
                    Customize your griller component and get the code ready for production.
                </span>
            </div>

            <div className={"grid grid-cols-2 space-x-16 pt-4"}>

                <div className={"flex flex-col space-y-2"}>
                    <span className={"text-sm text-zinc-700 font-medium"}>Customize</span>
                    <div className={"h-max flex flex-col space-y-4 p-4 rounded-lg border border-zinc-200 bg-zinc-50"}>
                        <Input placeholder={"Title"}
                               label={"Title"}
                               preSelectedValue={"Toast Component"}
                               size={40}
                               ref={titleRef}
                        />
                        <Input placeholder={"Second Title"}
                               label={"Second Title"}
                               preSelectedValue={"This is a Toast Component!"}
                               size={60}
                               ref={secondTitleRef}
                        />
                        <div className={"flex flex-row space-x-8"}>
                            <Combobox title={"Position"}
                                      values={["tr", "tl", "tc", "br", "bl", "bc"]}
                                      label={"Position"}
                                      ref={positionRef}
                            />
                            <Combobox title={"Duration"}
                                      values={["1000", "3000", "5000", "10000", "100000"]}
                                      label={"Duration"}
                                      ref={durationRef}
                            />
                        </div>

                        <div className={"flex flex-row justify-between"}>
                            <div className={"flex flex-row space-x-8"}>
                                <SwitchButton titleOne={"Dark"}
                                              titleTwo={"Light"}
                                              label={"Theme"}
                                              ref={themeRef}
                                />
                                <SwitchButton titleOne={"Yes"}
                                              titleTwo={"No"}
                                              label={"Close Button"}
                                              ref={closeButtonRef}
                                />
                                <SwitchButton titleOne={"Yes"}
                                              titleTwo={"No"}
                                              label={"Action Button"}
                                              ref={actionButtonRef}
                                />
                            </div>
                            <Button title={"Test"}
                                    className={"bg-zinc-50 text-zinc-700 py-1 mt-5"}
                                    onClick={() => toast && addToast(toast)}
                            />
                        </div>
                    </div>
                </div>

                <div className={"flex flex-col space-y-2"}>
                    <span className={"text-sm text-zinc-700 font-medium"}>
                        Generated Code
                    </span>
                    <div
                        className={"flex flex-row justify-between w-full h-max bg-zinc-50 rounded-lg border border-zinc-200"}>
                        <div className={"w-full h-max flex flex-col"}>
                            <div
                                className={"flex flex-row justify-between items-center px-2 py-1 bg-zinc-100 border-b border-zinc-200 rounded-t-lg"}>
                                <span className={"text-zinc-500 text-xs"}>
                                    component.tsx
                                </span>
                                <CopyButton copyText={code}/>
                            </div>
                            <TextareaAutosize
                                className={"p-2 w-full h-auto font-mono text-sm text-zinc-500 bg-zinc-50 overflow-hidden resize-none focus:outline-none rounded-b-lg"}
                                value={code}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
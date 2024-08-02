"use client";

import React, {useEffect, useState} from "react";
import {ArrowLeftFromLine, ShieldAlert} from "lucide-react";
import {useRouter} from "next/navigation";
import {Button} from "@/lib/button";
import {Input} from "@/lib/input";
import {Combobox} from "@/lib/combobox";
import {SwitchButton} from "@/lib/switchbutton";
import {CopyButton} from "@/lib/copybutton";
import TextareaAutosize from "react-textarea-autosize";
import {Position, Theme, ToastProps} from "@/component/toast";
import {useToast} from "@/component/toaster";
import {motion} from "framer-motion";


export default function Home() {
    const router = useRouter();
    const { addToast } = useToast();

    const [title, setTitle] = useState("Toast Component");
    const [secondTitle, setSecondTitle] = useState("This is a Toast Component!");
    const [position, setPosition] = useState<Position>("br");
    const [duration, setDuration] = useState(3000);
    const [theme, setTheme] = useState<Theme>("light");
    const [closeButton, setCloseButton] = useState(false);
    const [actionButton, setActionButton] = useState(false);
    const [icon, setIcon] = useState(false);

    const generateCode = () => {
        return `addToast({\n    title: "${title}",\n    secondTitle: "${secondTitle}",\n    icon: ${icon ? "<ShieldAlert size={24} className={\"text-zinc-500\"}/>" : undefined},\n    position: "${position}",\n    duration: ${duration},\n    theme: "${theme}",\n    closeButton: ${closeButton},\n    actionButton: ${actionButton}\n)};`;
    };

    const [code, setCode] = useState<string>(generateCode());

    useEffect(() => {
        setCode(generateCode());
    }, [title, secondTitle, position, duration, theme, closeButton, actionButton, icon]);

    const handleAddToast = () => {
        const toast: Omit<ToastProps, 'id'> = {
            title,
            secondTitle,
            position,
            duration,
            theme,
            closeButton,
            actionButton,
            icon: icon ? <ShieldAlert size={24} className={"text-zinc-500"}/> : undefined
        };
        addToast(toast);
    };

    return (
        <motion.div
            className={"h-full flex flex-col justify-between space-y-4 p-4 lg:px-40 lg:py-16 2xl:px-96 2xl:py-32"}
            initial={{opacity: 0, filter: 'blur(10px)', y: 50}}
            animate={{opacity: 1, filter: 'blur(0px)', y: 0}}
            transition={{duration: 0.65}}
        >
            <div className={"flex flex-col space-y-4"}>
                <div className={"flex flex-row items-center space-x-8 border-b border-zinc-200 pb-4"}>
                    <div className={"flex flex-row items-center space-x-2"}>
                        <div className={"rounded-lg p-1 hover:bg-zinc-200 cursor-pointer"}
                             onClick={() => router.back()}
                        >
                            <ArrowLeftFromLine size={20} className={"text-zinc-700"}/>
                        </div>
                        <span className={"text-lg text-zinc-700 font-medium"}>
                            Griller/Lab
                        </span>
                    </div>
                    <span className={"hidden sm:block text-zinc-500 text-sm"}>
                        Customize your griller component and get the code ready for production.
                    </span>
                </div>

                <div className={"grid grid-cols-1 space-y-8 2xl:space-y-0 2xl:grid-cols-2 2xl:space-x-16 pt-4"}>
                    <div className={"flex flex-col space-y-2"}>
                        <span className={"text-sm text-zinc-700 font-medium"}>Customize</span>
                        <div className={"h-max flex flex-col rounded-lg border border-zinc-200 bg-zinc-50"}>
                            <div className={"flex flex-col p-4 space-y-4"}>
                                <Input placeholder={"Title"}
                                       label={"Title"}
                                       preSelectedValue={"Toast Component"}
                                       size={40}
                                       onChange={(e) => setTitle(e.target.value)}
                                />
                                <Input placeholder={"Second Title"}
                                       label={"Second Title"}
                                       preSelectedValue={"This is a Toast Component!"}
                                       size={60}
                                       onChange={(e) => setSecondTitle(e.target.value)}
                                />
                                <div className={"flex flex-col sm:flex-row sm:space-x-8 space-x-0 space-y-2 sm:space-y-0"}>
                                    <Combobox title={"Position"}
                                              values={["tr", "tl", "tc", "br", "bl", "bc"]}
                                              preSelectedValue={"br"}
                                              label={"Position"}
                                              onChange={value => setPosition(value as Position)}
                                    />
                                    <Combobox title={"Duration"}
                                              values={["1000", "3000", "5000", "10000", "100000"]}
                                              preSelectedValue={"3000"}
                                              label={"Duration"}
                                              onChange={value => setDuration(parseInt(value))}
                                    />
                                </div>

                                <div className={"flex flex-col 2xl:flex-row 2xl:space-x-4 space-y-2 2xl:space-y-0"}>
                                    <SwitchButton titleOne={"Light"}
                                                  titleTwo={"Dark"}
                                                  label={"Theme"}
                                                  onChange={value => setTheme(value ? "dark" : "light")}
                                    />
                                    <SwitchButton titleOne={"No"}
                                                  titleTwo={"Yes"}
                                                  label={"Icon"}
                                                  onChange={value => setIcon(value)}
                                    />
                                    <SwitchButton titleOne={"No"}
                                                  titleTwo={"Yes"}
                                                  label={"Close Button"}
                                                  onChange={value => setCloseButton(value)}
                                    />
                                    <SwitchButton titleOne={"No"}
                                                  titleTwo={"Yes"}
                                                  label={"Action Button"}
                                                  onChange={value => setActionButton(value)}
                                    />
                                </div>
                            </div>

                            <div className={"w-full flex flex-row justify-end bg-zinc-100 rounded-b-lg border-t border-zinc-200 px-4 py-2"}>
                                <Button title={"Test"}
                                        className={"bg-zinc-50 text-zinc-700 py-1"}
                                        onClick={handleAddToast}
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

            <div className={"w-full h-max flex flex-row pt-4 space-x-2 border-t border-zinc-200 text-sm text-zinc-500"}>
                <span>Made by</span>
                <motion.span
                    className={"text-zinc-700 underline cursor-pointer"}
                    onClick={() => window.location.href = 'https://ahsmus.com'}
                    whileHover={{y: -4}}
                    whileTap={{y: -4}}
                >
                    mvriu5
                </motion.span>
            </div>
        </motion.div>
    );
}
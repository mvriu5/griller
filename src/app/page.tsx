"use client";

import {
    Ban,
    Blocks,
    Check,
    FlaskConical,
    GitBranch,
    Github,
    MessageSquare,
    ShieldAlert,
    SquareArrowOutUpRight,
    TriangleAlert
} from "lucide-react";
import {Position} from "@/component/toast";
import React, {ReactNode} from "react";
import {CodeBlock} from "@/lib/codeblock";
import {CopyButton} from "@/lib/copybutton";
import {Button} from "@/lib/button";
import {useToast} from "@/component/toaster";

export default function Home() {
    const { addToast } = useToast();

    return (
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
                    className={"flex flex-row space-x-2 items-center text-zinc-500 px-3 py-1 rounded-lg cursor-pointer hover:bg-zinc-100"}
                    onClick={() => window.location.href = 'https://github.com/mvriu5/griller'}
                >
                    <Github/>
                </div>
            </div>

            <div className={"rounded-full"}>
                <hr className={"w-full text-black text-opacity-40"}></hr>
            </div>

            <div className={"flex flex-row justify-between pb-8"}>
                <div className={"flex flex-row space-x-2"}>
                    <Button title={"Test"}
                            icon={<FlaskConical size={15} className={"mr-2"}/>}
                            onClick={() => addToast({
                                icon: <ShieldAlert size={24}/>,
                                title: 'Toast Notification',
                                secondTitle: 'This is the second toast title'
                            })}
                            className={"text-zinc-200 bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-100"}
                    />
                    <Button title={"Docs"}
                            icon={<SquareArrowOutUpRight size={16} className={"mr-2"}/>}
                    />
                </div>

                <div
                    className={"flex flex-row space-x-8 items-center bg-zinc-50 px-2 py-1 text-zinc-500 rounded-lg border border-zinc-200"}>
                    <span className={"font-mono"}>npm install griller</span>
                    <CopyButton copyText={"npm install griller"}/>
                </div>
            </div>

            <CodeBlock title={"Code Example"}
                       filePath={"/example.txt"}
            />

            <div className={"flex flex-row space-x-2 items-center pt-8"}>
                <span className={"text-sm text-zinc-700"}>Position</span>
                <Button title={"top-left"}
                        onClick={() => addToast({
                            icon: <ShieldAlert size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                            position: "tl"
                        })}
                />
                <Button title={"top-center"}
                        onClick={() => addToast({
                            icon: <ShieldAlert size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                            position: "tc"
                        })}
                />
                <Button title={"top-right"}
                        onClick={() => addToast({
                            icon: <ShieldAlert size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                            position: "tr"
                        })}
                />
                <Button title={"bottom-left"}
                        onClick={() => addToast({
                            icon: <ShieldAlert size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                            position: "bl"
                        })}
                />
                <Button title={"bottom-center"}
                        onClick={() => addToast({
                            icon: <ShieldAlert size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                            position: "bc"
                        })}
                />
                <Button title={"bottom-right"}
                        onClick={() => addToast({
                            icon: <ShieldAlert size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                            position: "br"
                        })}
                />
            </div>

            <div className={"flex flex-row space-x-2 items-center"}>
                <span className={"text-sm text-zinc-700"}>Duration</span>
                <Button title={"1s"}
                        onClick={() => addToast({
                            icon: <ShieldAlert size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                            duration: 1000
                        })}
                />
                <Button title={"3s"}
                        onClick={() => addToast({
                            icon: <ShieldAlert size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                            duration: 3000
                        })}
                />
                <Button title={"5s"}
                        onClick={() => addToast({
                            icon: <ShieldAlert size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                            duration: 5000
                        })}
                />
            </div>

            <div className={"flex flex-row space-x-2 items-center"}>
                <span className={"text-sm text-zinc-700"}>Close Button</span>
                <Button title={""}
                        icon={<Check size={16}/>}
                        className={"py-2"}
                        onClick={() => addToast({
                            icon: <ShieldAlert size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                            closeButton: true
                        })}
                />
                <Button title={""}
                        icon={<Ban size={16}/>}
                        className={"py-2"}
                        onClick={() => addToast({
                            icon: <ShieldAlert size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                            closeButton: false
                        })}
                />
                <Button title={"Without Duration"}
                        onClick={() => addToast({
                            icon: <ShieldAlert size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                            duration: undefined,
                            closeButton: false
                        })}
                />
            </div>

            <div className={"flex flex-row space-x-2 items-center"}>
                <span className={"text-sm text-zinc-700"}>Icon</span>
                <Button title={"Alert"}
                        onClick={() => addToast({
                            icon: <TriangleAlert size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                        })}
                />
                <Button title={"Message"}
                        onClick={() => addToast({
                            icon: <MessageSquare size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                        })}
                />
                <Button title={"Branch"}
                        onClick={() => addToast({
                            icon: <GitBranch size={24}/>,
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                        })}
                />
                <Button title={""}
                        icon={<Ban size={16}/>}
                        className={"py-2"}
                        onClick={() => addToast({
                            title: 'Toast Notification',
                            secondTitle: 'This is the second toast title',
                        })}
                />
            </div>
        </div>
    );
}

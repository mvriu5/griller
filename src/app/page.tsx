"use client";

import {
    Ban,
    BookOpen,
    FlaskRound,
    GitBranch,
    Github,
    ListPlus,
    MessageSquare,
    ShieldAlert,
    TriangleAlert
} from "lucide-react";
import React from "react";
import {CodeBlock} from "@/lib/codeblock";
import {CopyButton} from "@/lib/copybutton";
import {Button} from "@/lib/button";
import {useToast} from "@/component/toaster";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";
import {ToastIcon} from "@/lib/ToastIcon";
import Link from "next/link";

export default function Home() {
    const { addToast } = useToast();
    const router = useRouter();

    return (
        <div className={"flex flex-col space-y-4 p-4 lg:px-[25%] md:py-32 md:px-[15%]"}>

            <motion.div className={"flex flex-row justify-between items-center border-b border-zinc-200 pb-4"}
                        initial={{opacity: 0, filter: 'blur(10px)', y: -100}}
                        animate={{opacity: 1, filter: 'blur(0px)', y: 0}}
                        transition={{duration: 1}}
            >
                <div className={"flex flex-row space-x-2 items-center"}>
                    <ToastIcon/>
                    <span className={"text-zinc-700 font-semibold"}>Griller</span>
                    <span className={"hidden sm:block text-zinc-500"}>A fully customizable React Toast Component</span>
                </div>

                <motion.div
                    className={"flex flex-row space-x-2 items-center text-zinc-500 p-2 rounded-lg cursor-pointer hover:bg-zinc-100"}
                    onClick={() => window.location.href = 'https://github.com/mvriu5/griller'}
                    whileHover={{y: -4}}
                    whileTap={{y: -4}}
                >
                    <Github/>
                </motion.div>
            </motion.div>


            <motion.div
                initial={{opacity: 0, filter: 'blur(10px)', y: 100}}
                animate={{opacity: 1, filter: 'blur(0px)', y: 0}}
                transition={{duration: 1}}
                className={"flex flex-col space-y-4"}
            >
                <div className={"flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:justify-between sm:space-y-0 pb-8"}>
                    <div className={"flex flex-row space-x-2"}>
                        <Button title={"Test"}
                                icon={<ListPlus size={15} className={"mr-2"}/>}
                                onClick={() =>
                                    addToast({
                                        icon: <ShieldAlert size={24}/>,
                                        title: 'Toast Notification',
                                        subtitle: 'This is the second toast title'
                                    }
                                )}
                                className={"text-zinc-200 bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-100 py-1.5"}
                        />
                        <Link href={"https://www.npmjs.com/package/griller"} passHref>
                            <Button title={"Docs"}
                                    icon={<BookOpen size={16} className={"mr-2"}/>}
                                    className={"py-1.5"}
                            />
                        </Link>
                        <Button title={"Lab"}
                                icon={<FlaskRound size={15} className={"mr-1.5"}/>}
                                className={"py-1.5"}
                                onClick={() => router.push('/lab')}
                        />
                    </div>

                    <div
                        className={"w-max flex flex-row space-x-8 items-center bg-zinc-50 px-2 py-1 text-zinc-500 rounded-lg border border-zinc-200 overflow-hidden"}>
                        <span className={"font-mono text-sm truncate"}>npm install griller</span>
                        <CopyButton copyText={"npm install griller"}/>
                    </div>
                </div>

                <CodeBlock title={"Code Example"}
                           fileName={"layout.tsx"}
                           filePath={"/layout-example.txt"}
                />

                <CodeBlock fileName={"component.tsx"}
                           filePath={"/component-example.txt"}
                />

                <div className={"flex flex-wrap space-x-2 space-y-2 items-center pt-8"}>
                    <span className={"text-sm text-zinc-700"}>Position</span>
                    <Button title={"top-left"}
                            onClick={() => addToast({
                                icon: <ShieldAlert size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                                position: "tl"
                            })}
                    />
                    <Button title={"top-center"}
                            onClick={() => addToast({
                                icon: <ShieldAlert size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                                position: "tc"
                            })}
                    />
                    <Button title={"top-right"}
                            onClick={() => addToast({
                                icon: <ShieldAlert size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                                position: "tr"
                            })}
                    />
                    <Button title={"bottom-left"}
                            onClick={() => addToast({
                                icon: <ShieldAlert size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                                position: "bl"
                            })}
                    />
                    <Button title={"bottom-center"}
                            onClick={() => addToast({
                                icon: <ShieldAlert size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                                position: "bc"
                            })}
                    />
                    <Button title={"bottom-right"}
                            onClick={() => addToast({
                                icon: <ShieldAlert size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
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
                                subtitle: 'This is the second toast title',
                                duration: 1000
                            })}
                    />
                    <Button title={"3s"}
                            onClick={() => addToast({
                                icon: <ShieldAlert size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                                duration: 3000
                            })}
                    />
                    <Button title={"5s"}
                            onClick={() => addToast({
                                icon: <ShieldAlert size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                                duration: 5000
                            })}
                    />
                </div>

                <div className={"flex flex-row space-x-2 items-center"}>
                    <span className={"text-sm text-zinc-700"}>Buttons</span>
                    <Button title={"Close"}
                            onClick={() => addToast({
                                icon: <ShieldAlert size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                                closeButton: true,
                                duration: 60000
                            })}
                    />
                    <Button title={"Action"}
                            onClick={() => addToast({
                                icon: <ShieldAlert size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                                actionButton: true
                            })}
                    />
                    <Button title={"Close & Action"}
                            onClick={() => addToast({
                                icon: <ShieldAlert size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                                closeButton: true,
                                duration: 60000,
                                actionButton: true
                            })}
                    />
                </div>

                <div className={"flex flex-row space-x-2 items-center"}>
                    <span className={"text-sm text-zinc-700"}>Theme</span>
                    <Button title={"Light"}
                            onClick={() => addToast({
                                icon: <TriangleAlert size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                            })}
                    />
                    <Button title={"Dark"}
                            onClick={() => addToast({
                                icon: <MessageSquare size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                                theme: "dark",
                            })}
                    />
                </div>

                <div className={"flex flex-row space-x-2 items-center pb-16"}>
                    <span className={"text-sm text-zinc-700"}>Icon</span>
                    <Button title={"Alert"}
                            onClick={() => addToast({
                                icon: <TriangleAlert size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                            })}
                    />
                    <Button title={"Message"}
                            onClick={() => addToast({
                                icon: <MessageSquare size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                            })}
                    />
                    <Button title={"Branch"}
                            onClick={() => addToast({
                                icon: <GitBranch size={24}/>,
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                            })}
                    />
                    <Button title={""}
                            icon={<Ban size={16}/>}
                            className={"py-2"}
                            onClick={() => addToast({
                                title: 'Toast Notification',
                                subtitle: 'This is the second toast title',
                            })}
                    />
                </div>

                <div
                    className={"w-full h-20 flex flex-row pt-4 space-x-2 border-t border-zinc-200 text-sm text-zinc-500"}>
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
        </div>
    );
}

"use client";

import {
    Ban,
    Blocks,
    Check,
    FlaskConical,
    GitBranch,
    Github,
    MessageSquare, ShieldAlert,
    SquareArrowOutUpRight,
    TriangleAlert
} from "lucide-react";
import {Toast, GrillerRef, Position} from "@/component/toast";
import {ReactNode, useRef, useState} from "react";
import {CodeBlock} from "@/lib/codeblock";
import {CopyButton} from "@/lib/copybutton";
import {Button} from "@/lib/button";

type InitialProps = {
    title: string,
    secondTitle: string | undefined,
    duration: number | undefined,
    closeButton: boolean,
    position: Position,
    icon: ReactNode | undefined
}

export default function Home() {
    const props: InitialProps = {
        title: "This is a griller",
        secondTitle: "Click again to see a GrillStack!",
        duration: 3000,
        closeButton: false,
        position: "br",
        icon: <ShieldAlert size={24}/>
    }

    const [values, setValues] = useState(props);
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
                                icon={<FlaskConical size={16} className={"mr-2"}/>}
                                onClick={() => grillerRef.current?.show()}
                                className={"text-zinc-200 bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-100"}
                        />
                        <Button title={"Docs"}
                                icon={<SquareArrowOutUpRight size={16} className={"mr-2"}/>}
                        />
                    </div>

                    <div
                        className={"flex flex-row space-x-8 items-center bg-zinc-50 px-3 py-1 text-zinc-500 rounded-lg border border-zinc-200"}>
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
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, position: "tl"}))
                                grillerRef.current?.show();
                            }}
                    />
                    <Button title={"top-center"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, position: "tc"}))
                                grillerRef.current?.show();
                            }}
                    />
                    <Button title={"top-right"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, position: "tr"}))
                                grillerRef.current?.show();
                            }}
                    />
                    <Button title={"bottom-left"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, position: "bl"}))
                                grillerRef.current?.show();
                            }}
                    />
                    <Button title={"bottom-center"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, position: "bc"}))
                                grillerRef.current?.show();
                            }}
                    />
                    <Button title={"bottom-right"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, position: "br"}))
                                grillerRef.current?.show();
                            }}
                    />
                </div>

                <div className={"flex flex-row space-x-2 items-center"}>
                    <span className={"text-sm text-zinc-700"}>Duration</span>
                    <Button title={"1s"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, duration: 1000}))
                                grillerRef.current?.show();
                            }}
                    />
                    <Button title={"3s"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, duration: 3000}))
                                grillerRef.current?.show();
                            }}
                    />
                    <Button title={"5s"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, duration: 5000}))
                                grillerRef.current?.show();
                            }}
                    />
                </div>

                <div className={"flex flex-row space-x-2 items-center"}>
                    <span className={"text-sm text-zinc-700"}>Close Button</span>
                    <Button title={""}
                            icon={<Check size={16}/>}
                            className={"py-2"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, closeButton: true}))
                                grillerRef.current?.show();
                            }}
                    />
                    <Button title={""}
                            icon={<Ban size={16}/>}
                            className={"py-2"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, closeButton: false}))
                                grillerRef.current?.show();
                            }}
                    />
                    <Button title={"Without Duration"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, closeButton: true, duration: undefined}))
                                grillerRef.current?.show();
                            }}
                    />
                </div>

                <div className={"flex flex-row space-x-2 items-center"}>
                    <span className={"text-sm text-zinc-700"}>Icon</span>
                    <Button title={"Alert"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, icon: <TriangleAlert size={24}/>}))
                                grillerRef.current?.show();
                            }}
                    />
                    <Button title={"Message"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, icon: <MessageSquare size={24}/>}))
                                grillerRef.current?.show();
                            }}
                    />
                    <Button title={"Branch"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, icon: <GitBranch size={24}/>}))
                                grillerRef.current?.show();
                            }}
                    />
                    <Button title={""}
                            icon={<Ban size={16}/>}
                            className={"py-2"}
                            onClick={() => {
                                setValues(prevProps => ({...prevProps, icon: undefined}))
                                grillerRef.current?.show();
                            }}
                    />
                </div>

            </div>

            <Toast title={values.title}
                   secondTitle={values.secondTitle ?? undefined}
                   icon={values.icon ?? undefined}
                   duration={values.duration ?? undefined}
                   closeButton={values.closeButton}
                   position={values.position as Position}
                   ref={grillerRef}
            />
        </>
    );
}

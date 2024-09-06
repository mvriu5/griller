"use client";

import React, {HTMLAttributes, useEffect, useState} from "react";
import {CopyButton} from "@/lib/copybutton";
import TextareaAutosize from 'react-textarea-autosize';

interface CodeBockProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    fileName: string;
    filePath: string;
}

const CodeBlock: React.FC<CodeBockProps> = ({ title, fileName, filePath }) => {
    const [fileContent, setFileContent] = useState('');

    useEffect(() => {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                setFileContent(text);
            })
            .catch(error => console.error('Error fetching the file:', error));
    }, [filePath]);

    return (
        <div className={"flex flex-col space-y-2"}>
            {title && <span className={"text-sm text-zinc-700 font-medium"}>{title}</span>}
            <div className={"flex flex-row justify-between w-full h-max bg-zinc-50 rounded-lg border border-zinc-200"}>
                <div className={"w-full h-max flex flex-col"}>
                    <div
                        className={"flex flex-row justify-between items-center px-2 py-1 bg-zinc-100 border-b border-zinc-200 rounded-t-lg"}>
                        <span className={"text-zinc-500 text-xs"}>{fileName}</span>
                        <CopyButton copyText={fileContent}/>
                    </div>
                    <TextareaAutosize
                        className={"p-2 w-full h-auto font-mono text-sm text-zinc-500 bg-zinc-50 overflow-hidden resize-none focus:outline-none rounded-b-lg"}
                        value={fileContent}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}

export {CodeBlock};
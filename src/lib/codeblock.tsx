"use client";

import React, {HTMLAttributes, useEffect, useState} from "react";
import {CopyButton} from "@/lib/copybutton";

interface CodeBockProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    filePath: string;
}

const CodeBlock: React.FC<CodeBockProps> = ({ title, filePath, className, ...props }) => {
    const [fileContent, setFileContent] = useState('');
    const [lineCount, setLineCount] = useState(0);

    useEffect(() => {
        fetch('/example.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                setFileContent(text);
                const lines = text.split(/\r\n|\r|\n/);
                setLineCount(lines.length);
            })
            .catch(error => console.error('Error fetching the file:', error));
    }, []);

    return (
        <div className={"flex flex-col space-y-2"}>
            {title && <span className={"text-sm text-zinc-700 font-medium"}>{title}</span>}
            <div className={"flex flex-row w-full h-max p-2 bg-zinc-50 rounded-lg border border-zinc-200"}>
                <textarea className={"w-full h-full font-mono text-sm text-zinc-500 bg-zinc-50 overflow-hidden resize-none focus:outline-none"}
                          value={fileContent}
                          rows={lineCount}

                          readOnly
                />
                <CopyButton copyText={fileContent}/>
            </div>

        </div>
    );
}

export { CodeBlock };
import React, { useRef } from 'react';
import {Toast} from './toast';
import {Meta, StoryObj} from "@storybook/react";
import {GitBranch, TriangleAlert} from "lucide-react";
import {Toaster, useToast} from "@/component/toaster";

const meta: Meta<typeof Toast> = {
    title: "Component/Toast",
    component: Toast,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toast>

export const Default: Story = {
    render: () => {

        const Test: React.FC = () => {
            const { addToast } = useToast();

            const handleClick = () => {
                addToast({
                    icon: <GitBranch size={24}/>,
                    title: 'Toast-Benachrichtigung!',
                    secondTitle: 'Dies ist eine Toast Description bla bla',
                });
            };

            return <button onClick={handleClick}>Toast anzeigen</button>;
        };

        return (
            <>
                <Toaster>
                    <Test/>
                </Toaster>
            </>
        );
    },
};
import React from 'react';
import {Griller} from './griller';
import {Meta, StoryObj} from "@storybook/react";
import {TriangleAlert} from "lucide-react";

const meta: Meta<typeof Griller> = {
    title: "Component/Griller",
    component: Griller,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Griller>

export const Default: Story = {
    render: () => {
        return (
            <Griller title={"Alert Title"}
                     secondTitle={"This is a second title"}
                     icon={<TriangleAlert size={24} className={"text-zinc-700"}/>}
            />
        );
    },
};
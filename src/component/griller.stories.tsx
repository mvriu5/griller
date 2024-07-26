import React, { useRef } from 'react';
import {Griller, GrillerRef} from './griller';
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
        const grillerRef = useRef<GrillerRef>(null);

        return (
            <>
                <button title={"Button"}
                        className={"bg-amber-600"}
                        onClick={() => grillerRef.current?.show()}
                />

                <Griller title={"Alert Title"}
                         secondTitle={"This is a second title"}
                         icon={<TriangleAlert size={24} className={"text-zinc-700"}/>}
                         placement={"tr"}
                         closeButton={true}
                         ref={grillerRef}
                />
            </>
        );
    },
};
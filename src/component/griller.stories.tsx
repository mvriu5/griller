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
                <div className={"bg-amber-600 w-20 h-20"}
                    onClick={() => grillerRef.current?.show()}
                />

                <Griller title={"Alert Title tile eemelm ltmelmemtletlme"}
                         secondTitle={"This is a second title wbjgb jg"}
                         icon={<TriangleAlert size={24}/>}
                         closeButton={true}
                         position={"tl"}
                         ref={grillerRef}
                />
            </>
        );
    },
};
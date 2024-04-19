import ClassicyControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/ClassicyControlLabel";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumBaseTheme.css';

const meta = {
    title: 'Platinum/ClassicyControlLabel',
    component: ClassicyControlLabel,
    parameters: {
        layout: 'centered',
    }, argTypes: {
        labelFor: {table: {disable: true}},
    },

    tags: ['autodocs'],
} satisfies Meta<typeof ClassicyControlLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        labelFor: "htmlid",
        label: "Control Label",
        disabled: false,
        direction: "left"
    },
};

export const Disabled: Story = {
    args: {
        labelFor: "htmlid",
        label: "Control Label",
        disabled: true,
        direction: "left"
    },
};

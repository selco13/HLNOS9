import ClassicyInput from "@/app/SystemFolder/SystemResources/Input/ClassicyInput";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumBaseTheme.css';

const meta = {
    title: 'Platinum/ClassicyInput',
    component: ClassicyInput,
    parameters: {
        layout: 'centered',
        label: "OK"
    },
    argTypes: {
        onChangeFunc: {table: {disable: true}},
        id: {table: {disable: true}},
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ClassicyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        id: "test",
        inputType: "text",
        labelTitle: "Text Input",
        placeholder: "Placeholder Text",
    },
};

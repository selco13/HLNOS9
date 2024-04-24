import ClassicyCheckbox from "@/app/SystemFolder/SystemResources/Checkbox/ClassicyCheckbox";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumBaseTheme.css';

const meta = {
    title: 'Platinum/PlatinumCheckbox',
    component: ClassicyCheckbox,
    parameters: {
        layout: 'centered',
        label: "Button"
    },
    argTypes: {
        onClick: {table: {disable: true}},
        id: {table: {disable: true}},
        name: {table: {disable: true}},
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ClassicyCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        id: "test_checkbox",
        name: "test_checkbox",
        checked: false,
        label: "Checkbox"
    },
};

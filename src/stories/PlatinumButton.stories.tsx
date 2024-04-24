import ClassicyButton from "@/app/SystemFolder/SystemResources/Button/ClassicyButton";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumBaseTheme.css';

const meta = {
    title: 'Platinum/PlatinumButton',
    component: ClassicyButton,
    parameters: {
        layout: 'centered',
        label: "Button"
    },
    argTypes: {
        onClick: {table: {disable: true}},
        children: {table: {disable: true}},
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ClassicyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        isDefault: false,
        children: <span>{meta.parameters.label}</span>
    },
};

export const Default: Story = {
    args: {
        isDefault: true,
        children: <span>Submit</span>
    },
};

export const Small: Story = {
    args: {
        children: <span>Submit</span>,
        buttonSize: "small"
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: <span>Disabled</span>
    },
};

export const Square: Story = {
    args: {
        disabled: false,
        children: <img src={"/img/icons/system/files/file.png"}/>,
        buttonShape: "square"
    },
};

export const SquareSmall: Story = {
    args: {
        disabled: false,
        children: <img src={"/img/icons/system/files/file.png"}/>,
        buttonShape: "square",
        buttonSize: "small"
    },
};

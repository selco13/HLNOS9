import ClassicyDisclosure from "@/app/SystemFolder/SystemResources/Disclosure/ClassicyDisclosure";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumBaseTheme.css';

const meta = {
    title: 'Platinum/ClassicyDisclosure',
    component: ClassicyDisclosure,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        children: {table: {disable: true}},
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ClassicyDisclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: "OPEN THIS DISCLOSURE AREA",
        direction: "right",
        children: <span>EXPANDED</span>
    },
};

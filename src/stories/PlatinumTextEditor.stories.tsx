import ClassicyTextEditor from "@/app/SystemFolder/SystemResources/TextEditor/ClassicyTextEditor";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumBaseTheme.css';

const meta = {
    title: 'Platinum/ClassicyTextEditor',
    component: ClassicyTextEditor,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ClassicyTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        content: "Lorem ipsum dolor sit amet"
    },
};

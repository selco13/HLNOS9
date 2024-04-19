import ClassicyRichTextEditor from "@/app/SystemFolder/SystemResources/RichTextEditor/ClassicyRichTextEditor";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumBaseTheme.css';

const meta = {
    title: 'Platinum/ClassicyRichTextEditor',
    component: ClassicyRichTextEditor,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ClassicyRichTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        content: "Lorem ipsum dolor sit amet"
    },
};

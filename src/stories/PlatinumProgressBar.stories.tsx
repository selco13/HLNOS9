import ClassicyProgressBar from "@/app/SystemFolder/SystemResources/ProgressBar/ClassicyProgressBar";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumBaseTheme.css';

const meta = {
    title: 'Platinum/ClassicyProgressBar',
    component: ClassicyProgressBar,
    parameters: {
        layout: 'padding',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ClassicyProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        max: 100,
        value: 50
    },
};

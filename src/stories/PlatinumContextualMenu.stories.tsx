import ClassicyContextualMenu from "@/app/SystemFolder/SystemResources/ContextualMenu/ClassicyContextualMenu";
import type {Meta, StoryObj} from '@storybook/react';
import './PlatinumBaseTheme.css';

const meta = {
    title: 'Platinum/ClassicyContextualMenu',
    component: ClassicyContextualMenu,
    decorators: [
        (Story) => (
            <div style={{margin: '3em'}}>
                <Story/>
            </div>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ClassicyContextualMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        position: [0, 0],
        menuItems: [{
            id: "file",
            title: "File",
            menuChildren: [
                {
                    id: "_connect",
                    title: "Connect",
                    keyboardShortcut: "&#8984;A",
                    icon: "/img/icons/system/network/internet-services.png"
                },
                {
                    id: "spacer",
                },
                {
                    id: "_quit",
                    title: "Quit",
                    keyboardShortcut: "&#8984;Q"
                }]
        },
            {
                id: "edit",
                title: "Edit",
                menuChildren: [
                    {
                        id: "_copy",
                        title: "Copy",
                        keyboardShortcut: "&#8984;C"
                    }
                ]
            }],
    },
};

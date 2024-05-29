import type {StorybookConfig} from "@storybook/nextjs"
import path from "path"

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.old.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    staticDirs: ["../public"], // This loads images at localhost:6006/next.svg e.t.c.
    async webpackFinal(config, {configType}) {
        if (config?.resolve?.alias) {
            config.resolve.alias = {
                ...config.resolve.alias,
                "@/app": path.resolve(__dirname, "../src/app"),
            }
        }
        return config
    },
}
export default config

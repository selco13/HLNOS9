import {PlatinumDesktopIconState} from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopIconContext";
import {ClassicyMenuItem} from "@/app/SystemFolder/SystemResources/Menu/ClassicyMenu";
import {Howl} from 'howler';


export interface PlatinumDesktopState {
    activeTheme: string;
    soundPlayer: Howl;
    availableThemes: PlatinumTheme[];
    selectedDesktopIcons: string[];
    activeWindow: string;
    activeApp: string;
    menuBar: ClassicyMenuItem[];
    systemMenu: ClassicyMenuItem[];
    appSwitcherMenu: ClassicyMenuItem[];
    contextMenu: ClassicyMenuItem[];
    showContextMenu: boolean;
    selectBox: boolean;
    selectBoxSize: number[];
    selectBoxStart: number[];
    desktopIcons: PlatinumDesktopIconState[];
    openApps: PlatinumAppItem[];
}

export type PlatinumAppItem = {
    id: string;
    name: string;
    icon: string;
    hidden: boolean;
    defaultWindow?: string;
};

export type PlatinumThemeColorPalette = [number, number, number, number, number, number, number];

export type PlatinumThemeColorsWindow = {
    border: string;
    borderOutset: string;
    borderInset: string;
    frame: string;
    title: string;
    document: string;
}

export type PlatinumThemeColors = {
    outline: string;
    select: string;
    highlight: string;
    black: string;
    white: string;
    alert: string;
    error: string;
    system: PlatinumThemeColorPalette;
    theme: PlatinumThemeColorPalette;
    window: PlatinumThemeColorsWindow;
}

export type PlatinumThemeTypography = {
    ui: string;
    uiSize: string;
    header: string;
    headerSize: string;
    body: string;
    bodySize: string;
}

export type PlatinumThemeMeasurementsWindow = {
    borderSize: string;
    controlSize: string;
    paddingSize: string
    scrollbarSize: string;
}

export type PlatinumThemeMeasurements = {
    window: PlatinumThemeMeasurementsWindow;
}

export type PlatinumThemeSound = {
    file: string;
    disabled: string[];
}

export type PlatinumThemeDesktop = {
    iconSize: string;
    iconFontSize: string;
    backgroundImage: string;
    backgroundColor: string;
    repeat: string;
    position: string;
    size: string;
}

export type PlatinumTheme = {
    id: string;
    name: string;
    color: PlatinumThemeColors
    typography: PlatinumThemeTypography;
    measurements: PlatinumThemeMeasurements;
    desktop: PlatinumThemeDesktop;
    sound: PlatinumThemeSound;
};


export const DefaultDesktopState: PlatinumDesktopState = {
    activeTheme: "default",
    availableThemes: [],
    selectedDesktopIcons: [],
    soundPlayer: null,
    activeWindow: "",
    menuBar: [],
    systemMenu: [{
        id: "about",
        title: "About This Computer",
        keyboardShortcut: "&#8984;S"
    },
        {id: "spacer"},
    ],
    activeApp: "finder.app",
    appSwitcherMenu: [
        {
            id: "finder.app",
            title: "Finder",
            icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/system/macos.svg`

        }
    ],
    openApps: [
        {
            id: "finder.app",
            name: "Finder",
            icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/system/macos.svg`,
            hidden: false
        }
    ],
    desktopIcons: [],
    contextMenu: [],
    showContextMenu: false,
    selectBox: false,
    selectBoxSize: [0, 0],
    selectBoxStart: [0, 0]
};

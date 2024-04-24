import {ClassicyDesktopIconState} from "@/app/SystemFolder/SystemResources/Desktop/ClassicyDesktopIconContext";
import {ClassicyMenuItem} from "@/app/SystemFolder/SystemResources/Menu/ClassicyMenu";
import {Howl} from 'howler';


export interface ClassicyDesktopState {
    activeTheme: string;
    soundPlayer: Howl;
    availableThemes: ClassicyTheme[];
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
    desktopIcons: ClassicyDesktopIconState[];
    openApps: ClassicyAppItem[];
}

export type ClassicyAppItem = {
    id: string;
    name: string;
    icon: string;
    hidden: boolean;
    defaultWindow?: string;
};

export type ClassicyThemeColorPalette = [number, number, number, number, number, number, number];

export type ClassicyThemeColorsWindow = {
    border: string;
    borderOutset: string;
    borderInset: string;
    frame: string;
    title: string;
    document: string;
}

export type ClassicyThemeColors = {
    outline: string;
    select: string;
    highlight: string;
    black: string;
    white: string;
    alert: string;
    error: string;
    system: ClassicyThemeColorPalette;
    theme: ClassicyThemeColorPalette;
    window: ClassicyThemeColorsWindow;
}

export type ClassicyThemeTypography = {
    ui: string;
    uiSize: string;
    header: string;
    headerSize: string;
    body: string;
    bodySize: string;
}

export type ClassicyThemeMeasurementsWindow = {
    borderSize: string;
    controlSize: string;
    paddingSize: string
    scrollbarSize: string;
}

export type ClassicyThemeMeasurements = {
    window: ClassicyThemeMeasurementsWindow;
}

export type ClassicyThemeSound = {
    file: string;
    disabled: string[];
}

export type ClassicyThemeDesktop = {
    iconSize: string;
    iconFontSize: string;
    backgroundImage: string;
    backgroundColor: string;
    repeat: string;
    position: string;
    size: string;
}

export type ClassicyTheme = {
    id: string;
    name: string;
    color: ClassicyThemeColors
    typography: ClassicyThemeTypography;
    measurements: ClassicyThemeMeasurements;
    desktop: ClassicyThemeDesktop;
    sound: ClassicyThemeSound;
};


export const DefaultDesktopState: ClassicyDesktopState = {
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

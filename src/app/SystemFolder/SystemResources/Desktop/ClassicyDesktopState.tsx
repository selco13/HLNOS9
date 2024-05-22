import { ClassicyDesktopIconState } from '@/app/SystemFolder/SystemResources/Desktop/ClassicyDesktopIconContext'
import { ClassicyMenuItem } from '@/app/SystemFolder/SystemResources/Menu/ClassicyMenu'
import { Howl } from 'howler'

interface ClassicyStore {}

export interface ClassicyDesktopState {
    activeTheme: string
    soundPlayer: Howl
    availableThemes: ClassicyTheme[]
    selectedDesktopIcons: string[]
    activeWindow: string
    activeApp: string
    menuBar: ClassicyMenuItem[]
    systemMenu: ClassicyMenuItem[]
    appSwitcherMenu: ClassicyMenuItem[]
    contextMenu: ClassicyMenuItem[]
    showContextMenu: boolean
    selectBox: boolean
    selectBoxSize: number[]
    selectBoxStart: number[]
    desktopIcons: ClassicyDesktopIconState[]
    openApps: ClassicyAppItem[]
}

export type ClassicyAppItem = {
    id: string
    name: string
    icon: string
    hidden: boolean
    defaultWindow?: string
}

export type ClassicyThemeColorPalette = [number, number, number, number, number, number, number]

export type ClassicyThemeColorsWindow = {
    border: string
    borderOutset: string
    borderInset: string
    frame: string
    title: string
    document: string
}

export type ClassicyThemeColors = {
    outline: number
    select: number
    highlight: number
    black: number
    white: number
    alert: number
    error: number
    system: ClassicyThemeColorPalette
    theme: ClassicyThemeColorPalette
    window: ClassicyThemeColorsWindow
}

export type ClassicyThemeTypography = {
    ui: string
    uiSize: number
    header: string
    headerSize: number
    body: string
    bodySize: number
}

export type ClassicyThemeMeasurementsWindow = {
    borderSize: number
    controlSize: number
    paddingSize: number
    scrollbarSize: number
}

export type ClassicyThemeMeasurements = {
    window: ClassicyThemeMeasurementsWindow
}

export type ClassicyThemeSound = {
    file: string
    disabled: string[]
}

export type ClassicyThemeDesktop = {
    iconSize: number
    iconFontSize: number
    backgroundImage: string
    backgroundColor: string
    backgroundSize: number
    backgroundRepeat: string
    backgroundPosition: string | number
}

export type ClassicyTheme = {
    id: string
    name: string
    color: ClassicyThemeColors
    typography: ClassicyThemeTypography
    measurements: ClassicyThemeMeasurements
    desktop: ClassicyThemeDesktop
    sound: ClassicyThemeSound
}

export const DefaultDesktopState: ClassicyDesktopState = {
    activeTheme: 'default',
    availableThemes: [],
    selectedDesktopIcons: [],
    soundPlayer: null,
    activeWindow: '',
    menuBar: [],
    systemMenu: [
        {
            id: 'about',
            title: 'About This Computer',
            keyboardShortcut: '&#8984;S',
        },
        { id: 'spacer' },
    ],
    activeApp: 'finder.app',
    appSwitcherMenu: [
        {
            id: 'finder.app',
            title: 'Finder',
            icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/icons/system/macos.svg`,
        },
    ],
    openApps: [
        {
            id: 'finder.app',
            name: 'Finder',
            icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/icons/system/macos.svg`,
            hidden: false,
        },
    ],
    desktopIcons: [],
    contextMenu: [],
    showContextMenu: false,
    selectBox: false,
    selectBoxSize: [0, 0],
    selectBoxStart: [0, 0],
}

import {Howl} from 'howler';
import React from 'react';
import fetch from "sync-fetch";
import soundData from "../../../../../public/sounds/platinum/platinum.json"
import soundLabels from "./ClassicySoundManagerLabels.json";

export const ClassicySoundManagerContext = React.createContext(null);
export const PlatinumSoundDispatchContext = React.createContext(null);

export type PlatinumSoundInfo = {
    id: string;
    group: string;
    label: string;
    description: string;
}

type PlatinumSoundState = {
    soundPlayer: Howl | null;
    disabled: string[];
    labels: PlatinumSoundInfo[];
    volume?: number;
}

enum PlatinumSoundActionTypes {
    PlatinumSoundStop,
    PlatinumSoundPlay,
    PlatinumSoundPlayInterrupt,
    PlatinumSoundLoad,
    PlatinumSoundSet,
    PlatinumSoundDisable,
    PlatinumVolumeSet
}

interface PlatinumSoundAction {
    type: PlatinumSoundActionTypes;
    sound?: string;
    file?: string;
    disabled?: string[];
    soundPlayer?: any;
}

export const createSoundPlayer = ({soundData, options}: SoundPlayer): Howl => {
    if ('src' in soundData && 'sprite' in soundData) {
        return new Howl({
            src: soundData.src.map(i => process.env.NEXT_PUBLIC_BASE_PATH + i),
            sprite: soundData.sprite,
            ...options
        });
    }
}

export const initialPlayer = {
    soundPlayer: createSoundPlayer({soundData: soundData}),
    disabled: [],
    labels: soundLabels,
    volume: 100
};

export const getSoundTheme = (soundThemeURL: string) => {
    return fetch(soundThemeURL).json();
};

interface SoundPlayer {
    soundData: {
        src: string[];
        sprite: Record<string, any>;
    };
    options?: Record<string, any>;
}


export const loadSoundTheme = (soundThemeURL: string): Howl => {
    const data = getSoundTheme(soundThemeURL);
    return createSoundPlayer({soundData: data});
}

export function useSound() {
    return React.useContext(ClassicySoundManagerContext);
}

export function useSoundDispatch() {
    return React.useContext(PlatinumSoundDispatchContext);
}

const playerCanPlayInterrupt = ({disabled, soundPlayer}: PlatinumSoundState, sound: string) => {
    return (
        !disabled.includes("*") &&
        !disabled.includes(sound) &&
        soundPlayer
    );
}

const playerCanPlay = (ss: PlatinumSoundState, sound: string) => {
    return (
        playerCanPlayInterrupt(ss, sound) &&
        !ss.soundPlayer.playing()
    )
}

export const PlatinumSoundStateEventReducer = (
    ss: PlatinumSoundState,
    action: PlatinumSoundAction
) => {
    const validatedAction = PlatinumSoundActionTypes[action.type as unknown as keyof typeof PlatinumSoundActionTypes];
    switch (validatedAction) {
        case PlatinumSoundActionTypes.PlatinumSoundStop: {
            ss.soundPlayer.stop();
            break;
        }
        case PlatinumSoundActionTypes.PlatinumSoundPlay: {
            if (playerCanPlay(ss, action.sound)) {
                ss.soundPlayer.play(action.sound);
            }
            break;
        }
        case PlatinumSoundActionTypes.PlatinumSoundPlayInterrupt: {
            if (playerCanPlayInterrupt(ss, action.sound)) {
                ss.soundPlayer.stop();
                ss.soundPlayer.play(action.sound);
            }
            break;
        }
        case PlatinumSoundActionTypes.PlatinumSoundLoad: {
            ss.soundPlayer = loadSoundTheme(process.env.NEXT_PUBLIC_BASE_PATH + action.file);
            ss.disabled = action.disabled;
            break;
        }
        case PlatinumSoundActionTypes.PlatinumSoundSet: {
            ss.soundPlayer = action.soundPlayer;
            break;
        }
        case PlatinumSoundActionTypes.PlatinumVolumeSet: {
            ss.soundPlayer = action.soundPlayer;
            break;
        }
        case PlatinumSoundActionTypes.PlatinumSoundDisable: {
            ss.disabled = action.disabled;
            break;
        }
    }
    return ss;
};


export function PlatinumSoundManagerProvider({children}) {
    const [sound, soundDispatch] = React.useReducer(PlatinumSoundStateEventReducer, initialPlayer);

    return (
        <ClassicySoundManagerContext.Provider value={sound}>
            <PlatinumSoundDispatchContext.Provider value={soundDispatch}>
                {children}
            </PlatinumSoundDispatchContext.Provider>
        </ClassicySoundManagerContext.Provider>
    );
}

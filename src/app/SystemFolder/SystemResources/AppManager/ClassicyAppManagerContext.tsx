import ClassicyBoot from "@/app/SystemFolder/SystemResources/Boot/ClassicyBoot";
import {platinumDesktopIconEventHandler} from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopIconContext";
import {
    DefaultDesktopState,
    PlatinumDesktopState
} from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopState";
import {
    platinumWindowEventHandler
} from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopWindowManagerContext"
import {
    PlatinumSoundManagerProvider
} from "@/app/SystemFolder/SystemResources/SoundManager/PlatinumSoundManagerContext";
import React, {createContext, Suspense, useContext, useReducer} from 'react';

const PlatinumDesktopContext = createContext(null);
const PlatinumDesktopDispatchContext = createContext(null);

type PlatinumDesktopProviderProps = {
    children?: any
}
export const PlatinumDesktopProvider: React.FC<PlatinumDesktopProviderProps> = ({children}) => {
    let desktopState = typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('platinumDesktopState')) || DefaultDesktopState
        : DefaultDesktopState;

    const [desktop, dispatch] = useReducer(platinumDesktopStateEventReducer, desktopState);

    React.useEffect(() => {
        localStorage.setItem('platinumDesktopState', JSON.stringify(desktop));
    }, [desktop])

    return (
        <Suspense fallback={<ClassicyBoot/>}>
            <PlatinumDesktopContext.Provider value={desktop}>
                <PlatinumDesktopDispatchContext.Provider value={dispatch}>
                    <PlatinumSoundManagerProvider>
                        {children}
                    </PlatinumSoundManagerProvider>
                </PlatinumDesktopDispatchContext.Provider>
            </PlatinumDesktopContext.Provider>
        </Suspense>
    );
}

export function useDesktop() {
    return useContext(PlatinumDesktopContext);
}

export function useDesktopDispatch() {
    return useContext(PlatinumDesktopDispatchContext);
}

export const platinumDesktopEventHandler = (ds: PlatinumDesktopState, action) => {
    switch (action.type) {
        case "PlatinumDesktopFocus": {
            if ('e' in action && action.e.target.id === "platinumDesktop") {
                ds.activeWindow = "";
                ds.activeApp = "finder.app";
                ds.selectedDesktopIcons = [];
                ds.showContextMenu = false;
                ds.selectBox = true;
                ds.selectBoxStart = [action.e.clientX, action.e.clientY];
            }

            if ('menuBar' in action) {
                ds.menuBar = action.menuBar;
            }

            break;
        }
        case "PlatinumDesktopDoubleClick": {
            break;
        }
        case "PlatinumDesktopDrag": {
            ds.selectBoxSize = [action.e.clientX - ds.selectBoxStart[0], action.e.clientY - ds.selectBoxStart[1]];
            break;
        }
        case "PlatinumDesktopStop": {
            ds.selectBox = false;
            ds.selectBoxStart = [0, 0];
            ds.selectBoxSize = [0, 0];
            break;
        }
        case "PlatinumDesktopContextMenu": {
            ds.showContextMenu = action.showContextMenu;
            if (action.contextMenu) {
                ds.contextMenu = action.contextMenu;
            }
            break;
        }
        case "PlatinumDesktopTheme": {
            ds.activeTheme = action.activeTheme;
            break;
        }
        case "PlatinumDesktopLoadThemes": {
            ds.availableThemes = action.availableThemes;
        }
    }
    return ds;
};


export const platinumAppEventHandler = (ds: PlatinumDesktopState, action) => {
    switch (action.type) {
        case "PlatinumAppOpen": {
            const findIcon = ds.openApps.find((i) =>
                i.id === action.app.id
            );
            if (!findIcon) {
                ds.openApps.push({
                    id: action.app.id,
                    name: action.app.name,
                    icon: action.app.icon,
                    hidden: false,
                    defaultWindow: action.app.defaultWindow
                })
            }
            break;
        }
        case "PlatinumAppClose": {
            ds.openApps = ds.openApps.filter((oa) => oa.id !== action.app.id);
            ds.activeWindow = "";
            break;
        }
        case "PlatinumAppFocus": {
            if (ds.activeApp !== action.app.id) {
                ds.activeWindow = action.window;
            }
            ds.activeApp = action.app.id;
            break;
        }
        case "PlatinumAppActivate": {
            ds.activeApp = action.app.id;
            break;
        }
    }

    return ds;

};

export const platinumDesktopStateEventReducer = (ds: PlatinumDesktopState, action) => {
    const startDs = ds;
    if ('type' in action) {
        if (action.type.startsWith("PlatinumWindow")) {
            ds = platinumWindowEventHandler(ds, action);
        } else if (action.type.startsWith("PlatinumApp")) {
            ds = platinumAppEventHandler(ds, action);
        } else if (action.type.startsWith("PlatinumDesktopIcon")) {
            ds = platinumDesktopIconEventHandler(ds, action);
        } else if (action.type.startsWith("PlatinumDesktop")) {
            ds = platinumDesktopEventHandler(ds, action);
        }
    }
    if ('debug' in action) {
        console.group("Desktop Event");
        console.log("Action: ", action);
        console.log("Start State: ", startDs)
        console.log("End State: ", ds)
        console.groupEnd();
    }
    return {...ds};
};

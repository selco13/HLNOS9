import {ClassicyDesktopState} from "@/app/SystemFolder/SystemResources/Desktop/ClassicyDesktopState";

export const classicyWindowEventHandler = (ds: ClassicyDesktopState, action) => {
    switch (action.type) {
        case "ClassicyWindowOpen": {
            ds.activeWindow = action.app.id;
            break;
        }
        case "ClassicyWindowClose": {
            break;
        }
        case "ClassicyWindowFocus": {
            ds.activeWindow = action.app.window;
            ds.menuBar = action.app.appMenu;
            ds.activeApp = action.app.id;
            break;
        }
        case "ClassicyWindowMenu": {
            ds.menuBar = action.menuBar;
        }
    }
    return ds;
};

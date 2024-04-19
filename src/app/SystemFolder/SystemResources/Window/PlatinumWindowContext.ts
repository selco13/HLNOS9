import {ClassicyMenuItem} from "@/app/SystemFolder/SystemResources/Menu/ClassicyMenu";

export type PlatinumWindowState = {
    size: [number, number],
    position: [number, number],
    clickPosition?: [number, number];
    closed?: boolean,
    menuBar?: ClassicyMenuItem[];
    collapsed?: boolean;
    zoomed?: boolean;
    dragging?: boolean;
    resizing?: boolean;
    sounding?: boolean;
    moving?: boolean;
    contextMenu?: [];
    contextMenuShown: boolean;
    contextMenuLocation?: [number, number];
}

export const PlatinumWindowStateEventReducer = (ws: PlatinumWindowState, action) => {
    switch (action.type) {
        case "PlatinumWindowOpen": {
            ws.closed = false;
            break;
        }
        case "PlatinumWindowClose": {
            ws.closed = true;
            break;
        }
        case "PlatinumWindowResize": {
            ws.resizing = action.resizing;
            break;
        }
        case "PlatinumWindowZoom": {
            ws.zoomed = action.zoomed;
            break;
        }
        case "PlatinumWindowFocus": {
            break;
        }
        case "PlatinumWindowExpand": {
            ws.collapsed = false;
            break;
        }
        case "PlatinumWindowCollapse": {
            ws.collapsed = true;
            break;
        }
        case "PlatinumWindowDrag": {
            ws.dragging = action.dragging;
            break;
        }
        case "PlatinumWindowContextMenu": {
            ws.contextMenu = action.contextMenu;
            if (action.contextMenuShown === true) {
                ws.contextMenuLocation = action.position;
            }
            break;
        }
        case "PlatinumWindowMove": {
            ws.moving = action.moving;
            if (action.moving === true) {
                ws.position = action.position;
            }
            break;
        }
        case "PlatinumWindowPosition": {
            ws.position = action.position;
            break;
        }
    }
    return {...ws};
};


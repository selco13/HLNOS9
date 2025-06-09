import {
    ClassicyStore,
    ClassicyStoreSystemAppWindow,
} from '@/app/SystemFolder/ControlPanels/AppManager/ClassicyAppManager'
import { ClassicyMenuItem } from '@/app/SystemFolder/SystemResources/Menu/ClassicyMenu'

const initialWindowState = {
    closed: false,
    collapsed: false,
    dragging: false,
    moving: false,
    resizing: false,
    sounding: false,
    zoomed: false,
    contextMenuShown: false,
}

const notEmpty = <T,>(value: T | null | undefined): value is T => value != null

type ClassicyWindowAction =
    // Open the Window's Context Menu
    | { type: 'ClassicyWindowMenu'; menuBar: ClassicyMenuItem[] }
    // Open a Window
    | {
          type: 'ClassicyWindowOpen'
          app: { id: string }
          window: {
              id: string
              minimumSize: [number, number]
              size: [number, number]
              position: [number, number]
              menuBar?: ClassicyMenuItem[]
          }
      }
    // Focus a Window
    | { type: 'ClassicyWindowFocus'; app: { id: string; menuBar: ClassicyMenuItem[] }; window: { id: string } }
    // Close a Window
    | { type: 'ClassicyWindowClose'; app: { id: string }; window: { id: string } }
    // Close a Window and destroy its entry
    | { type: 'ClassicyWindowDestroy'; app: { id: string }; window: { id: string } }
    // Collapse (or Minimize) a window
    | { type: 'ClassicyWindowCollapse'; app: { id: string }; window: { id: string } }
    // Expand (or Un-Minimize) a window
    | { type: 'ClassicyWindowExpand'; app: { id: string }; window: { id: string } }
    // Drag a window around
    | { type: 'ClassicyWindowDrag'; app: { id: string }; window: { id: string }; dragging: boolean }
    // Zoom a Window
    | { type: 'ClassicyWindowZoom'; app: { id: string }; window: { id: string }; zoomed: boolean }
    // Set a Window's Position
    | { type: 'ClassicyWindowPosition'; app: { id: string }; window: { id: string }; position: [number, number] }
    // Resize a Window
    | {
          type: 'ClassicyWindowResize'
          app: { id: string }
          window: { id: string }
          resizing: boolean
          size: [number, number]
      }
    // Move a Window
    | {
          type: 'ClassicyWindowMove'
          app: { id: string }
          window: { id: string }
          position: [number, number]
          moving: boolean
      }

export const classicyWindowEventHandler = (ds: ClassicyStore, action: ClassicyWindowAction) => {
    const updateWindow = (appId: string, windowId: string, updates: any) => {
        ds.System.Manager.App.apps = ds.System.Manager.App.apps.map((a) => {
            if (a.id === appId) {
                a.windows = a.windows.map((w) => (w.id === windowId ? { ...w, ...updates } : w))
            }
            return a
        })
        return ds
    }

    switch (action.type) {
        case 'ClassicyWindowOpen':
            const app = ds.System.Manager.App.apps.findIndex((app) => app.id === action.app.id)
            const window = ds.System.Manager.App.apps[app].windows.findIndex((w) => w.id === action.window.id)
            if (window < 0) {
                ds.System.Manager.App.apps[app].windows.push({
                    ...initialWindowState,
                    id: action.window.id,
                    minimumSize: action.window.minimumSize,
                    size: action.window.size,
                    position: action.window.position,
                    closed: false,
                    hidden: false,
                    menuBar: action.window.menuBar,
                } as ClassicyStoreSystemAppWindow)
            }
            break
        case 'ClassicyWindowFocus':
            ds.System.Manager.App.apps = ds.System.Manager.App.apps.map((a) => {
                if (a.id === action.app.id) {
                    a.focused = true
                    a.windows = a.windows.map((w) => {
                        w.focused = w.id == action.window.id
                        ds.System.Manager.Desktop.appMenu = action.app.menuBar
                        return w
                    })
                }
                return a
            })
            break

        case 'ClassicyWindowClose':
            ds = updateWindow(action.app.id, action.window.id, { closed: true })
            break

        case 'ClassicyWindowDestroy':
            ds = updateWindow(action.app.id, action.window.id, { closed: true })
            ds.System.Manager.App.apps = ds.System.Manager.App.apps.map((a) => {
                if (a.id === action.app.id) {
                    a.windows = a.windows.map((w) => (w.id === action.window.id ? null : w)).filter(notEmpty)
                }
                return a
            })
            break

        case 'ClassicyWindowMenu':
            ds.System.Manager.Desktop.appMenu = action.menuBar
            break

        case 'ClassicyWindowResize':
            ds.System.Manager.App.apps = ds.System.Manager.App.apps.map((a) => {
                if (a.id === action.app.id) {
                    a.windows = a.windows.map((w) => {
                        if (w.id == action.window.id) {
                            w.resizing = action.resizing
                            w.size = action.size
                        }
                        return w
                    })
                }
                return a
            })
            break
        case 'ClassicyWindowDrag':
            ds.System.Manager.App.apps = ds.System.Manager.App.apps.map((a) => {
                if (a.id === action.app.id) {
                    a.windows = a.windows.map((w) => {
                        if (w.id == action.window.id) {
                            w.dragging = action.dragging
                        }
                        return w
                    })
                }
                return a
            })
            break
        case 'ClassicyWindowZoom':
            ds.System.Manager.App.apps = ds.System.Manager.App.apps.map((a) => {
                if (a.id === action.app.id) {
                    a.windows = a.windows.map((w) => {
                        if (w.id == action.window.id) {
                            w.zoomed = action.zoomed
                        }
                        return w
                    })
                }
                return a
            })
            break
        case 'ClassicyWindowCollapse':
            ds.System.Manager.App.apps = ds.System.Manager.App.apps.map((a) => {
                if (a.id === action.app.id) {
                    a.windows = a.windows.map((w) => {
                        if (w.id == action.window.id) {
                            w.collapsed = true
                        }
                        return w
                    })
                }
                return a
            })
            break
        case 'ClassicyWindowExpand':
            ds.System.Manager.App.apps = ds.System.Manager.App.apps.map((a) => {
                if (a.id === action.app.id) {
                    a.windows = a.windows.map((w) => {
                        if (w.id == action.window.id) {
                            w.collapsed = false
                        }
                        return w
                    })
                }
                return a
            })
            break

        case 'ClassicyWindowMove': {
            ds.System.Manager.App.apps = ds.System.Manager.App.apps.map((a) => {
                if (a.id === action.app.id) {
                    a.windows = a.windows.map((w) => {
                        if (w.id == action.window.id) {
                            w.position = action.position
                            w.moving = action.moving
                        }
                        return w
                    })
                }
                return a
            })
            break
        }
        case 'ClassicyWindowPosition': {
            ds.System.Manager.App.apps = ds.System.Manager.App.apps.map((a) => {
                if (a.id === action.app.id) {
                    a.windows = a.windows.map((w) => {
                        if (w.id == action.window.id) {
                            w.position = action.position
                        }
                        return w
                    })
                }
                return a
            })
            break
        }
        // case 'ClassicyWindowContextMenu': {
        //     ws.contextMenu = action.contextMenu
        //     if (action.contextMenuShown === true) {
        //         ws.contextMenuLocation = action.position
        //     }
        //     break
        // }
        // }
    }
    return ds
}

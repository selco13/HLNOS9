import { ClassicyStore } from '@/app/SystemFolder/ControlPanels/AppManager/ClassicyAppManager'

type classicyQuickTimeEvent = {
    type: string
    url?: string
    urls?: string[]
}

export const classicyQuickTimeEventHandler = (ds: ClassicyStore, action: classicyQuickTimeEvent) => {
    const appId = 'QuickTimePlayer.app'
    switch (action.type) {
        case 'ClassicyAppQuickTimeOpenFile': {
            const appIndex = ds.System.Manager.App.apps.findIndex((app) => app.id === appId)
            ds.System.Manager.App.apps[appIndex].data['openFiles'] = Array.from(
                new Set([...ds.System.Manager.App.apps[appIndex].data['openFiles'], action.url])
            )
            break
        }
        case 'ClassicyAppQuickTimeOpenFiles': {
            const appIndex = ds.System.Manager.App.apps.findIndex((app) => app.id === appId)
            ds.System.Manager.App.apps[appIndex].data['openPaths'] = Array.from(
                new Set([...ds.System.Manager.App.apps[appIndex].data['openPaths'], ...action.urls])
            )
            break
        }
        case 'ClassicyAppQuickTimeCloseFile': {
            const appIndex = ds.System.Manager.App.apps.findIndex((app) => app.id === appId)
            ds.System.Manager.App.apps[appIndex].data['openFiles'] = ds.System.Manager.App.apps[appIndex].data[
                'openFiles'
            ].filter((p: string) => p !== action.url)
            break
        }
    }
    return ds
}

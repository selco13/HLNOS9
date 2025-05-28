import { ClassicyStore } from '@/app/SystemFolder/ControlPanels/AppManager/ClassicyAppManager'

export const classicyFinderEventHandler = (ds: ClassicyStore, action) => {
    const appId = 'Finder.app'
    switch (action.type) {
        case 'ClassicyAppFinderOpenFolder': {
            const appIndex = ds.System.Manager.App.apps.findIndex((app) => app.id === appId)
            ds.System.Manager.App.apps[appIndex].data['openPaths'] = Array.from(
                new Set([...ds.System.Manager.App.apps[appIndex].data['openPaths'], action.path])
            )
            break
        }
        case 'ClassicyAppFinderOpenFolders': {
            const appIndex = ds.System.Manager.App.apps.findIndex((app) => app.id === appId)
            ds.System.Manager.App.apps[appIndex].data['openPaths'] = Array.from(
                new Set([...ds.System.Manager.App.apps[appIndex].data['openPaths'], ...action.paths])
            )
            break
        }

        case 'ClassicyAppFinderCloseFolder': {
            const appIndex = ds.System.Manager.App.apps.findIndex((app) => app.id === appId)
            ds.System.Manager.App.apps[appIndex].data['openPaths'] = ds.System.Manager.App.apps[appIndex].data[
                'openPaths'
            ].filter((p: string) => p !== action.path)
            break
        }

        case 'ClassicyAppFinderEmptyTrash': {
            localStorage.removeItem('classicyDesktopState')

            break
        }
    }
    return ds
}

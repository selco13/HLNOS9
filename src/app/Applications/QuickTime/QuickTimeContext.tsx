import { ClassicyStore } from '@/app/SystemFolder/ControlPanels/AppManager/ClassicyAppManager'

type classicyQuickTimeDocument = {
    url: string
    name?: string
    options?: any
    type?: 'video' | 'audio'
}
type classicyQuickTimeEvent = {
    type: string
    document?: classicyQuickTimeDocument
    documents?: classicyQuickTimeDocument[]
}

export const classicyQuickTimeEventHandler = (ds: ClassicyStore, action: classicyQuickTimeEvent) => {
    const appId = 'QuickTimePlayer.app'
    const appIndex = ds.System.Manager.App.apps.findIndex((app) => app.id === appId)
    if (!ds.System.Manager.App.apps[appIndex].data['openDocuments']) {
        ds.System.Manager.App.apps[appIndex].data['openDocuments'] = []
    }
    const openDocUrls = ds.System.Manager.App.apps[appIndex].data['openDocuments'].map((app) => app.url)
    switch (action.type) {
        case 'ClassicyAppQuickTimeOpenDocument': {
            if (Array.isArray(openDocUrls) && !openDocUrls.includes(action.document.url)) {
                ds.System.Manager.App.apps[appIndex].data['openDocuments'] = Array.from(
                    new Set([...ds.System.Manager.App.apps[appIndex].data['openDocuments'], action.document])
                )
            }
            break
        }
        case 'ClassicyAppQuickTimeOpenDocuments': {
            const docs = action.documents.filter((doc) => !openDocUrls.includes(doc.url))
            ds.System.Manager.App.apps[appIndex].data['openDocuments'] = Array.from(
                new Set([...ds.System.Manager.App.apps[appIndex].data['openDocuments'], ...docs])
            )
            break
        }
        case 'ClassicyAppQuickTimeCloseDocument': {
            ds.System.Manager.App.apps[appIndex].data['openDocuments'] = ds.System.Manager.App.apps[appIndex].data[
                'openDocuments'
            ].filter((p: classicyQuickTimeDocument) => p.url != action.document.url)
            break
        }
    }
    return ds
}

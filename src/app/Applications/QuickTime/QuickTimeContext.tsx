import { classicyAppEventHandler, ClassicyStore } from '@/app/SystemFolder/ControlPanels/AppManager/ClassicyAppManager'
import { QuickTimeAppInfo } from '@/app/Applications/QuickTime/QuickTimeMoviePlayer'

type classicyQuickTimeDocument = {
    url: string
    name?: string
    options?: any
    icon?: string
    type?: 'video' | 'audio'
}
type classicyQuickTimeEvent = {
    type: string
    document?: classicyQuickTimeDocument
    documents?: classicyQuickTimeDocument[]
}

export const classicyQuickTimeEventHandler = (ds: ClassicyStore, action: classicyQuickTimeEvent) => {
    const { id: appId } = QuickTimeAppInfo
    const appIndex = ds.System.Manager.App.apps.findIndex((app) => app.id === appId)
    if (appIndex === -1) {
        ds = classicyAppEventHandler(ds, {
            type: 'ClassicyAppLoad',
            app: QuickTimeAppInfo,
        })
    }
    if (!ds.System.Manager.App.apps[appIndex]?.hasOwnProperty('data')) {
        ds.System.Manager.App.apps[appIndex].data = {}
    }
    if (!ds.System.Manager.App.apps[appIndex]?.data?.hasOwnProperty('openFiles')) {
        ds.System.Manager.App.apps[appIndex].data['openFiles'] = []
    }
    const openDocUrls = ds.System.Manager.App.apps[appIndex].data['openFiles'].map((app) => app.url)

    switch (action.type) {
        case 'ClassicyAppQuickTimeOpenDocument': {
            if (Array.isArray(openDocUrls) && !openDocUrls.includes(action.document.url)) {
                ds.System.Manager.App.apps[appIndex].data['openFiles'] = Array.from(
                    new Set([...ds.System.Manager.App.apps[appIndex].data['openFiles'], action.document])
                )
            }
            break
        }
        case 'ClassicyAppQuickTimeOpenDocuments': {
            const docs = action.documents.filter((doc) => !openDocUrls.includes(doc.url))
            ds.System.Manager.App.apps[appIndex].data['openFiles'] = Array.from(
                new Set([...ds.System.Manager.App.apps[appIndex].data['openFiles'], ...docs])
            )
            break
        }
        case 'ClassicyAppQuickTimeCloseDocument': {
            ds.System.Manager.App.apps[appIndex].data['openFiles'] = ds.System.Manager.App.apps[appIndex].data[
                'openFiles'
            ].filter((p: classicyQuickTimeDocument) => p.url != action.document.url)
            break
        }
    }
    return ds
}

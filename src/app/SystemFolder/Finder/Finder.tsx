import ClassicyApp from '@/app/SystemFolder/SystemResources/App/ClassicyApp'
import { useDesktop, useDesktopDispatch } from '@/app/SystemFolder/ControlPanels/AppManager/ClassicyAppManagerContext'
import ClassicyFileBrowser from '@/app/SystemFolder/SystemResources/File/ClassicyFileBrowser'
import { ClassicyFileSystem } from '@/app/SystemFolder/SystemResources/File/ClassicyFileSystem'
import ClassicyWindow from '@/app/SystemFolder/SystemResources/Window/ClassicyWindow'
import React, { useEffect, useMemo, useState } from 'react'
import { quitAppHelper } from '@/app/SystemFolder/SystemResources/App/ClassicyAppUtils'
import { getClassicyAboutWindow } from '@/app/SystemFolder/SystemResources/AboutWindow/ClassicyAboutWindow'

type PathSettingsProps = {
    _viewType: 'list' | 'icons'
}

const Finder = () => {
    const appName: string = 'Finder'
    const appId: string = 'Finder.app'
    const appIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/system/macos.svg`
    const desktopEventDispatch = useDesktopDispatch()
    const desktop = useDesktop()

    const [pathSettings, setPathSettings] = useState<Record<string, PathSettingsProps>>({})
    const [showAbout, setShowAbout] = useState(false)

    useEffect(() => {
        const appIndex = desktop.System.Manager.App.apps.findIndex((app) => app.id === appId)
        const appData = desktop.System.Manager.App.apps[appIndex].data || {}
        if (!appData?.hasOwnProperty('openPaths')) {
            appData['openPaths'] = []
        }
        desktopEventDispatch({
            type: 'ClassicyAppFinderOpenFolders',
            paths: appData['openPaths'],
        })
    }, [])

    const handlePathSettingsChange = (path: string, settings: PathSettingsProps) => {
        let updatedPathSettings = { ...pathSettings }
        updatedPathSettings[path] = settings
        setPathSettings(updatedPathSettings)
    }

    const openFolder = (path: string) => {
        desktopEventDispatch({
            type: 'ClassicyAppFinderOpenFolder',
            path,
        })

        const appIndex = desktop.System.Manager.App.apps.findIndex((app) => app.id === appId)
        const windowIndex = desktop.System.Manager.App.apps[appIndex].windows.findIndex((w) => w.id === path)
        const ws = desktop.System.Manager.App.apps[appIndex].windows[windowIndex]
        if (ws) {
            ws.closed = false
            desktopEventDispatch({
                type: 'ClassicyWindowOpen',
                app: {
                    id: appId,
                },
                window: ws,
            })
            desktopEventDispatch({
                type: 'ClassicyWindowFocus',
                app: {
                    id: appId,
                },
                window: ws,
            })
        }
    }

    const openFile = (path: string) => {
        const file = fs.resolve(path)
        desktopEventDispatch({
            type: 'ClassicyAppFinderOpenFile',
            debug: true,
            file,
        })
    }

    const closeFolder = (path: string) => {
        desktopEventDispatch({
            type: 'ClassicyAppFinderCloseFolder',
            path,
        })
    }

    const quitApp = () => {
        desktopEventDispatch(quitAppHelper(appId, appName, appIcon))
    }

    const fs = useMemo(() => new ClassicyFileSystem(''), [])

    useEffect(() => {
        const drives = fs.filterByType('', 'drive')

        Object.entries(drives).forEach(([path, metadata]) => {
            desktopEventDispatch({
                type: 'ClassicyDesktopIconAdd',
                app: {
                    id: appId,
                    name: path,
                    icon: metadata['_icon'],
                },
                event: 'ClassicyAppFinderOpenFolder',
                eventData: { path },
                kind: 'drive',
            })
        })

        desktopEventDispatch({
            type: 'ClassicyDesktopIconAdd',
            app: {
                id: 'finder_trash',
                name: 'Trash',
                icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/icons/system/desktop/trash-full.png`,
            },
            kind: 'trash',
            event: 'ClassicyAppFinderEmptyTrash',
            eventData: {},
        })
    }, [fs])

    const getHeaderString = (dir) => {
        return (
            dir['_count'] +
            ' items' +
            (dir['_countHidden'] ? ' (' + dir['_countHidden'] + ' hidden)' : '') +
            ', ' +
            fs.formatSize(dir['_size'])
        )
    }

    const appIndex = desktop.System.Manager.App.apps.findIndex((app) => app.id === appId)
    const { openPaths } = desktop.System.Manager.App.apps[appIndex].data

    return (
        <ClassicyApp
            id={appId}
            name={appName}
            icon={appIcon}
            noDesktopIcon={true}
            defaultWindow={openPaths ? appName + ':' + openPaths.at(0) : 'Macintosh HD'}
        >
            {openPaths?.length > 0 &&
                openPaths
                    .map((op) => {
                        return {
                            op,
                            dir: fs.statDir(op),
                        }
                    })
                    .map(({ op, dir }, idx) => {
                        return (
                            <ClassicyWindow
                                id={op}
                                key={appName + ':' + op}
                                title={dir['_name']}
                                icon={`${dir['_icon']}`}
                                appId={appId}
                                hidden={false}
                                initialSize={[425, 300]}
                                initialPosition={[50 + idx * 50, 50 + idx * 50]}
                                header={<span>{getHeaderString(dir)}</span>}
                                onCloseFunc={closeFolder}
                                appMenu={[
                                    {
                                        id: appId + '_' + op + '_file',
                                        title: 'File',
                                        menuChildren: [
                                            {
                                                id: appId + '_' + op + '_file_closew',
                                                title: 'Close Window',
                                                onClickFunc: () => closeFolder(op),
                                            },
                                            {
                                                id: appId + '_' + op + '_file_closews',
                                                title: 'Close All Windows',
                                                onClickFunc: quitApp,
                                            },
                                        ],
                                    },
                                    {
                                        id: appId + '_view',
                                        title: 'View',
                                        menuChildren: [
                                            {
                                                id: appId + '_' + op + '_view_as_icons',
                                                title: 'View as Icons',
                                                onClickFunc: () => handlePathSettingsChange(op, { _viewType: 'icons' }),
                                            },
                                            {
                                                id: appId + '_' + op + '_view_as_list',
                                                title: 'View as List',
                                                onClickFunc: () => handlePathSettingsChange(op, { _viewType: 'list' }),
                                            },
                                        ],
                                    },
                                    {
                                        id: appId + '_' + op + '_help',
                                        title: 'Help',
                                        menuChildren: [
                                            {
                                                id: appId + '_' + op + '_help_about',
                                                title: 'About',
                                                onClickFunc: () => {
                                                    setShowAbout(true)
                                                },
                                            },
                                        ],
                                    },
                                ]}
                            >
                                <ClassicyFileBrowser
                                    appId={appId}
                                    fs={fs}
                                    path={op}
                                    dirOnClickFunc={openFolder}
                                    fileOnClickFunc={openFile}
                                    display={pathSettings[op]?._viewType || 'list'}
                                />
                            </ClassicyWindow>
                        )
                    })}
            {showAbout && getClassicyAboutWindow({ appId, appName, appIcon, hideFunc: () => setShowAbout(false) })}
        </ClassicyApp>
    )
}

export default Finder

import { useDesktop } from '@/app/SystemFolder/ControlPanels/AppManager/ClassicyAppManagerContext'
import ClassicyApp from '@/app/SystemFolder/SystemResources/App/ClassicyApp'
import { quitMenuItemHelper } from '@/app/SystemFolder/SystemResources/App/ClassicyAppUtils'
import ClassicyButton from '@/app/SystemFolder/SystemResources/Button/ClassicyButton'
import ClassicyControlLabel from '@/app/SystemFolder/SystemResources/ControlLabel/ClassicyControlLabel'
import { QuickTimeVideoEmbed } from '@/app/SystemFolder/SystemResources/QuickTime/QuickTimeMovieEmbed'
import ClassicyWindow from '@/app/SystemFolder/SystemResources/Window/ClassicyWindow'
import React, { useState } from 'react'
import data from './testdata.json' with { type: 'json' }

interface ClassicyTVProps {}

const TV: React.FC<ClassicyTVProps> = ({}) => {
    const appName = 'TV'
    const appId = 'TV.app'
    const appIcon = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/icons/applications/epg/tv.png`
    const desktop = useDesktop()

    const { dateTime, timeZoneOffset } = desktop.System.Manager.DateAndTime

    const [showSettings, setShowSettings] = useState<boolean>(false)

    const appMenu = [
        {
            id: 'file',
            title: 'File',
            menuChildren: [quitMenuItemHelper(appId, appName, appIcon)],
        },
    ]

    return (
        <>
            <ClassicyApp id={appId} name={appName} icon={appIcon} defaultWindow={appId + '_main'}>
                {showSettings && (
                    <ClassicyWindow
                        id={appId + '_settings'}
                        title={appName}
                        appId={appId}
                        closable={false}
                        resizable={false}
                        zoomable={false}
                        scrollable={false}
                        collapsable={false}
                        initialSize={[200, 100]}
                        initialPosition={[100, 100]}
                        minimumSize={[200, 100]}
                        modal={true}
                        hidden={true}
                        appMenu={appMenu}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            <ClassicyControlLabel label={'Nothing Here'}></ClassicyControlLabel>
                            <ClassicyButton onClickFunc={() => setShowSettings(!showSettings)}>Close</ClassicyButton>
                        </div>
                    </ClassicyWindow>
                )}
                <ClassicyWindow
                    id={appId + '_main'}
                    title={appName}
                    appId={appId}
                    closable={true}
                    resizable={true}
                    zoomable={true}
                    scrollable={true}
                    collapsable={true}
                    initialSize={[800, 400]}
                    initialPosition={[100, 50]}
                    minimumSize={[600, 300]}
                    modal={false}
                    appMenu={appMenu}
                >
                    <div style={{ backgroundColor: 'var(--color-system-03)', height: '100%' }}>
                        {/*{data.map((item, index) => (*/}
                        {/*    <QuickTimeVideoEmbed*/}
                        {/*        key={index}*/}
                        {/*        appId={appId}*/}
                        {/*        name={item.title}*/}
                        {/*        url={item.url}*/}
                        {/*        type={'video'}*/}
                        {/*    />*/}
                        {/*))}*/}
                        <QuickTimeVideoEmbed
                            key={1}
                            appId={appId}
                            name={data[1].title}
                            url={data[1].url}
                            type={'video'}
                            options={{ file: {} }}
                            autoPlay={true}
                            hideControls={true}
                        />
                        <div></div>
                    </div>
                </ClassicyWindow>
            </ClassicyApp>
        </>
    )
}

export default TV

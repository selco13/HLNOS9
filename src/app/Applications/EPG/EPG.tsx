import { useDesktop, useDesktopDispatch } from '@/app/SystemFolder/ControlPanels/AppManager/ClassicyAppManagerContext'
import ClassicyApp from '@/app/SystemFolder/SystemResources/App/ClassicyApp'
import { quitAppHelper } from '@/app/SystemFolder/SystemResources/App/ClassicyAppUtils'
import ClassicyButton from '@/app/SystemFolder/SystemResources/Button/ClassicyButton'
import ClassicyWindow from '@/app/SystemFolder/SystemResources/Window/ClassicyWindow'
import classNames from 'classnames'
import React, { ReactElement, useMemo, useState } from 'react'
import epgStyles from './EPG.module.scss'
import data from './testdata.json' with { type: 'json' }

interface ClassicyEPGProps {
    minutesPerGrid?: number // Minutes
    gridTimeWidth?: number // Minutes
    gridWidth?: number // Minutes
    gridStart?: Date
    channelHeaderWidth?: number
}

export type EPGProgram = {
    title: string
    description?: string
    notes?: string
    start: string
    end: string
    icons?: string[]
    selected?: boolean
}

export type EPGChannel = {
    name: string
    title?: string
    number: string
    callsign: string
    location: string
    icon: string
    grid: EPGProgram[]
}

function roundDownToNearestMinuntes(date: Date, roundMinutes: number) {
    const minutes = date.getMinutes()
    date.setMinutes(minutes - (minutes % roundMinutes), 0, 0)
    return date
}

const EPG: React.FC<ClassicyEPGProps> = ({
    minutesPerGrid = 5,
    gridTimeWidth = 30,
    gridWidth = 180,
    gridStart,
    channelHeaderWidth = 5,
}) => {
    const appName = 'EPG'
    const appId = 'EPG.app'
    const appIcon = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/icons/system/folders/directory.png`

    const desktopEventDispatch = useDesktopDispatch()
    const desktop = useDesktop()

    if (!gridStart) {
        const gs = new Date(desktop.System.Manager.DateAndTime.dateTime)
        gs.setHours(gs.getHours() + parseInt(desktop.System.Manager.DateAndTime.timeZoneOffset))
        gridStart = gs
    }

    const [gridStartTime, setGridStartTime] = useState(roundDownToNearestMinuntes(gridStart, gridTimeWidth))

    const quitApp = () => {
        desktopEventDispatch(quitAppHelper(appId, appName, appIcon))
    }

    const testClick = (e) => {
        alert(e.target.id)
    }

    const appMenu = [
        {
            id: 'file',
            title: 'File',
            menuChildren: [
                {
                    id: appId + '_quit',
                    title: 'Quit',
                    onClickFunc: quitApp,
                },
            ],
        },
    ]

    const gridData = data as EPGChannel[]

    const getProgramData = (channel: EPGChannel, channelIndex: number) => {
        return channel.grid.map((gridItem) => {
            const totalGridSlots = gridWidth / minutesPerGrid

            const itemStart = new Date(gridItem.start)
            const itemEnd = new Date(gridItem.end)
            let gridProgramStart = (Date.parse(gridItem.start) - gridStartTime.getTime()) / 60000 / minutesPerGrid
            let gridProgramEnd = (Date.parse(gridItem.end) - Date.parse(gridItem.start)) / 60000 / minutesPerGrid

            const gridEndTime = new Date(gridStartTime)
            gridEndTime.setMinutes(gridEndTime.getMinutes() + gridWidth)

            if (gridProgramStart < 0) {
                gridProgramEnd = gridProgramStart + gridProgramEnd
                gridProgramStart = 0
            }

            if (gridProgramEnd > gridWidth / minutesPerGrid) {
                gridProgramEnd = totalGridSlots
            }

            if (
                gridProgramEnd <= 0 ||
                itemStart > gridEndTime ||
                itemEnd < gridStartTime ||
                gridProgramStart + 2 > totalGridSlots
            ) {
                return
            }

            const currentTime = new Date(desktop.System.Manager.DateAndTime.dateTime)
            currentTime.setHours(currentTime.getHours() + parseInt(desktop.System.Manager.DateAndTime.timeZoneOffset))
            const highlight = itemStart <= currentTime && itemEnd >= currentTime

            return (
                <div
                    key={channel.name + gridItem.start + gridItem.end}
                    className={classNames(epgStyles.epgEntry, highlight ? epgStyles.selected : undefined)}
                    style={{
                        gridRowStart: channelIndex + 2,
                        gridColumn: gridProgramStart + 2 + '/ span ' + gridProgramEnd,
                    }}
                >
                    <div className={epgStyles.epgEntryTitle}>
                        {gridItem.title}
                        <div className={epgStyles.epgEntryDescription}>{gridItem.description}</div>
                    </div>
                    <div className={epgStyles.epgEntryIcons}>
                        {gridItem.icons?.map((icon) => {
                            return (
                                <img
                                    key={channel.name + Date.parse(gridItem.start) + Date.parse(gridItem.end) + icon}
                                    className={epgStyles.epgEntryIcon}
                                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/icons/applications/epg/${icon}`}
                                    alt={icon}
                                />
                            )
                        })}
                    </div>
                </div>
            )
        })
    }

    const epgHeader = useMemo(() => {
        let headers: ReactElement[] = [
            <div
                key={'column_header_date'}
                className={epgStyles.epgHeaderTime}
                style={{
                    gridColumn: `1 / span 1`,
                }}
            >
                {gridStartTime.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}
            </div>,
        ]

        for (let i = 1; i <= gridWidth / minutesPerGrid; i += gridTimeWidth / minutesPerGrid) {
            const d = new Date(gridStartTime.getTime() + (i - 1) * minutesPerGrid * 60000)
            headers.push(
                <div
                    key={d.toLocaleTimeString()}
                    className={epgStyles.epgHeaderTime}
                    onDoubleClick={testClick}
                    style={{
                        gridColumn: `${i + 1} / span ${minutesPerGrid + 1}`,
                    }}
                >
                    <div className={epgStyles.epgHeaderTimeInner}>
                        {d.toLocaleTimeString([], {
                            hour: 'numeric',
                            minute: '2-digit',
                        })}
                    </div>
                </div>
            )
        }
        return headers
    }, [gridStartTime, gridWidth, minutesPerGrid, gridTimeWidth])

    const epgData = useMemo(() => {
        return gridData.map((channel, channelIndex) => {
            return (
                <>
                    <div
                        key={channel.name + channelIndex}
                        className={epgStyles.epgChannel}
                        style={{ gridRowStart: channelIndex + 2, gridColumnStart: 1, gridColumnEnd: 2 }}
                    >
                        <img
                            className={epgStyles.epgChannelIcon}
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/icons/applications/epg/channels/${channel.icon}`}
                            alt={channel.number + ' ' + channel.callsign + ' - ' + channel.location}
                        />
                        {channel.name}
                    </div>
                    {getProgramData(channel, channelIndex)}
                </>
            )
        })
    }, [gridData, getProgramData])

    const jumpBack = () => {
        setGridStartTime(new Date(gridStartTime.getTime() - 30 * 60 * 1000))
    }

    const jumpForward = () => {
        setGridStartTime(new Date(gridStartTime.getTime() + 30 * 60 * 1000))
    }

    const jumpToNow = () => {
        const currentTime = new Date(desktop.System.Manager.DateAndTime.dateTime)
        currentTime.setHours(currentTime.getHours() + parseInt(desktop.System.Manager.DateAndTime.timeZoneOffset))
        setGridStartTime(roundDownToNearestMinuntes(currentTime, gridTimeWidth))
    }
    const currentTime = new Date(desktop.System.Manager.DateAndTime.dateTime)
    currentTime.setHours(currentTime.getHours() + parseInt(desktop.System.Manager.DateAndTime.timeZoneOffset))

    return (
        <>
            <ClassicyApp id={appId} name={appName} icon={appIcon} defaultWindow={'demo'}>
                <ClassicyWindow
                    id={'demo2'}
                    title={appName}
                    appId={appId}
                    closable={true}
                    resizable={true}
                    zoomable={true}
                    scrollable={true}
                    collapsable={true}
                    initialSize={[800, 400]}
                    initialPosition={[300, 50]}
                    minimumSize={[600, 300]}
                    modal={false}
                    appMenu={appMenu}
                >
                    <div className={epgStyles.epgHolder}>
                        <div
                            className={epgStyles.epgGridSetup}
                            style={{
                                gridTemplateColumns: `${channelHeaderWidth}fr repeat(${gridWidth / minutesPerGrid}, 1fr)`,
                                backgroundColor: 'var(--color-white)',
                                position: 'relative',
                            }}
                        >
                            <>
                                {gridStartTime < currentTime && (
                                    <div
                                        style={{
                                            gridColumnStart: Math.floor(
                                                2 +
                                                    (currentTime.getTime() - gridStartTime.getTime()) /
                                                        1000 /
                                                        60 /
                                                        minutesPerGrid
                                            ),
                                            gridColumnEnd: Math.floor(
                                                3 +
                                                    (currentTime.getTime() - gridStartTime.getTime()) /
                                                        1000 /
                                                        60 /
                                                        minutesPerGrid
                                            ),
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            color: 'red',
                                        }}
                                    >
                                        |
                                    </div>
                                )}
                                {epgHeader}
                            </>
                        </div>
                        <div
                            className={classNames([
                                epgStyles.epgGridSetup,
                                epgStyles.epgGridSetupBorder,
                                epgStyles.epgGridAnimatedBackground,
                            ])}
                            style={{
                                gridTemplateColumns: `${channelHeaderWidth}fr repeat(${gridWidth / minutesPerGrid}, 1fr)`,
                                backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/img/ui/stripe.svg)`,
                            }}
                        >
                            {epgData}
                        </div>
                        <div>
                            <ClassicyButton onClickFunc={jumpBack}>&lt;&lt;</ClassicyButton>
                            <ClassicyButton onClickFunc={jumpForward}>&gt;&gt;</ClassicyButton>
                            <ClassicyButton onClickFunc={jumpToNow}>Now</ClassicyButton>
                        </div>
                    </div>
                </ClassicyWindow>
            </ClassicyApp>
        </>
    )
}

export default EPG

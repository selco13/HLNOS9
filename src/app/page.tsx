'use client'

import Browser from '@/app/Applications/Browser/Browser'
import Demo from '@/app/Applications/Demo/Demo'
import SimpleText from '@/app/Applications/SimpleText/SimpleText'
import ControlPanels from '@/app/SystemFolder/ControlPanels/ControlPanels'
import { ClassicyDesktopProvider } from '@/app/SystemFolder/SystemResources/AppManager/ClassicyAppManagerContext'
import ClassicyDesktop from '@/app/SystemFolder/SystemResources/Desktop/ClassicyDesktop'
import React from 'react'

export default function Home() {
    return (
        <ClassicyDesktopProvider>
            <ClassicyDesktop>
                <ControlPanels />
                <Demo />
                <Browser />
                <SimpleText />
            </ClassicyDesktop>
        </ClassicyDesktopProvider>
    )
}

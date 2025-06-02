'use client'

import Browser from '@/app/Applications/Browser/Browser'
import Demo from '@/app/Applications/Demo/Demo'
import SimpleText from '@/app/Applications/SimpleText/SimpleText'
import { ClassicyDesktopProvider } from '@/app/SystemFolder/ControlPanels/AppManager/ClassicyAppManagerContext'
import ClassicyDesktop from '@/app/SystemFolder/SystemResources/Desktop/ClassicyDesktop'
import React from 'react'
import QuickTimeMoviePlayer from '@/app/Applications/QuickTime/QuickTimeMoviePlayer'
import EPG from '@/app/Applications/EPG/EPG'

export default function Home() {
    return (
        <ClassicyDesktopProvider>
            <ClassicyDesktop>
                <Demo />
                <QuickTimeMoviePlayer />
                <EPG />
                <Browser />
                <SimpleText />
            </ClassicyDesktop>
        </ClassicyDesktopProvider>
    )
}

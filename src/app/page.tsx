'use client'

import Browser from '@/app/Applications/Browser/Browser'
import Demo from '@/app/Applications/Demo/Demo'
import EPG from '@/app/Applications/EPG/EPG'
import News from '@/app/Applications/News/News'
import QuickTimeMoviePlayer from '@/app/Applications/QuickTime/QuickTimeMoviePlayer'
import SimpleText from '@/app/Applications/SimpleText/SimpleText'
import { ClassicyDesktopProvider } from '@/app/SystemFolder/ControlPanels/AppManager/ClassicyAppManagerContext'
import ClassicyDesktop from '@/app/SystemFolder/SystemResources/Desktop/ClassicyDesktop'
import React from 'react'

export default function Home() {
    return (
        <ClassicyDesktopProvider>
            <ClassicyDesktop>
                <Browser />
                <Demo />
                <News />
                <EPG />
                <QuickTimeMoviePlayer />
                <SimpleText />
            </ClassicyDesktop>
        </ClassicyDesktopProvider>
    )
}

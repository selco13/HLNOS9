'use client'

import React from 'react'

import { ClassicyAppearanceManager } from '@/app/SystemFolder/ControlPanels/AppearanceManager/ClassicyAppearanceManager'
import { ClassicySoundManager } from '@/app/SystemFolder/ControlPanels/SoundManager/ClassicySoundManager'
import { ClassicyDateAndTimeManagerApp } from '@/app/SystemFolder/ControlPanels/DateAndTimeManager/ClassicyDateAndTimeManager.app'

export default function ClassicyControlPanels() {
    return (
        <>
            <ClassicyAppearanceManager />
            <ClassicySoundManager />
            <ClassicyDateAndTimeManagerApp />
        </>
    )
}

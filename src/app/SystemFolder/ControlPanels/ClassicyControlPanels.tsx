'use client'

import { ClassicyAppearanceManager } from '@/app/SystemFolder/ControlPanels/AppearanceManager/ClassicyAppearanceManager'
import { ClassicySoundManager } from '@/app/SystemFolder/ControlPanels/SoundManager/ClassicySoundManager'
import React from 'react'
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

'use client';

import Browser from "@/app/Applications/Browser/Browser";
import Demo from "@/app/Applications/Demo/Demo";
import SimpleText from "@/app/Applications/SimpleText/SimpleText";

import {AppearanceManager} from "@/app/SystemFolder/ControlPanels/AppearanceManager/AppearanceManager";
import {SoundManager} from "@/app/SystemFolder/ControlPanels/SoundManager/SoundManager";
import {ClassicyDesktopProvider} from "@/app/SystemFolder/SystemResources/AppManager/ClassicyAppManagerContext";
import ClassicyDesktop from "@/app/SystemFolder/SystemResources/Desktop/ClassicyDesktop";
import React from "react";

export default function Home() {
    return (
        <ClassicyDesktopProvider>
            <ClassicyDesktop>
                <AppearanceManager/>
                <SoundManager/>
                <Demo/>
                <Browser/>
                <SimpleText/>
            </ClassicyDesktop>
        </ClassicyDesktopProvider>
    );
};

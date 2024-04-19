"use client";

import soundManagerStyles from "@/app/SystemFolder/ControlPanels/SoundManager/SoundManager.module.scss";
import {ClassicyAboutWindow} from "@/app/SystemFolder/SystemResources/AboutWindow/ClassicyAboutWindow";
import ClassicyApp from "@/app/SystemFolder/SystemResources/App/ClassicyApp";
import {useDesktopDispatch} from "@/app/SystemFolder/SystemResources/AppManager/ClassicyAppManagerContext";
import ClassicyCheckbox from "@/app/SystemFolder/SystemResources/Checkbox/ClassicyCheckbox";
import ClassicyControlGroup from "@/app/SystemFolder/SystemResources/ControlGroup/ClassicyControlGroup";
import ClassicyControlLabel from "@/app/SystemFolder/SystemResources/ControlLabel/ClassicyControlLabel";
import ClassicyDisclosure from "@/app/SystemFolder/SystemResources/Disclosure/ClassicyDisclosure";
import {
    PlatinumSoundInfo,
    useSound,
    useSoundDispatch,
} from "@/app/SystemFolder/SystemResources/SoundManager/PlatinumSoundManagerContext";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import React from "react";

export const SoundManager: React.FC = () => {
    const desktopEventDispatch = useDesktopDispatch();

    const playerState = useSound();
    const player = useSoundDispatch();

    const appName: string = "Sound Manager";
    const appId: string = "SoundManager.app";
    const appIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/control-panels/sound-manager/app.png`;

    const [showAbout, setShowAbout] = React.useState(false);

    const [enableAllSounds, setEnableAllSounds] = React.useState(false);

    const changeSounds = (e) => {
        setEnableAllSounds(!!e.target.checked);
        player({
            type: "PlatinumSoundDisable",
            disabled: enableAllSounds ? [] : ["*"],
        });
    };


    const quitApp = () => {
        desktopEventDispatch({
            type: "PlatinumAppClose",
            app: {
                id: appId,
                title: appName,
                icon: appIcon,
            },
        });
    };

    const appMenu = [
        {
            id: appId + "_file",
            title: "File",
            menuChildren: [
                {
                    id: appId + "_quit",
                    title: "Quit",
                    onClickFunc: quitApp,
                },
            ],
        },
        {
            id: appId + "_help",
            title: "Help",
            menuChildren: [
                {
                    id: appId + "_about",
                    title: "About",
                    onClickFunc: () => {
                        setShowAbout(true);
                    },
                },
            ],
        },
    ];

    const getSoundLabelGroups = () => {
        const soundLabelGroups = [
            ...new Set(playerState.labels.map((item) => item.group)),
        ];

        var index = soundLabelGroups.indexOf("Alert");
        if (index !== -1) {
            soundLabelGroups.splice(index, 1);
        }
        return soundLabelGroups;
    };

    return (
        <ClassicyApp
            id={appId}
            name={appName}
            icon={appIcon}
            defaultWindow={"SoundManager_1"}
            openOnBoot={true}
        >
            <PlatinumWindow
                id={"SoundManager_1"}
                title={appName}
                appId={appId}
                icon={appIcon}
                closable={true}
                resizable={false}
                zoomable={false}
                scrollable={false}
                collapsable={false}
                initialSize={[500, 0]}
                initialPosition={[300, 50]}
                modalWindow={true}
                appMenu={appMenu}
            >
                <ClassicyCheckbox
                    id={"disable_sounds"}
                    name={"disable_sounds"}
                    isDefault={true}
                    label={"Enable Interface Sounds"}
                    onClick={changeSounds}
                    checked={!playerState.disabled.includes("*")}
                />
                <ClassicyDisclosure label={"Disable Sounds"}>
                    <ClassicyControlLabel label={"These settings are not currently connected."}/>
                    <div className={soundManagerStyles.soundManagerControlGroupHolder}>
                        {getSoundLabelGroups().map((group: string) => (
                            <ClassicyControlGroup label={group} columns={true} key={group}>
                                {playerState.labels.map((item: PlatinumSoundInfo) => (
                                    <>
                                        {item.group === group && (
                                            <ClassicyCheckbox
                                                id={"enable_sound_" + item.id}
                                                name={"enable_sound_" + item.id}
                                                label={item.label}
                                                checked={playerState.disabled.includes("*")}
                                            />
                                        )}
                                    </>
                                ))}
                            </ClassicyControlGroup>
                        ))}
                    </div>
                </ClassicyDisclosure>
            </PlatinumWindow>
            {showAbout && (
                <ClassicyAboutWindow appId={appId}
                                     appName={appName}
                                     appIcon={appIcon}
                                     hideFunc={() => {
                                         setShowAbout(false)
                                     }}
                />

            )}
        </ClassicyApp>
    );
};

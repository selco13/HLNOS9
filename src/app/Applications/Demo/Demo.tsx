import ClassicyApp from "@/app/SystemFolder/SystemResources/App/ClassicyApp";
import {useDesktopDispatch} from "@/app/SystemFolder/SystemResources/AppManager/ClassicyAppManagerContext";
import ClassicyButton from "@/app/SystemFolder/SystemResources/Button/ClassicyButton";
import ClassicyCheckbox from "@/app/SystemFolder/SystemResources/Checkbox/ClassicyCheckbox";
import ClassicyControlGroup from "@/app/SystemFolder/SystemResources/ControlGroup/ClassicyControlGroup";
import ClassicyDisclosure from "@/app/SystemFolder/SystemResources/Disclosure/ClassicyDisclosure";
import PlatinumInput from "@/app/SystemFolder/SystemResources/Input/PlatinumInput";
import PlatinumPopUpMenu from "@/app/SystemFolder/SystemResources/PopUpMenu/PlatinumPopUpMenu";
import PlatinumProgressBar from "@/app/SystemFolder/SystemResources/ProgressBar/PlatinumProgressBar";
import PlatinumRadioInput from "@/app/SystemFolder/SystemResources/RadioInput/PlatinumRadioInput";
import PlatinumWindow from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow";
import React from "react";

const Demo: React.FC = () => {
    const appName = "Demo";
    const appId = "Demo.app";
    const appIcon = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/system/folders/directory.png`;

    const desktopEventDispatch = useDesktopDispatch();
    const [appContext] = React.useState({});

    const quitApp = () => {
        desktopEventDispatch({
            type: "PlatinumAppClose",
            app: {
                id: appId,
                title: appName,
                icon: appIcon
            }

        });
    };

    const appMenu = [
        {
            id: "file",
            title: "File",
            menuChildren: [
                {
                    id: appId + "_quit",
                    title: "Quit",
                    onClickFunc: quitApp
                }
            ]
        },
    ];

    return (
        <>
            <ClassicyApp
                id={appId}
                name={appName}
                icon={appIcon}
                defaultWindow={"demo"}
                appContext={appContext}
            >
                <PlatinumWindow
                    id={"demo2"}
                    title={appName}
                    appId={appId}
                    closable={false}
                    resizable={false}
                    zoomable={false}
                    scrollable={false}
                    collapsable={false}
                    initialSize={[400, 500]}
                    initialPosition={[300, 50]}
                    modalWindow={true}
                    appMenu={appMenu}
                >
                    <PlatinumPopUpMenu
                        id={"select_theme"}
                        small={false}
                        options={[{value: "hello", label: "Hello"}, {value: "hello2", label: "Hello again!"}]}
                        selected={"hello"}
                    />
                    <PlatinumProgressBar value={59}></PlatinumProgressBar>
                    <PlatinumInput id={"test"} labelTitle={"Text Input"}></PlatinumInput>
                    <ClassicyControlGroup label={"Test Radio Inputs"}>
                        <PlatinumRadioInput id={"test1"} name={"test_radio"} isDefault={false}
                                            label={"Radio Button 1"}/>
                        <PlatinumRadioInput id={"test2"} name={"test_radio"} isDefault={false}
                                            label={"Radio Button 2"}/>
                        <PlatinumRadioInput id={"test3"} checked={true} name={"test_radio"} isDefault={false}
                                            label={"Radio Button Disabled"} disabled={true}/>
                    </ClassicyControlGroup>
                    <ClassicyControlGroup label={"Test Checkboxes"}>
                        <ClassicyCheckbox id={"test4"} name={"test_check"} isDefault={true}
                                          label={"Default Checkbox"}
                                          disabled={false}/>
                        <ClassicyCheckbox id={"test5"} name={"test_check"} isDefault={false}
                                          label={"Checkbox 2"}
                                          disabled={false}/>
                        <ClassicyCheckbox id={"test6"} name={"test_check"} isDefault={false} label={"Disabled"}
                                          disabled={true}/>
                    </ClassicyControlGroup>
                    <ClassicyDisclosure label={"Expandable Section"}>
                        <p style={{fontFamily: "var(--header-font)"}}>HELLO!</p>
                    </ClassicyDisclosure>
                    <ClassicyButton isDefault={true}>Do Nothing</ClassicyButton>
                    <ClassicyButton isDefault={false} onClick={quitApp}>Quit</ClassicyButton>
                    <ClassicyButton isDefault={false} disabled={true}>Disabled</ClassicyButton>

                </PlatinumWindow>
            </ClassicyApp>
        </>
    );
}

export default Demo;

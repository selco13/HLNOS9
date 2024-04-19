import {useDesktop, useDesktopDispatch} from '@/app/SystemFolder/SystemResources/AppManager/ClassicyAppManagerContext';

import platinumDesktopIconStyles from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopIcon.module.scss";
import classNames from "classnames";
import React from "react";

interface PlatinumDesktopIconProps {
    appId: string;
    appName: string;
    icon: string;
    label?: string;
    kind?: "app_shortcut";
    onClickFunc?: any;
}

const PlatinumDesktopIcon: React.FC<PlatinumDesktopIconProps> = ({
                                                                     appId,
                                                                     appName,
                                                                     icon,
                                                                     label,
                                                                     kind = "app_shortcut",
                                                                     onClickFunc,
                                                                 }) => {

    const [clickPosition, setClickPosition] = React.useState<[number, number]>([0, 0]);
    const [dragging, setDragging] = React.useState<boolean>(false);

    const desktopContext = useDesktop();
    const desktopEventDispatch = useDesktopDispatch();

    const iconRef = React.useRef(null);

    const id = appId + ".shortcut";

    const clickFocus = () => {
        desktopEventDispatch({
            type: "PlatinumDesktopIconFocus",
            iconId: id,
        })
    }

    const changeIcon = (e) => {
        if (dragging) {
            clickFocus();

            desktopEventDispatch({
                type: "PlatinumDesktopIconMove",
                app: {
                    id: appId
                },
                location: [e.clientX - clickPosition[0], e.clientY - clickPosition[1]]
            });
        }
    };

    const isActive = (id) => {
        const idx = desktopContext.selectedDesktopIcons.findIndex(o => o === id);
        return idx > -1;
    }

    const launchIcon = () => {
        if (onClickFunc) {
            onClickFunc();
        }
        desktopEventDispatch({
            type: "PlatinumDesktopIconOpen",
            iconId: id,
            app: {
                id: appId,
                name: appName,
                icon: icon
            },
        })
    };

    const getIconLocation = () => {
        let iconIdx = desktopContext.desktopIcons.findIndex(
            (i) => i.appId === appId,
        );

        let leftValue: number = 0;
        let topValue: number = 0;
        if (iconIdx > -1) {
            leftValue = desktopContext.desktopIcons[iconIdx].location[0]
            topValue = desktopContext.desktopIcons[iconIdx].location[1]
        }
        return [topValue, leftValue]
    }

    let thisLocation = getIconLocation();

    const isLaunched = () => {
        const idx = desktopContext.openApps.findIndex(o => o.id === appId);
        return idx > -1;
    };

    const stopChangeIcon = () => {
        setDragging(false);
        setClickPosition([0, 0]);
    };

    const startDrag = (e) => {
        setClickPosition([
            e.clientX - iconRef.current.getBoundingClientRect().left,
            e.clientY - iconRef.current.getBoundingClientRect().top
        ]);
        setDragging(true);
    };


    const getClass = (id) => {
        if (isActive(id) && isLaunched()) {
            return platinumDesktopIconStyles.platinumDesktopIconActiveAndOpen
        } else if (isActive(id)) {
            return platinumDesktopIconStyles.platinumDesktopIconActive
        } else if (isLaunched()) {
            return platinumDesktopIconStyles.platinumDesktopIconOpen
        } else {
            return "";
        }
    }

    return (
        <div ref={iconRef} id={`${id}`}
             onMouseDown={startDrag}
             onMouseMove={changeIcon}
             onMouseUp={stopChangeIcon}
             onDoubleClick={launchIcon}
             draggable={false}
             onClick={clickFocus}
             className={classNames(
                 platinumDesktopIconStyles.platinumDesktopIcon,
                 dragging ? platinumDesktopIconStyles.platinumDesktopIconDragging : "",
                 getClass(id)
             )}
             style={{top: thisLocation[0], left: thisLocation[1]}}
        >
            <div className={platinumDesktopIconStyles.platinumDesktopIconMaskOuter}
                 style={{maskImage: `url(${icon})`}}>
                <div
                    className={platinumDesktopIconStyles.platinumDesktopIconMask}
                    style={{mask: `url(${icon})`}}>
                    <img src={icon} alt={appName}/>
                </div>
            </div>
            <p>{label ? label : appName}</p>
        </div>
    );
};

export default PlatinumDesktopIcon;

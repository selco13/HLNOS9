import {getAllThemes, getThemeVars} from "@/app/SystemFolder/Appearance/PlatinumAppearance"
import Finder from "@/app/SystemFolder/Finder/Finder";
import {useDesktop, useDesktopDispatch} from "@/app/SystemFolder/SystemResources/AppManager/ClassicyAppManagerContext";
import ClassicyContextualMenu from "@/app/SystemFolder/SystemResources/ContextualMenu/ClassicyContextualMenu";
import PlatinumDesktopMenuBar from "@/app/SystemFolder/SystemResources/Desktop/MenuBar/PlatinumDesktopMenuBar";
import platinumDesktop from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktop.module.scss";
import PlatinumDesktopIcon from "@/app/SystemFolder/SystemResources/Desktop/PlatinumDesktopIcon";
import {PlatinumMenuItem} from "@/app/SystemFolder/SystemResources/Menu/PlatinumMenu";
import classNames from "classnames";
import React, {Suspense} from "react";
import "@/app/SystemFolder/Appearance/styles/fonts.scss";

interface PlatinumDesktopProps {
    children?: any;
}

const PlatinumDesktop: React.FC<PlatinumDesktopProps> = ({children}) => {

        const [contextMenu, setContextMenu] = React.useState(false);
        const [contextMenuLocation, setContextMenuLocation] = React.useState([0, 0]);

        const [selectBoxStart, setSelectBoxStart] = React.useState([0, 0]);
        const [selectBoxSize, setSelectBoxSize] = React.useState([0, 0]);
        const [selectBox, setSelectBox] = React.useState(false);

        const clickOffset = [10, 10];

        const desktopState = useDesktop();
        const desktopEventDispatch = useDesktopDispatch();

        if (desktopState.availableThemes.length <= 0) {
            desktopEventDispatch({
                type: "PlatinumDesktopLoadThemes",
                availableThemes: getAllThemes(),
            });
        }


        const startSelectBox = (e) => {
            if (e.target.id === "platinumDesktop") {
                if (e.button > 1) {
                    toggleDesktopContextMenu(e);
                } else {
                    clearActives(e);
                    setSelectBox(true);
                    setSelectBoxStart([e.clientX, e.clientY]);
                    setSelectBoxSize([0, 0]);
                }
            }
        }

        const resizeSelectBox = (e) => {
            setSelectBoxSize([e.clientX - selectBoxStart[0], e.clientY - selectBoxStart[1]]);
        }

        const clearSelectBox = () => {
            setSelectBoxSize([0, 0]);
            setSelectBoxStart([0, 0]);
            setSelectBox(false);
        }

        const clearActives = (e) => {
            setContextMenu(false);
            desktopEventDispatch({
                type: "PlatinumDesktopFocus",
                e: e,
                menuBar: defaultMenuItems,
            });
        }

        const toggleDesktopContextMenu = (e) => {
            e.preventDefault();
            if (e.target.id === "platinumDesktop") {
                setContextMenuLocation([e.clientX - clickOffset[0], e.clientY - clickOffset[1]]);
                setContextMenu(!contextMenu);
            }
        }

        const defaultMenuItems: PlatinumMenuItem[] = [
            {
                id: "finder_file",
                title: "File",
            },
            {
                id: "finder_edit",
                title: "Edit"
            },
            {
                id: "finder_view",
                title: "View",
                menuChildren: [
                    {
                        id: "finder.app_CleanupDesktopIcons",
                        title: "Clean up",
                        onClickFunc: () => {
                            desktopEventDispatch({
                                type: "PlatinumDesktopIconCleanup"
                            });
                        }
                    },
                    {
                        id: "finder.app_ArrangeDesktopIcons",
                        title: "Arrange...",
                        menuChildren: [
                            {
                                id: "finder.app_arrange_by_name",
                                title: "by Name"
                            },
                            {
                                id: "finder.app_arrange_by_kind",
                                title: "by Kind"
                            },
                            {
                                id: "finder.app_arrange_by_label",
                                title: "by Label"
                            },
                        ]
                    },
                ]
            },
            {
                id: "finder_special",
                title: "Special"
            },

            {
                id: "finder_help",
                title: "Help"
            },
        ];

        const currentTheme = getThemeVars(desktopState.activeTheme);

        React.useEffect(() => {
            desktopEventDispatch({
                type: "PlatinumDesktopFocus",
                menuBar: defaultMenuItems,
            });
        }, []);

        return (
            <>
                <Suspense>
                    <div id={"platinumDesktop"}
                         style={currentTheme as React.CSSProperties}
                         className={classNames(platinumDesktop.platinumDesktop)}
                         onMouseMove={resizeSelectBox}
                         onContextMenu={toggleDesktopContextMenu}
                         onClick={clearSelectBox}
                         onMouseDown={startSelectBox}>
                        {selectBox &&
                            <div className={platinumDesktop.platinumDesktopSelect}
                                 style={{
                                     left: selectBoxStart[0],
                                     top: selectBoxStart[1],
                                     width: selectBoxSize[0],
                                     height: selectBoxSize[1]
                                 }}/>
                        }
                        <PlatinumDesktopMenuBar/>
                        {contextMenu && (
                            <ClassicyContextualMenu menuItems={defaultMenuItems}
                                                    position={contextMenuLocation}/>
                        )}
                        <Finder/>
                        {desktopState.desktopIcons.map(i => (
                            <PlatinumDesktopIcon
                                appId={i.appId}
                                appName={i.appName}
                                icon={i.icon}
                                label={i.label}
                                kind={i.kind}
                                key={i.appId}
                                onClickFunc={i.onClickFunc}
                            />
                        ))}
                        {children}
                    </div>
                </Suspense>
            </>
        );
    }
;

export default PlatinumDesktop;

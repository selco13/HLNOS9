"use client";

import {useDesktop, useDesktopDispatch} from '@/app/SystemFolder/SystemResources/AppManager/ClassicyAppManagerContext';
import ClassicyContextualMenu from "@/app/SystemFolder/SystemResources/ContextualMenu/ClassicyContextualMenu";
import {ClassicyMenuItem} from "@/app/SystemFolder/SystemResources/Menu/ClassicyMenu";
import {useSoundDispatch} from "@/app/SystemFolder/SystemResources/SoundManager/ClassicySoundManagerContext";
import classicyWindowStyle from "@/app/SystemFolder/SystemResources/Window/ClassicyWindow.module.scss";
import {
    ClassicyWindowState,
    ClassicyWindowStateEventReducer
} from "@/app/SystemFolder/SystemResources/Window/ClassicyWindowContext";
import classNames from "classnames";
import React from "react";

interface ClassicyWindowProps {
    title?: string;
    id: string;
    appId?: string;
    icon?: string;
    hidden?: boolean;
    closable?: boolean;
    zoomable?: boolean;
    collapsable?: boolean;
    resizable?: boolean;
    scrollable?: boolean;
    modalWindow?: boolean;
    initialSize?: [number, number];
    initialPosition?: [number, number];
    minimumSize?: [number, number];
    grow?: boolean;
    header?: React.ReactNode;
    appMenu?: ClassicyMenuItem[];
    contextMenu?: ClassicyMenuItem[];
    onCloseFunc?: any;
    children?: React.ReactNode;
}

const ClassicyWindow: React.FC<ClassicyWindowProps> = ({
                                                           id,
                                                           title = "",
                                                           icon = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/system/files/file.png`,
                                                           appId,
                                                           hidden = false,
                                                           closable = true,
                                                           zoomable = true,
                                                           collapsable = true,
                                                           resizable = true,
                                                           scrollable = true,
                                                           modalWindow = false,
                                                           initialSize = [350, 0],
                                                           initialPosition = [0, 0],
                                                           minimumSize = [250, 0],
                                                           grow,
                                                           header,
                                                           appMenu,
                                                           contextMenu,
                                                           onCloseFunc,
                                                           children,
                                                       }) => {

    const [size, setSize] = React.useState<[number, number]>(initialSize);
    const [clickPosition, setClickPosition] = React.useState<[number, number]>([
        0, 0,
    ]);

    let initialWindowState: ClassicyWindowState = {
        size: initialSize,
        position: initialPosition,
        closed: hidden,
        menuBar: appMenu ? appMenu : [],
        contextMenuShown: false
    };

    const clickOffset = [10, 10];

    const [windowState, windowEventDispatch] = React.useReducer(
        ClassicyWindowStateEventReducer,
        initialWindowState
    );

    const windowRef = React.useRef(null);
    const desktopContext = useDesktop();
    const desktopEventDispatch = useDesktopDispatch();

    let player = useSoundDispatch();

    if (player === null) {
        player = ((_) => {
        });
    }

    const startResizeWindow = () => {
        windowEventDispatch({
            type: "PlatinumWindowPosition",
            position: [windowRef.current.getBoundingClientRect().left, windowRef.current.getBoundingClientRect().top]
        })
        setResize(true);
        setZoom(false);
        setSize([windowRef.current.clientWidth, windowRef.current.clientHeight]);
    };

    const startMoveWindow = (e) => {
        e.preventDefault();
        player({type: "PlatinumSoundPlay", sound: "PlatinumWindowMoveIdle"})
        setDragging(true);
        setClickPosition([
            e.clientX - windowRef.current.getBoundingClientRect().left,
            e.clientY - windowRef.current.getBoundingClientRect().top,
        ]);
    };

    const changeWindow = (e) => {
        e.preventDefault();
        if (windowState.resizing || windowState.dragging) {
            setActive();
        }

        if (windowState.resizing) {
            setSize([
                Math.abs(windowState.position[0] - e.clientX - 4),
                Math.abs(windowState.position[1] - e.clientY - 4),
            ]);
        }

        if (windowState.dragging) {
            player({type: "PlatinumSoundPlay", sound: "PlatinumWindowMoveMoving"})
            setMoving(true, [
                e.clientX - clickPosition[0],
                e.clientY - clickPosition[1],
            ]);
        }
    };

    const stopChangeWindow = (e) => {
        e.preventDefault();
        if (windowState.resizing || windowState.dragging || windowState.moving) {
            player({type: "PlatinumSoundPlayInterrupt", sound: "PlatinumWindowMoveStop"});
        }
        setResize(false);
        setDragging(false);
        setMoving(false);
        setClickPosition([0, 0]);
    };

    const setDragging = (toDrag: boolean) => {
        windowEventDispatch({
            type: "PlatinumWindowDrag",
            dragging: toDrag,
        });
    };

    const setMoving = (
        toMove: boolean,
        toPosition: [number, number] = [0, 0]
    ) => {
        windowEventDispatch({
            type: "PlatinumWindowMove",
            moving: toMove,
            position: toPosition,
        });
    };

    const isActive = () => {
        if (desktopContext && 'activeWindow' in desktopContext)
            return id === desktopContext.activeWindow;
        return true
    };

    const setActive = () => {
        if (!isActive()) {
            player({type: "PlatinumSoundPlay", sound: "PlatinumWindowFocus"})

            desktopEventDispatch({
                type: "PlatinumWindowFocus",
                app: {
                    id: appId,
                    window: id,
                    appMenu: appMenu
                }
            });
            desktopEventDispatch({
                type: "PlatinumWindowContextMenu",
                contextMenu: contextMenu ? contextMenu : [],
            });
        }
    };

    React.useEffect(() => {
        setActive()
    }, []);

    const toggleCollapse = () => {
        if (collapsable) {
            setCollapse(!windowState.collapsed);
        }
    };

    const setCollapse = (toCollapse: boolean) => {
        if (toCollapse) {
            player({type: "PlatinumSoundPlay", sound: "PlatinumWindowCollapse"})
            windowEventDispatch({
                type: "PlatinumWindowCollapse",
            });
        } else {
            player({type: "PlatinumSoundPlay", sound: "PlatinumWindowExpand"})
            windowEventDispatch({
                type: "PlatinumWindowExpand",
            });
        }
    };

    const toggleZoom = () => {
        if (zoomable) {
            setZoom(!windowState.zoomed);
        }
    };

    const setZoom = (toZoom: boolean) => {
        if (windowState.collapsed) {
            setCollapse(false);
        }
        player({type: "PlatinumSoundPlay", sound: "PlatinumWindowZoom"})
        windowEventDispatch({
            type: "PlatinumWindowZoom",
            zoomed: toZoom,
        });
    };

    const setContextMenu = (toShow: boolean, atPosition: [number, number]) => {
        windowEventDispatch({
            type: "PlatinumWindowContextMenu",
            contextMenu: toShow,
            position: atPosition,
        });
    };

    const hideContextMenu = (e) => {
        e.preventDefault();
        setContextMenu(false, [0, 0]);
    };

    const showContextMenu = (e) => {
        e.preventDefault();
        setContextMenu(true, [
            e.clientX - clickOffset[0],
            e.clientY - clickOffset[1],
        ]);
    };

    const setResize = (toResize: boolean) => {
        if (resizable) {
            windowEventDispatch({
                type: "PlatinumWindowResize",
                resizing: toResize,
            });
        }
    };

    const close = () => {
        player({type: "PlatinumSoundPlay", sound: "PlatinumWindowClose"})
        windowEventDispatch({
            type: "PlatinumWindowClose",
        });
        if (typeof onCloseFunc === 'function') {
            onCloseFunc(id);
        }
    };

    const titleBar = () => {
        if (title !== "") {
            return (
                <>
                    <div className={classicyWindowStyle.classicyWindowTitleLeft}></div>
                    <div className={classicyWindowStyle.classicyWindowIcon}>
                        <img src={icon} alt={title}/>
                    </div>
                    <div className={classicyWindowStyle.classicyWindowTitleText}>
                        {title}
                    </div>
                    <div className={classicyWindowStyle.classicyWindowTitleRight}></div>
                </>
            )
        }
        return (
            <div className={classicyWindowStyle.classicyWindowTitleCenter}></div>
        )
    }

    return (
        <>
            {!hidden && (
                <div
                    id={[appId, id].join("_")}
                    ref={windowRef}
                    style={{
                        width: size[0] === 0 ? "auto" : size[0],
                        height: size[1] === 0 ? "auto" : size[1],
                        left: windowState.position[0],
                        top: windowState.position[1],
                        minWidth: minimumSize[0],
                        minHeight: minimumSize[1],
                    }}
                    className={classNames(
                        classicyWindowStyle.classicyWindow,
                        windowState.collapsed === true
                            ? classicyWindowStyle.classicyWindowCollapsed
                            : "",
                        windowState.zoomed === true
                            ? classicyWindowStyle.classicyWindowZoomed
                            : "",
                        isActive()
                            ? classicyWindowStyle.classicyWindowActive
                            : classicyWindowStyle.classicyWindowInactive,
                        windowState.closed === false
                            ? ""
                            : classicyWindowStyle.classicyWindowInvisible,
                        windowState.moving === true
                            ? classicyWindowStyle.classicyWindowDragging
                            : "",
                        windowState.resizing === true
                            ? classicyWindowStyle.classicyWindowResizing
                            : "",
                        modalWindow === true ? classicyWindowStyle.classicyWindowModal : "",
                        scrollable === true
                            ? ""
                            : classicyWindowStyle.classicyWindowNoScroll,
                    )}
                    onMouseMove={changeWindow}
                    onMouseUp={stopChangeWindow}
                    onClick={setActive}
                    onContextMenu={showContextMenu}
                    onMouseOut={hideContextMenu}
                >
                    {contextMenu && windowState.contextMenu && (
                        <ClassicyContextualMenu
                            menuItems={contextMenu}
                            position={windowState.contextMenuLocation}
                        ></ClassicyContextualMenu>
                    )}

                    <div
                        className={classNames(
                            classicyWindowStyle.classicyWindowTitleBar,
                            modalWindow === true
                                ? classicyWindowStyle.classicyWindowTitleBarModal
                                : ""
                        )}
                        onDoubleClick={toggleCollapse}
                    >
                        {closable && (
                            <div className={classicyWindowStyle.classicyWindowControlBox}>
                                <div
                                    className={classicyWindowStyle.classicyWindowCloseBox}
                                    onClick={close}
                                ></div>
                            </div>
                        )}
                        <div
                            className={classicyWindowStyle.classicyWindowTitle}
                            onMouseDown={startMoveWindow}
                        >
                            {titleBar()}
                        </div>
                        {collapsable && (
                            <div className={classicyWindowStyle.classicyWindowControlBox}>
                                <div
                                    className={classicyWindowStyle.classicyWindowCollapseBox}
                                    onClick={toggleCollapse}
                                ></div>
                            </div>
                        )}
                        {zoomable && (
                            <div className={classicyWindowStyle.classicyWindowControlBox}>
                                <div
                                    className={classicyWindowStyle.classicyWindowZoomBox}
                                    onClick={toggleZoom}
                                ></div>
                            </div>
                        )}
                    </div>
                    {header && !windowState.collapsed && (
                        <div className={classicyWindowStyle.classicyWindowHeader}>
                            {header}
                        </div>
                    )}
                    <div
                        className={classNames(
                            isActive()
                                ? ""
                                : classicyWindowStyle.classicyWindowContentsDimmed,
                            scrollable === true
                                ? ""
                                : classicyWindowStyle.classicyWindowNoScroll,
                            modalWindow === true
                                ? classicyWindowStyle.classicyWindowContentsModal
                                : classicyWindowStyle.classicyWindowContents,
                            header ? classicyWindowStyle.classicyWindowContentsWithHeader : ""
                        )}
                        style={{
                            display: windowState.collapsed == true ? "none" : "block",
                        }}
                    >
                        <div
                            className={classNames(
                                classicyWindowStyle.classicyWindowContentsInner,
                                modalWindow === true
                                    ? classicyWindowStyle.classicyWindowContentsModalInner
                                    : "",
                                grow ? classicyWindowStyle.classicyWindowContentsInnerGrow : ""
                            )}
                        >
                            {children}
                        </div>
                    </div>
                    {resizable && !windowState.collapsed && (
                        <div
                            className={classicyWindowStyle.classicyWindowResizer}
                            onMouseDown={startResizeWindow}
                        ></div>
                    )}
                </div>
            )}
        </>
    );
};

export default ClassicyWindow;

"use client";

import {useDesktop, useDesktopDispatch} from '@/app/SystemFolder/SystemResources/AppManager/ClassicyAppManagerContext';
import ClassicyContextualMenu from "@/app/SystemFolder/SystemResources/ContextualMenu/ClassicyContextualMenu";
import {ClassicyMenuItem} from "@/app/SystemFolder/SystemResources/Menu/ClassicyMenu";
import {useSoundDispatch} from "@/app/SystemFolder/SystemResources/SoundManager/PlatinumSoundManagerContext";
import platinumWindowStyle from "@/app/SystemFolder/SystemResources/Window/PlatinumWindow.module.scss";
import {
    PlatinumWindowState,
    PlatinumWindowStateEventReducer
} from "@/app/SystemFolder/SystemResources/Window/PlatinumWindowContext";
import classNames from "classnames";
import React from "react";

interface PlatinumWindowProps {
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

const PlatinumWindow: React.FC<PlatinumWindowProps> = ({
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

    let initialWindowState: PlatinumWindowState = {
        size: initialSize,
        position: initialPosition,
        closed: hidden,
        menuBar: appMenu ? appMenu : [],
        contextMenuShown: false
    };

    const clickOffset = [10, 10];

    const [windowState, windowEventDispatch] = React.useReducer(
        PlatinumWindowStateEventReducer,
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
                    <div className={platinumWindowStyle.platinumWindowTitleLeft}></div>
                    <div className={platinumWindowStyle.platinumWindowIcon}>
                        <img src={icon} alt={title}/>
                    </div>
                    <div className={platinumWindowStyle.platinumWindowTitleText}>
                        {title}
                    </div>
                    <div className={platinumWindowStyle.platinumWindowTitleRight}></div>
                </>
            )
        }
        return (
            <div className={platinumWindowStyle.platinumWindowTitleCenter}></div>
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
                        platinumWindowStyle.platinumWindow,
                        windowState.collapsed === true
                            ? platinumWindowStyle.platinumWindowCollapsed
                            : "",
                        windowState.zoomed === true
                            ? platinumWindowStyle.platinumWindowZoomed
                            : "",
                        isActive()
                            ? platinumWindowStyle.platinumWindowActive
                            : platinumWindowStyle.platinumWindowInactive,
                        windowState.closed === false
                            ? ""
                            : platinumWindowStyle.platinumWindowInvisible,
                        windowState.moving === true
                            ? platinumWindowStyle.platinumWindowDragging
                            : "",
                        windowState.resizing === true
                            ? platinumWindowStyle.platinumWindowResizing
                            : "",
                        modalWindow === true ? platinumWindowStyle.platinumWindowModal : "",
                        scrollable === true
                            ? ""
                            : platinumWindowStyle.platinumWindowNoScroll,
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
                            platinumWindowStyle.platinumWindowTitleBar,
                            modalWindow === true
                                ? platinumWindowStyle.platinumWindowTitleBarModal
                                : ""
                        )}
                        onDoubleClick={toggleCollapse}
                    >
                        {closable && (
                            <div className={platinumWindowStyle.platinumWindowControlBox}>
                                <div
                                    className={platinumWindowStyle.platinumWindowCloseBox}
                                    onClick={close}
                                ></div>
                            </div>
                        )}
                        <div
                            className={platinumWindowStyle.platinumWindowTitle}
                            onMouseDown={startMoveWindow}
                        >
                            {titleBar()}
                        </div>
                        {collapsable && (
                            <div className={platinumWindowStyle.platinumWindowControlBox}>
                                <div
                                    className={platinumWindowStyle.platinumWindowCollapseBox}
                                    onClick={toggleCollapse}
                                ></div>
                            </div>
                        )}
                        {zoomable && (
                            <div className={platinumWindowStyle.platinumWindowControlBox}>
                                <div
                                    className={platinumWindowStyle.platinumWindowZoomBox}
                                    onClick={toggleZoom}
                                ></div>
                            </div>
                        )}
                    </div>
                    {header && !windowState.collapsed && (
                        <div className={platinumWindowStyle.platinumWindowHeader}>
                            {header}
                        </div>
                    )}
                    <div
                        className={classNames(
                            isActive()
                                ? ""
                                : platinumWindowStyle.platinumWindowContentsDimmed,
                            scrollable === true
                                ? ""
                                : platinumWindowStyle.platinumWindowNoScroll,
                            modalWindow === true
                                ? platinumWindowStyle.platinumWindowContentsModal
                                : platinumWindowStyle.platinumWindowContents,
                            header ? platinumWindowStyle.platinumWindowContentsWithHeader : ""
                        )}
                        style={{
                            display: windowState.collapsed == true ? "none" : "block",
                        }}
                    >
                        <div
                            className={classNames(
                                platinumWindowStyle.platinumWindowContentsInner,
                                modalWindow === true
                                    ? platinumWindowStyle.platinumWindowContentsModalInner
                                    : "",
                                grow ? platinumWindowStyle.platinumWindowContentsInnerGrow : ""
                            )}
                        >
                            {children}
                        </div>
                    </div>
                    {resizable && !windowState.collapsed && (
                        <div
                            className={platinumWindowStyle.platinumWindowResizer}
                            onMouseDown={startResizeWindow}
                        ></div>
                    )}
                </div>
            )}
        </>
    );
};

export default PlatinumWindow;

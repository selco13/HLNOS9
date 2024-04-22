import ClassicyApp from "@/app/SystemFolder/SystemResources/App/ClassicyApp";
import {useDesktopDispatch} from "@/app/SystemFolder/SystemResources/AppManager/ClassicyAppManagerContext";
import ClassicyFileBrowser from "@/app/SystemFolder/SystemResources/File/ClassicyFileBrowser";
import {PlatinumFileSystem} from "@/app/SystemFolder/SystemResources/File/ClassicyFileSystem";
import ClassicyWindow from "@/app/SystemFolder/SystemResources/Window/ClassicyWindow";
import React from "react";

const Finder = () => {

    const appName: string = "Finder";
    const appId: string = "Finder.app";
    const appIcon: string = `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/system/macos.svg`;

    const [openPaths, setOpenPaths] = React.useState(["Macintosh HD"]);

    const openFolder = (path: string) => {
        setOpenPaths(Array.from(new Set([...openPaths, path])))
    }

    const openFile = (path: string) => {
        // TODO: Need to write this logic
    }
    const closeFolder = (path: string) => {
        const uniqueOpenPaths = openPaths.filter(e => e !== path.replace('Finder:', ''));
        setOpenPaths(uniqueOpenPaths);
    }

    const closeAll = () => {
        setOpenPaths([]);
    }

    const emptyTrash = () => {
        desktopEventDispatch({
            type: "PlatinumFinderEmptyTrash",
        });
    }

    const fs = new PlatinumFileSystem("");
    const desktopEventDispatch = useDesktopDispatch();

    React.useEffect(() => {
        const drives = fs.filterByType("", "drive");

        Object.entries(drives).forEach(([a, b]) => {
            desktopEventDispatch({
                type: "PlatinumDesktopIconAdd",
                app: {
                    id: appId,
                    name: a,
                    icon: b['_icon']
                }
            });
        });

        desktopEventDispatch({
            type: "PlatinumDesktopIconAdd",
            app: {
                id: "finder_trash",
                name: "Trash",
                icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/system/desktop/trash-full.png`,
            },
            onClickFunc: emptyTrash
        });

    }, []);

    let openWindows = [];
    openPaths.forEach((op, idx) => {
        let dir = fs.statDir(op);
        openWindows.push(
            <ClassicyWindow
                id={appName + ":" + op}
                title={dir['_name']}
                icon={`${process.env.NEXT_PUBLIC_BASE_PATH}${dir['_icon']}`}
                appId={appId}
                initialSize={[425, 300]}
                initialPosition={[50 + (idx * 50), 50 + (idx * 50)]}
                header={<span>{dir["_count"]} items, {fs.formatSize(dir["_size"])}</span>}
                onCloseFunc={closeFolder}
            >
                <ClassicyFileBrowser appId={appId} fs={fs} path={op} dirOnClickFunc={openFolder}
                                     fileOnClickFunc={openFile}/>
            </ClassicyWindow>
        )
    })

    return (
        <ClassicyApp
            id={appId}
            name={appName}
            icon={appIcon}
            noDesktopIcon={true}
            defaultWindow={""}>
            {openWindows}
        </ClassicyApp>
    );
}

export default Finder;

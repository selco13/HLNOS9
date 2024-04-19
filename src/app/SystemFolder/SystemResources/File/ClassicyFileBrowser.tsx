import {getTheme} from "@/app/SystemFolder/Appearance/PlatinumAppearance";
import {useDesktop, useDesktopDispatch} from "@/app/SystemFolder/SystemResources/AppManager/ClassicyAppManagerContext";
import {PlatinumFileSystem} from "@/app/SystemFolder/SystemResources/File/ClassicyFileSystem";
import ClassicyIcon from "@/app/SystemFolder/SystemResources/Icon/ClassicyIcon";
import React from "react";


type PlatinumFileBrowserProps = {
    fs: PlatinumFileSystem;
    path: string;
    appId: string;
    display?: "icons" | "list";
    dirOnClickFunc?: any;
    fileOnClickFunc?: any;
}

const ClassicyFileBrowser: React.FC<PlatinumFileBrowserProps> = (
    {
        fs,
        display = "icons",
        path,
        appId,
        dirOnClickFunc = () => {
        },
        fileOnClickFunc = () => {
        },
    }
) => {
    const desktopContext = useDesktop(), desktopEventDispatch = useDesktopDispatch();

    const [items, setItems] = React.useState([])
    const holderRef = React.useRef(null)

    const iconImageByType = (byType: string) => {
        switch (byType) {
            case "directory": {
                return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/system/folders/directory.png`
            }
            default: {
                return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/img/icons/system/files/file.png`
            }
        }
    };

    const openFileOrFolder = (properties, path: string, filename: string) => {
        switch (properties["_type"]) {
            case "directory": {
                return () => dirOnClickFunc(path + ":" + filename)
            }
            case "file": {
                return () => fileOnClickFunc(path + ":" + filename)
            }
            default: {
                return () => {
                }
            }
        }
    }

    const createGrid = (iconSize: number, iconPadding: number, containerMeasure: [number, number]) => {
        return [
            Math.floor(containerMeasure[0] / (iconSize + iconPadding)),
            Math.floor(containerMeasure[1] / (iconSize * 2 + iconPadding)),
        ];
    };

    const getIconSize = (theme: string) => {
        const themeData = getTheme(theme);
        const iconSize = parseInt(themeData.desktop.iconSize, 10);
        return [iconSize, iconSize / 4];
    }

    const cleanupIcon = (theme: string, iconIndex: number, iconTotal: number, containerMeasure: [number, number]): [number, number] => {
        const [iconSize, iconPadding] = getIconSize(theme);

        let grid = createGrid(iconSize, iconTotal, containerMeasure);
        const startX = grid[0] % (iconIndex + 1);
        const startY = grid[1] % (iconIndex / startX + 1);
        console.log(startX, startY)

        return [
            Math.floor(((iconSize * 2) * startX)) + iconPadding,
            Math.floor(((iconSize * 1) * startY)) + iconPadding,
        ];
    }


    React.useEffect(() => {
        const containerMeasure: [number, number] = [holderRef.current.getBoundingClientRect().width, holderRef.current.getBoundingClientRect().height];
        const directoryListing = fs.filterByType(path, ["file", "directory"]);

        switch (display) {
            // TODO: Still need to work on this... I left it in a weird place.
            // case "list": {
            //
            //     const columnHelper = createColumnHelper()
            //
            //     const columns = [
            //         columnHelper.accessor('firstName', {
            //             cell: info => info.getValue(),
            //             footer: info => info.column.id,
            //         }),
            //         columnHelper.accessor(row => row.lastName, {
            //             id: 'lastName',
            //             cell: info => <i>{info.getValue()}</i>,
            //             header: () => <span>Last Name</span>,
            //             footer: info => info.column.id,
            //         }),
            //         columnHelper.accessor('age', {
            //             header: () => 'Age',
            //             cell: info => info.renderValue(),
            //             footer: info => info.column.id,
            //         }),
            //         columnHelper.accessor('visits', {
            //             header: () => <span>Visits</span>,
            //             footer: info => info.column.id,
            //         }),
            //         columnHelper.accessor('status', {
            //             header: 'Status',
            //             footer: info => info.column.id,
            //         }),
            //         columnHelper.accessor('progress', {
            //             header: 'Profile Progress',
            //             footer: info => info.column.id,
            //         }),
            //     ]
            //
            // }
            case "icons": {
                let icons = [];
                Object.entries(directoryListing).forEach(([filename, properties], index) => {
                    icons.push(
                        <ClassicyIcon
                            appId={appId}
                            name={filename}
                            icon={properties["_icon"] || iconImageByType(properties["_type"])}
                            onClickFunc={openFileOrFolder(properties, path, filename)}
                            holder={holderRef}
                            initialPosition={cleanupIcon(desktopContext.activeTheme, index, Object.entries(directoryListing).length, containerMeasure)}
                        />
                    )
                })
                setItems(icons)
                break;
            }
        }
    }, [path, holderRef, desktopContext])


    return (
        <div style={{position: "absolute", width: "100%", height: "100%"}} ref={holderRef}>
            {items}
        </div>
    );
};

export default ClassicyFileBrowser;


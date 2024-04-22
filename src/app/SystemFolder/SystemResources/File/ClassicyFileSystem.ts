import {sha512} from 'sha512-crypt-ts';

let defaultFSContent = {
    "Macintosh HD": {
        "_type": "drive",
        "_icon": `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/system/drives/disk.png`,
        "Applications": {
            "_type": "directory",
            "_icon": `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/system/folders/directory.png`,
            "TextEdit.app": {
                "_type": "file",
                "_mimeType": "text/plain",
                "_data": "File Contents",
            },
            "Calculator.app": {
                "_type": "file",
                "_mimeType": "text/plain",
                "_data": "File Contents",
            }
        },
        "Library": {
            "_type": "directory",
            "_icon": `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/system/folders/directory.png`,
            "Extensions": {
                "_type": "file",
                "_mimeType": "text/plain",
                "_data": "File Contents"
            }
        },
        "System Folder": {
            "_type": "directory",
            "_icon": `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/system/folders/directory.png`,
            "Finder": {
                "_type": "file",
                "_mimeType": "text/plain",
                "_data": "File Contents"
            },
            "System": {
                "_type": "file",
                "_mimeType": "text/plain",
                "_data": "File Contents"
            }
        },
        "Users": {
            "_type": "directory",
            "_icon": `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/system/folders/directory.png`,
            "Guest": {
                "_type": "file",
                "_mimeType": "text/plain",
                "_data": "File Contents"
            },
            "Shared": {
                "_type": "file",
                "_mimeType": "text/plain",
                "_data": "File Contents"
            }
        },
        "Utilities": {
            "_type": "directory",
            "_icon": `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/system/folders/directory.png`,
            "Disk Utility.app": {
                "_type": "file",
                "_mimeType": "text/plain",
                "_data": "File Contents",
            },
            "Terminal.app": {
                "_type": "file",
                "_mimeType": "text/plain",
                "_data": "File Contents",
            }
        }
    }
}

type PlatinumFileSystemEntry = {
    "_type": "drive" | "directory" | "file" | "shortcut" | "app_shortcut";
    "_icon"?: string;
    "_mimeType"?: string;
    "_data"?: any;
    "_createdOn"?: Date;
    "_modifiedOn"?: Date;
    "_label"?: string;
    "_comments"?: string;
    "_version"?: number;
    "_locked"?: boolean;
    "_count"?: number;
    "_size"?: number;
    "_readOnly"?: boolean;
    "_systemFile"?: boolean;
    "_url"?: string;
    [entry: string]: any;
}

export type pathOrObject = PlatinumFileSystemEntry | string

export class PlatinumFileSystem {
    basePath: string;
    fs: PlatinumFileSystemEntry;
    separator: string;

    constructor(basePath: string = "", defaultFS: any = defaultFSContent, separator: string = ":") {
        this.basePath = basePath
        this.fs = typeof window !== 'undefined'
            ? JSON.parse(localStorage.getItem(this.basePath)) || defaultFS
            : defaultFS;
        this.separator = separator;
    }

    load(data: string) {
        this.fs = JSON.parse(data) as PlatinumFileSystemEntry;
    }

    snapshot(): string {
        return JSON.stringify(this.fs, null, 2);
    }

    pathArray = (path: string) => {
        return [this.basePath, ...path.split(this.separator)].filter((v) => v !== "");
    }

    resolve(path: string): PlatinumFileSystemEntry {
        return this.pathArray(path).reduce((prev, curr) => prev?.[curr], this.fs)
    }

    formatSize(bytes: number, measure: "bits" | "bytes" = "bytes", decimals: number = 2): string {
        if (!+bytes) return '0 ' + measure;
        const sizes = measure === "bits"
            ? ['Bits', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']
            : ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        bytes = measure === "bits" ? bytes * 8 : bytes;

        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(Math.max(0, decimals)))} ${sizes[i]}`;
    }

    filterMetadata(content: any, mode: "only" | "remove" = "remove") {
        let items: PlatinumFileSystemEntry | object = {};

        Object.entries(content).forEach(([key, value]) => {
            switch (mode) {
                case "only": {
                    if (key.startsWith("_")) {
                        items[key] = value
                    }
                    break;
                }
                default: {
                    if (!key.startsWith("_")) {
                        items[key] = value
                    }
                    break;
                }
            }
        });
        return items
    }

    filterByType(path: string, byType: string | string[] = ["file", "directory"]) {
        let items: PlatinumFileSystemEntry | object = {};
        Object.entries(this.resolve(path)).forEach(([b, a]) => {
            if (byType.includes(a["_type"])) {
                items[b] = a
            }
        });
        return items
    }

    statFile(path: string): PlatinumFileSystemEntry {
        let item = this.resolve(path);
        item['_size'] = this.size(path)
        return item
    }

    size(path: pathOrObject): number {
        if (typeof path === 'string') {
            return new Blob([this.readFile(path)]).size;
        }
        if (path instanceof Object && '_data' in path) {
            return new Blob([path['_data'] as string]).size;
        }
    }

    hash(path: pathOrObject) {
        if (typeof path === 'string') {
            return sha512.crypt(this.readFile(path), "");
        }
        if (path instanceof Object && '_data' in path) {
            return sha512.crypt(path['_data'], "");
        }
    }

    readFile(path: pathOrObject): string {
        if (path instanceof Object && '_data' in path) {
            return path['_data'] as string
        }
        if (typeof path === 'string') {
            let item: PlatinumFileSystemEntry = this.resolve(path);
            return this.readFile(item)
        }
    }

    writeFile(path: pathOrObject, data: string) {
        let current: PlatinumFileSystemEntry;

        if (typeof path === 'string') {
            // current = this.generateTree(path, data)
        }

    }

    rmDir(path: string) {
        const pathArr = this.pathArray(path)
        delete pathArr.reduce((init, curr) => init && init[curr], this.fs)[pathArr[pathArr.length - 1]];
    }

    mkDir(path: string) {
        const parts: string[] = this.pathArray(path);

        const newDirectoryObject = () => {
            return {
                "_type": "directory",
                "_icon": `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/system/folders/directory.png`
            } as PlatinumFileSystemEntry;
        }

        let current = {}
        let reference = current;

        for (let i = parts.length - 1; i >= 0; i--) {
            reference = current;
            current = i === 0 ? {} : newDirectoryObject();
            current[parts[i]] = i === parts.length - 1 ? newDirectoryObject() : reference;
        }

        return this.deepMerge(current, this.fs);
    }

    deepMerge(source: any, target: any) {
        Object.keys(target).forEach(key => {
            source[key] instanceof Object && target[key] instanceof Object
                ? source[key] instanceof Array && target[key] instanceof Array
                    ? void (source[key] = Array.from(new Set(source[key].concat(target[key]))))
                    : !(source[key] instanceof Array) && !(target[key] instanceof Array)
                        ? void this.deepMerge(source[key], target[key])
                        : void (source[key] = target[key])
                : void (source[key] = target[key]);
        })
        return source;
    }


    calculateSizeDir(path: PlatinumFileSystemEntry | string): number {
        const gatherSizes = (entry: PlatinumFileSystemEntry, field: string, value: string): any[] => {
            let results: string[] = [];
            for (const key in entry) {
                if (key === field && entry[key] === value) {
                    results.push(String(this.size(entry)));
                } else if (typeof entry[key] === 'object' && entry[key] !== null) {
                    results = results.concat(gatherSizes(entry[key] as PlatinumFileSystemEntry, field, value));
                }
            }
            return results;
        }

        if (typeof path === 'string') {
            path = this.resolve(path)
        }

        return gatherSizes(path, "_type", "file").reduce((a, c) => a + (+c), 0)
    }

    countFilesInDir(path: string): number {
        return Object.entries(this.filterMetadata(this.resolve(path))).length
    }

    statDir(path: string): PlatinumFileSystemEntry {
        let current: PlatinumFileSystemEntry = this.resolve(path);
        let metaData = this.filterMetadata(current, "only");

        let name = path.split(this.separator).slice(-1);

        let returnValue: PlatinumFileSystemEntry = {
            '_count': this.countFilesInDir(path),
            '_name': name[0],
            '_path': path,
            '_size': this.calculateSizeDir(current),
            "_type": "directory"
        };

        Object.entries(metaData).forEach(([key, value]) => {
            returnValue[key] = value
        })
        return returnValue
    }
}

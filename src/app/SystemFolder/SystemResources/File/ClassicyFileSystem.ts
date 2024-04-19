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

export type PlatinumFileSystemEntry = {
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
    "_size"?: number | string;
    "_readOnly"?: boolean;
    "_systemFile"?: boolean;
    "_url"?: string;
    [entry: string]: any;
}

type pathOrObject = PlatinumFileSystemEntry | string

export class PlatinumFileSystem {
    basePath: string;
    fs: PlatinumFileSystemEntry;
    separator: string;

    constructor(basePath: string = "", defaultFS: any = defaultFSContent, separator = ":") {
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

    resolve(path: string): PlatinumFileSystemEntry {
        const pathArray = (path: string) => {
            return [this.basePath, ...path.split(this.separator)].filter((v) => v !== "");
        }
        return pathArray(path).reduce((prev, curr) => prev?.[curr], this.fs)
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

    statFile(path: string, formatSize?: boolean, sizeIn: "bits" | "bytes" = "bytes"): PlatinumFileSystemEntry {
        let item = this.resolve(path);
        if (formatSize) {
            item['_size'] = this.formatSize(this.size(path), sizeIn)
        } else {
            item['_size'] = this.size(path)
        }
        return item
    }

    size(path: pathOrObject): number {
        if (typeof path === 'string') {
            return new Blob([this.readFileRaw(path)]).size;
        }
        if (path instanceof Object && '_data' in path) {
            return new Blob([path['_data'] as string]).size;
        }
    }

    hash(path: pathOrObject) {
        if (typeof path === 'string') {
            return sha512.crypt(this.readFileRaw(path), "");
        }
        if (path instanceof Object && '_data' in path) {
            return sha512.crypt(path['_data'], "");
        }
    }

    readFileRaw(path: pathOrObject): string {
        if (path instanceof Object && '_data' in path) {
            return path['_data'] as string
        }
        if (typeof path === 'string') {
            let item: PlatinumFileSystemEntry = this.resolve(path);
            if (item && '_data' in item) {
                return item['_data'];
            }
        }
    }

    readFile(path: pathOrObject) {
        if (path instanceof Object && '_data' in path) {
            return this.readFileRaw(path)
        }
        if (typeof path === 'string') {

            let item: PlatinumFileSystemEntry = this.resolve(path);
            if ('_data' in item) {
                if ('_mimeType' in item) {
                    return this.renderFile(item['_mimeType'], item['_data']);
                } else {
                    return item['_data'];
                }
            }
        }
    }

    renderFile(mimeType: string, contents: any) {
        switch (mimeType) {
            default: {
                return contents;
            }
        }
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

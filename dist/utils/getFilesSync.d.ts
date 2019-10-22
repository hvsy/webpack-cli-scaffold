export declare function getFile(dir: string, ex?: string[]): any;
export declare function getFilesSync(dir: string, withName: true, ex?: string[]): {
    path: string;
    name: string;
}[];
export declare function getFilesSync(dir: string, withName?: false, ex?: string[]): string[];

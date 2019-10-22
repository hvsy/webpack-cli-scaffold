export declare type ModuleWithName = {
    module: any;
    name: string;
};
export declare function getModules(dir: string, withName: false): any[];
export declare function getModules(dir: string, withName: true): ModuleWithName[];
export declare function getModules(dir: string): any[];

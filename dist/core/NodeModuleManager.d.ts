export default class NodeModuleManager {
    private readonly path;
    private readonly ext;
    private _cache;
    private readonly _files;
    constructor(dir: string, ext?: string[]);
    curring(name: any): any;
    applyByFilter(filter: any, ...args: any[]): any;
    runByFilter(filter: any, callback: any): any;
    run(callback: (module: {
        module: any;
        name: string;
    }) => any): any;
    getModules(filter?: any): any;
    get(filter?: any): any;
    apply(...args: any[]): any;
    protected load(name: string): any;
}

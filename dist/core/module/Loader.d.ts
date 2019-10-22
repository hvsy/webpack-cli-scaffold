import { TreeNode } from "./FilesTree";
declare type ModuleLoaderCallback = (...args: any[]) => Promise<any>;
export default class ModuleLoader {
    callbacks: ModuleLoaderCallback[];
    private tree;
    constructor(tree: TreeNode);
    addListener(callback: ModuleLoaderCallback): this;
    removeListener(callback: ModuleLoaderCallback): this;
    render: (node: TreeNode) => {};
    load(): {}[];
}
export {};

/// <reference types="webpack-env" />
import RequireContext = __WebpackModuleApi.RequireContext;
export declare type TreeNode = {
    name?: string;
    path?: string;
    children: TreeNode[];
    data?: NodeData;
};
export declare type NodeData = {
    filePath: string;
    path: string;
    ext: string;
    key: string;
    loader: () => Promise<any>;
    [index: string]: any;
};
export default class FilesTree {
    private readonly files;
    private prefix;
    static From(files: RequireContext, prefix?: string): FilesTree;
    getPrefix(): string;
    setPrefix(prefix: any): this;
    constructor(files: RequireContext, prefix?: string);
    toTree(regex: RegExp, callback?: (nodeData: NodeData, matches: string[], key: string) => NodeData): TreeNode;
}

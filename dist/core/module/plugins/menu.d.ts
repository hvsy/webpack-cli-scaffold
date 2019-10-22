/// <reference types="webpack-env" />
import RequireContext = __WebpackModuleApi.RequireContext;
import LoaderPlugin from "../LoaderPlugin";
import { NodeData } from "../FilesTree";
export default class MenuLoader extends LoaderPlugin {
    private readonly files;
    constructor(files: RequireContext);
    handle(nodeData: NodeData): NodeData | void;
}

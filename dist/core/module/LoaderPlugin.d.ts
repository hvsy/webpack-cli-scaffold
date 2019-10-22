import { NodeData } from "./FilesTree";
export default abstract class LoaderPlugin {
    async: boolean;
    abstract handle(nodeData: NodeData): NodeData | void;
}

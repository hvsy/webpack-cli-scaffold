import {NodeData} from "./FilesTree";

export default abstract class LoaderPlugin {
    public async : boolean = false;
    abstract handle(nodeData: NodeData) : NodeData|void;

}
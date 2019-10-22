import RequireContext = __WebpackModuleApi.RequireContext;
import LoaderPlugin from "../LoaderPlugin";
import {NodeData} from "../FilesTree";

export default class MenuLoader extends LoaderPlugin{
    private readonly files: __WebpackModuleApi.RequireContext;

    constructor(files : RequireContext){
        super();
        this.files = files;
    }
    handle(nodeData: NodeData): NodeData|void{
        const keys = this.files.keys();
        const key = nodeData.key;
        let menuKey = key.replace('route','menu');
        if(keys.indexOf(menuKey) !== -1){
            const m = this.files(menuKey);
            nodeData.menu = m.default || m;
        }
        return nodeData;
    }

}
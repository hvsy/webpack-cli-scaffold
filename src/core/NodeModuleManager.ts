import path from "path";
import {getFilesSync} from "../utils/getFilesSync";
import _find from "lodash/find";

export default class NodeModuleManager{
    private readonly path:string;
    private readonly ext: string[];
    private _cache:any = {};
    private readonly _files;

    constructor(dir:string,ext = ['js','ts','jsx','tsx']){
        this.path = path.resolve(dir + "/");
        this.ext = ext;
        this._files = getFilesSync(this.path,true,this.ext);
    }

    curring(name){
        if(!this._cache[name]){
            this._cache[name] = this.load(name);
        }
        return this._cache[name];
    }

    public applyByFilter(filter, ...args){
        return this.getModules().map(({module}) => {
            return module(...args);
        });
    }
    public runByFilter(filter,callback){
        return this.getModules(filter).map(callback);
    }
    public run(callback : (module : {module:any,name:string})=>any){
        return this.runByFilter(null,callback);
    }
    public getModules(filter = null){
        return this.get(filter).map(({path,name})=>{
            if(!this._cache[name]){
                const mod = require(path);
                this._cache[name] = mod.default || mod;
            }
            return {module : this._cache[name],name};
        });
    }
    public get(filter = null){
        return filter ? this._files.filter(filter) : this._files;
    }
    public apply(...args){
        return this.applyByFilter(null,...args);
    }
    protected load(name:string){
        const file = _find(this._files,({name : n})=>n ===name);
        if(!file){
            return null;
        }
        const mod = require(file.path);
        return mod.default || mod;
    }


}
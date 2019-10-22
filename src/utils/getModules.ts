import {getFilesSync} from "./getFilesSync";
import path from "path";


export type ModuleWithName = {
    module : any,
    name : string,
};

export function getModules(dir : string,withName : false) : any[];
export function getModules(dir : string,withName : true) : ModuleWithName[];
export function getModules(dir : string) : any[];

export function getModules(dir : string,withName : boolean= false){
    const files = getFilesSync(dir);
    return files.map((file) => {
        const module = require(file);
        if(withName){
            return {
                module : module.default || module,
                name : path.basename(file,path.extname(file)),
            }
        }
        return module.default || module;
    })
}
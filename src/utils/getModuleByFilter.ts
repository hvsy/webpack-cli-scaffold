import {getFilesSync} from "./getFilesSync";
import fileToModule from "./fileToModule";

export function getModuleByFilter(path,filter){
    let files = getFilesSync(path,true);
    if(filter)
        files = files.filter(filter);
    return files.map(fileToModule(true));
}
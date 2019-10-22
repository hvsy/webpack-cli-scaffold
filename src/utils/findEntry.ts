import glob from "glob";
import _first from "lodash/first"

export function findEntry(pattern : string,target : string = null):string{
    if(target === null){
        target = process.cwd();
    }
    const entryPattern = (`${(target)}/${pattern}.?s*`);
    const files = glob.sync(entryPattern);
    return  _first(files);
}
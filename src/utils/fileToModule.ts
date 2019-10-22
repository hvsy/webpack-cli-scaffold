import path from "path";

export default function fileToModule(withName = false){
    return (file : string|{path:string,name:string})=>{
        const p = typeof file === 'string' ? file : file.path;
        const module = require(p);
        if(withName){
            return {
                module : module.default || module,
                name : path.basename(p,path.extname(p)),
            }
        }
        return module.default || module;
    }
}
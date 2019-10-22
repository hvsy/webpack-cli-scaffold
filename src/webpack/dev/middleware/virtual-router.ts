import {MultiCompiler} from "webpack";
import {Request} from "express";

export type virtualRouterOptions ={

};

export default function (options : virtualRouterOptions,compiler : MultiCompiler){
    const names = compiler.compilers.map((c)=>c.name);
    const regex = new RegExp(`^\/(${names.join('|')})`);
    return (request : Request,res,next)=>{
        const {path} = request;
        if(path.indexOf('js') !== -1){
            next();
            return;
        }
        const found = path.match(regex);
        if(found){
            const name = found[1];
            request.url = '/' + name + "/index.html";
            next('route');
        }
    }
}
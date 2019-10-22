import path from "path";
import glob from "glob";
import _regexEscape from "lodash/escapeRegExp";

export function getFile(dir : string,ex : string[] = ['js','ts']){
    const targetDir =path.resolve(dir) + '/';
    const target =targetDir  + "**/*.*(" + ex.join('|') + ")";
    return glob(target,(er,files)=>{

    });
}
export function getFilesSync(dir : string, withName : true,ex ?: string[]) : {path:string,name:string}[];
export function getFilesSync(dir : string, withName? : false,ex ?: string[]) : string[];
export function getFilesSync(dir : string, withName = false,ex : string[] = ['js','ts']){
    const targetDir =path.resolve(dir) + '/';
    const target =targetDir  + "**/*.*(" + ex.join('|') + ")";
    const files = glob.sync(target).filter((f)=>f.indexOf('d.ts') === -1);
    if(withName){
        return files.map((file) => {
            const ext = path.extname(file);
            const name= file.replace(new RegExp('^'+ _regexEscape(targetDir)),'')
                .replace(new RegExp(_regexEscape(ext) + "$"),'');

           return {
               path:file,
               name :name,
           }
        });
    }else return files;
}
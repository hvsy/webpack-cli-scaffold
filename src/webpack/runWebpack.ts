import WebpackConfig from "./WebpackConfig";
const webpack = require("webpack");
import console from 'console';

export function runWebpack(webpackConfig: WebpackConfig[]){
    return webpack(webpackConfig.map(c=>c.toConfig()), (error:any,stats : any) => {
        if(error){
            console.error(error.stack || error);
            if(error.details){
                console.error(error.details);
            }
            return;
        }

        const info = stats.toJson();
        if(stats.hasErros()){
            console.error(info.errors);
        }
        if(stats.hasWarnings()){
            console.warn(info.warnings);
        }
        console.log(`run webpack ok!\n`);
    });
}
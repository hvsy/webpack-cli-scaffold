import {PluginCallback} from "../WebpackConfig";
const WebpackAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

export type AnalyzerPluginOptions ={

};
let from = 8888;

export const AnalyzerPlugin : PluginCallback<AnalyzerPluginOptions> = (opts,config,options)=>{
    config.plugin('analyzer').use(WebpackAnalyzerPlugin,[
        {
            analyzerPort :from ++,
        }
    ]).end();
};
export default AnalyzerPlugin;
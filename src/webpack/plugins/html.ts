import Config from "webpack-chain";
import {WebpackOptions} from "../WebpackOptions";
import {PluginCallback} from "../WebpackConfig";
const HtmlWebpackPlugin = require('html-webpack-plugin');

export type HtmlPluginOptions = {
    inject?: boolean
    template?:string,
    filename ?:string,
};
export const htmlPlugin : PluginCallback<HtmlPluginOptions> = (html,config,options)=>{
    const opt = Object.assign({
        base:  '/' + (config.get('name') || ''),
        filename : config.get('name') + '/index.html' ,
        inject : 'body',
    },html);
    console.log(opt);
    config.plugin('html').use(HtmlWebpackPlugin,[opt])
};
export default htmlPlugin;

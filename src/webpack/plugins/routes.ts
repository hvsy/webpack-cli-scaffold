import path from "path";
import findUp from "find-up";
import {PluginCallback} from "../WebpackConfig";

export type VirtualRoutesPluginOptions = {
    regex ?: RegExp,
    path?:string,
    moduleName ?: string,
};
const VirtualModulePlugin = require('virtual-module-webpack-plugin');

const nodeModules = findUp.sync('node_modules',{
    type : 'directory',
    allowSymlinks : true,
    cwd : __dirname,
});

export const VirtualRoutesPlugin : PluginCallback<VirtualRoutesPluginOptions>= (routes , config, options)=>{
    const opts : VirtualRoutesPluginOptions = Object.assign({
        regex : /^(.*)\/route\.(js|ts|tsx|jsx)$/,
        path: "@root",
        moduleName : '@routes',
    },routes);
    const regex = opts.regex.toString();
    const Loader = path.resolve(__dirname + '/../../core/module/Loader');
    const FilesTree= path.resolve(__dirname + '/../../core/module/FilesTree');
    // const basename = config.get('name') || '';
    config.plugin('virtual-routes').use(VirtualModulePlugin,[
        {
            path: nodeModules + '/' + opts.moduleName,
            moduleName : opts.moduleName,

            // language=JSX Harmony
            contents : `    
               import Loader from "${Loader}";
               import FilesTree from "${FilesTree}";
               const routes = require.context("${opts.path}/".concat(__resourceQuery.substr(1)),true,${regex},'lazy');
               const loader = new Loader(FilesTree.From(routes).toTree(${regex}));
               export default loader.load();
            `
        }
    ]);
};
export default VirtualRoutesPlugin;
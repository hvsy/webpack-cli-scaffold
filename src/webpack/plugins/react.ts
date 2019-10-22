import {ReactNode} from "react";
import {PluginCallback} from "../WebpackConfig";
import path from "path";
const EntryWrapper = require('entrypoint-wrapper-webpack-plugin');
const reactStartup = path.resolve(__dirname + '/../utils/startup/react');
const template = (opts : ReactPluginOptions,{origin,name})=>{
    const hasContainer = opts.container ? `
       import AppContainer from "${opts.container}" ;
    ` : 'const AppContainer = null;';
    // language=JSX Harmony
    return `
        import Startup from "${reactStartup}";
        import App from "${origin}";
        ${hasContainer}
        const Container = AppContainer;
        Startup('${name}',App,Container,'${opts.targetId}');
    `;
};
const templateDev = (opts : ReactPluginOptions,{origin,name})=>{
    const hasContainer = opts.container ? `
       import AppContainer from "${opts.container}" ;
    ` : 'const AppContainer = null;';
    const hot = require.resolve('react-hot-loader');
    // language=JSX Harmony
    return `
        import Startup from "${reactStartup}";
        import {setConfig} from '${hot}';
        setConfig({
            logLevel : 'debug',
            reloadHooks : false,
        });
        import App from "${origin}";
        ${hasContainer};
        const Container = AppContainer;
        Startup("${name}",App,Container,'${opts.targetId}');
        if(module.hot){
            module.hot.accept('${origin}',function(){
                Startup("${name}",require('${origin}').default,Container);
            });
        }
    `;
};
export type ReactPluginOptions = {
    container ?: string| ((App : ReactNode)=>ReactNode),
    targetId ?: string,
};
export const ReactEntryPlugin : PluginCallback<ReactPluginOptions> = (reactOptions,config,options)=>{
        const opts : ReactPluginOptions = Object.assign({
            targetId: 'root'
        },reactOptions);
        config.plugin('entry').use(EntryWrapper,[{
            exclude : /.*hot-middleware.*/,
            skipExistFiles : false,
            template : options.dev ? templateDev.bind(null,opts) : template.bind(null,opts),
        }]);
};
export default ReactEntryPlugin;
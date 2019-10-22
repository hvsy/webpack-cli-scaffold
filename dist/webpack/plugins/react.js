"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const EntryWrapper = require('entrypoint-wrapper-webpack-plugin');
const reactStartup = path_1.default.resolve(__dirname + '/../utils/startup/react');
const template = (opts, { origin, name }) => {
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
const templateDev = (opts, { origin, name }) => {
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
exports.ReactEntryPlugin = (reactOptions, config, options) => {
    const opts = Object.assign({
        targetId: 'root'
    }, reactOptions);
    config.plugin('entry').use(EntryWrapper, [{
            exclude: /.*hot-middleware.*/,
            skipExistFiles: false,
            template: options.dev ? templateDev.bind(null, opts) : template.bind(null, opts),
        }]);
};
exports.default = exports.ReactEntryPlugin;

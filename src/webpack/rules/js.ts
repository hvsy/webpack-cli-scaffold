import Config from "webpack-chain";
import {WebpackOptions} from "../WebpackOptions";
import {RuleCallback} from "../WebpackConfig";

export const JsLoader : RuleCallback = (config : Config, options : WebpackOptions)=>{
    const rule = config.module.rule('js');
    rule.test(/\.m?jsx?$/).exclude.add((what) => {
        const cliIndex = what.indexOf('shopify-js');
        const moduleIndex = what.lastIndexOf('node_modules');
        if (cliIndex !== -1 && (moduleIndex === -1 || cliIndex > moduleIndex)) {
            return false;
        }
        if (options.exclude(what)) return true;
        return /(node_modules|bower_components)/.test(what);
    }).end();
    rule.use('babel-loader').loader(require.resolve('babel-loader')).options({
        presets : [
            require.resolve('@babel/preset-env'),
        ],
        plugins : [
        ],
    })
};

export default JsLoader;
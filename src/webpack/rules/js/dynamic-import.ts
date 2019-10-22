import Config from "webpack-chain";
import {WebpackOptions} from "../../WebpackOptions";

export const dynamicImport = (config : Config,options : WebpackOptions)=>{
    const rule = config.module.rule('js');
    rule.use('babel-loader').tap((opts)=>{
        opts.plugins.push(
            require.resolve("babel-plugin-syntax-dynamic-import"),
        );
        return opts;
    })
};
export default dynamicImport;
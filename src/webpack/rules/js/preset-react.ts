import Config from "webpack-chain";
import {react} from "../../utils/react";
import {WebpackOptions} from "../../WebpackOptions";

export const presetReact = (config : Config, options : WebpackOptions)=>{
    config.module.rule('js').use('babel-loader').tap((opts) => {
        opts.presets.push(
            require.resolve('@babel/preset-react')
        );
        return opts;
    })
};

export default react(presetReact);
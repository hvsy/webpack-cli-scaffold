import Config from "webpack-chain";
import {dev} from "../../utils/dev";
import {react} from "../../utils/react";
import {WebpackOptions} from "../../WebpackOptions";


export const hotLoader = (config : Config,options : WebpackOptions)=>{
    const rule = config.module.rule('js');
    rule.use('babel-loader').tap((opts)=>{
        opts.plugins.push(
            require.resolve('react-hot-loader/babel')
        );
        return opts;
    })
};
export default react(dev(hotLoader));
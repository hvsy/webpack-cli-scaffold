import Config from "webpack-chain";
import {dev} from "../../utils/dev";
import {react} from "../../utils/react";
import {WebpackOptions} from "../../WebpackOptions";

export const antImport = (config : Config,options : WebpackOptions)=>{
    config.module.rule('js').use('babel-loader').tap((opts) => {
        opts.plugins.push(
            [
                require.resolve('babel-plugin-import'),
                {
                    libraryName: 'antd', libraryDirectory: 'lib', style :  'css' ,
                },"ant-design",
            ],
            [
                require.resolve('babel-plugin-import'),
                {
                    libraryName: 'ant-design-pro', libraryDirectory: 'lib', style: 'css', camel2DashComponentName: false,
                },"ant-design-pro",
            ]
        );
        return opts;
    })
};

export default react(dev(antImport));
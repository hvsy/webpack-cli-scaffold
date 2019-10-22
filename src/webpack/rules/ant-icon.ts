import Config from "webpack-chain";
import {RuleCallback} from "../WebpackConfig";
const path = require('path');

export const AntIconLoader : RuleCallback = (config : Config)=>{
    config.module.rule('ant-icon').pre().include.add(
        path.resolve('node_modules/@ant-design/icons/lib/dist')
    ).end().use('ant-icon').loader(require.resolve('webpack-ant-icon-loader'));
};
export default AntIconLoader;
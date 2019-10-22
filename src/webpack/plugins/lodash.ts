import {PluginCallback} from "../WebpackConfig";
const LodashWebpackPlugin = require('lodash-webpack-plugin');

export const lodashPlugin : PluginCallback<{}> = (lodash,config,options)=>{
    config.plugin('lodash').use(LodashWebpackPlugin,[{
        paths : true,
    }]);
};
export default lodashPlugin;
import {dev} from "../utils/dev";
import {PluginCallback} from "../WebpackConfig";
const Webpack = require('webpack');

export type HotPluginOptions = {
    name?:string,
    port?:number|string,
};

export const HotPlugin : PluginCallback<HotPluginOptions> = (hot,config,options)=>{
    const hotClient = require.resolve('webpack-hot-middleware/client');
    const queryString = [
        `path=http://localhost:${hot.port || 3000}/__webpack_hmr`
    ];
    const name = config.get('name');
    if(name){
        queryString.unshift(`name=${name}`);
    }
    const url = queryString.length > 0 ? `${hotClient}?${queryString.join('&')}` : hotClient;
    config.entry(hot.name || name).add(url).end();
    config.resolve.alias.set('react-dom',require.resolve('@hot-loader/react-dom')).end();
    config.plugin('hot').use(Webpack.HotModuleReplacementPlugin).end();
};
export default dev(HotPlugin);

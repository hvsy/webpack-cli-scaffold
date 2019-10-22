const webpackDevMiddleware = require('webpack-dev-middleware');

export type WebpackOptions = {
    publicPath?:string,
    [index : string] : any,
};

export default function(opts : WebpackOptions,compiler){
    return webpackDevMiddleware(compiler,{
        publicPath : '/',
        ...opts,
    });
}
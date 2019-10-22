export type HotOptions = {
     path ?: string
    [index : string] : any,
};

export default function(options : HotOptions,compiler){
    return require("webpack-hot-middleware")(compiler,{
        path : '/__webpack_hmr',
        ...options,
    })
}
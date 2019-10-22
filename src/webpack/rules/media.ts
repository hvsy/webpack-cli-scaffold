import Config from "webpack-chain";
import {WebpackOptions} from "../WebpackOptions";
import {RuleCallback} from "../WebpackConfig";

export const MediaLoader : RuleCallback = (config : Config,options : WebpackOptions)=>{
    const rule = config.module.rule('media');
    const ex = [
        'mp4','ogg','svg','eot','ttf','woff','woff2','jpg','png',
    ];
    rule.test(new RegExp(
        "\\.(" + ex.join('|')+")$",
    )).end();
    rule.use('file-loader').loader(require.resolve('file-loader')).options({
        outputPath: (url : string, resourcePath : string, context : any) => {
            if(/\.(eot|ttf|woff|woff2)$/.test(resourcePath)){
                return `fonts/${url}`;
            }
            if(/\.(jpg|png)$/.test(resourcePath)){
                return `images/${url}`;
            }
            return url;
        },
    })
};
export default MediaLoader;
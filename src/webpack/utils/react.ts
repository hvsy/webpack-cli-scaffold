import WebpackConfig from "../WebpackConfig";

export const react= WebpackConfig.createDecorate((config,options) => {
    if(!options.plugin.react) return false;
});
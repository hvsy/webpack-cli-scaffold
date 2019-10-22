import WebpackConfig from "../WebpackConfig";

export const dev = WebpackConfig.createDecorate((config,options) => {
    if(!options.dev) return false;
});
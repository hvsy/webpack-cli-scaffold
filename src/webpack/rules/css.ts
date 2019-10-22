import Config from "webpack-chain";
import {setCssLoaders} from "../utils/setCssLoaders";
import {WebpackOptions} from "../WebpackOptions";
import {RuleCallback} from "../WebpackConfig";

export const CssLoader : RuleCallback = (config : Config,options : WebpackOptions)=>{
    const antRegex = [
        /[\\/]node_modules[\\/].*antd/,
        /[\\/]node_modules[\\/].*ant-design-pro/,
    ];
    const notGlobalRegex = /^((?!\.global).)*\.css$/;
    const cssGlobalRule = config.module.rule('css-global');
    cssGlobalRule.test(
        /\.global\.css$/
    ).end();
    setCssLoaders(cssGlobalRule,false);

    const antCssRule = config.module.rule('ant-css');
    antCssRule.test(notGlobalRegex)
        .include.merge(antRegex).end();
    setCssLoaders(antCssRule,false);

    const projectCssRule = config.module.rule('project-css');
    projectCssRule.test(notGlobalRegex).exclude.merge(antRegex).end();
    setCssLoaders(projectCssRule,options.enableCssModules);
};
export default CssLoader;
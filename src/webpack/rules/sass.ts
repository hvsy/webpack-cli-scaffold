import Config, {Rule} from "webpack-chain";
import {setCssLoaders} from "../utils/setCssLoaders";
import {WebpackOptions} from "../WebpackOptions";
import {RuleCallback} from "../WebpackConfig";

const setSassLoaders = (rule : Rule,enableCssModules : boolean)=>{
    setCssLoaders(rule,enableCssModules);
    rule.use('sass-loader').loader(require.resolve('sass-loader')).options({
        javascriptEnabled:true,
    });
};

export const SassLoader : RuleCallback =  (config : Config,options : WebpackOptions)=>{
    const sassGlobalRule = config.module.rule('sass-global');
    sassGlobalRule.test(/\.global\.scss$/).end();
    setSassLoaders(sassGlobalRule,false);

    const projectSassRule = config.module.rule('project-sass');
    projectSassRule.test(/^((?!\.global).)*\.scss$/).end();
    setSassLoaders(projectSassRule,options.enableCssModules);
};

export default SassLoader;
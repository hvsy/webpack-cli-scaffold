import Config, {Rule} from "webpack-chain";
import {setCssLoaders} from "../utils/setCssLoaders";
import {WebpackOptions} from "../WebpackOptions";
import {RuleCallback} from "../WebpackConfig";

const setLessLoaders = (rule : Rule,enableCssModules : boolean)=>{
    setCssLoaders(rule,enableCssModules);
    rule.use('less-loaders').loader(require.resolve('less-loader')).options({
        javascriptEnabled : true,
    })
};

export const LessLoader : RuleCallback = (config  : Config,options : WebpackOptions)=>{
    const lessGlobalRule = config.module.rule('less-global');
    lessGlobalRule.test(/\.global\.less$/).end();
    setLessLoaders(lessGlobalRule,false);

    const lessProjectRule = config.module.rule('project-less');
    lessProjectRule.test(/^((?!\.global).)*\.less$/).end();
    setLessLoaders(lessProjectRule,options.enableCssModules);
};

export default LessLoader;
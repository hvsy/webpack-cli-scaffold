"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setCssLoaders_1 = require("../utils/setCssLoaders");
const setLessLoaders = (rule, enableCssModules) => {
    setCssLoaders_1.setCssLoaders(rule, enableCssModules);
    rule.use('less-loaders').loader(require.resolve('less-loader')).options({
        javascriptEnabled: true,
    });
};
exports.LessLoader = (config, options) => {
    const lessGlobalRule = config.module.rule('less-global');
    lessGlobalRule.test(/\.global\.less$/).end();
    setLessLoaders(lessGlobalRule, false);
    const lessProjectRule = config.module.rule('project-less');
    lessProjectRule.test(/^((?!\.global).)*\.less$/).end();
    setLessLoaders(lessProjectRule, options.enableCssModules);
};
exports.default = exports.LessLoader;

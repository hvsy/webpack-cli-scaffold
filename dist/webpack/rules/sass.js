"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setCssLoaders_1 = require("../utils/setCssLoaders");
const setSassLoaders = (rule, enableCssModules) => {
    setCssLoaders_1.setCssLoaders(rule, enableCssModules);
    rule.use('sass-loader').loader(require.resolve('sass-loader')).options({
        javascriptEnabled: true,
    });
};
exports.SassLoader = (config, options) => {
    const sassGlobalRule = config.module.rule('sass-global');
    sassGlobalRule.test(/\.global\.scss$/).end();
    setSassLoaders(sassGlobalRule, false);
    const projectSassRule = config.module.rule('project-sass');
    projectSassRule.test(/^((?!\.global).)*\.scss$/).end();
    setSassLoaders(projectSassRule, options.enableCssModules);
};
exports.default = exports.SassLoader;

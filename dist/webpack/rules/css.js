"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setCssLoaders_1 = require("../utils/setCssLoaders");
exports.CssLoader = (config, options) => {
    const antRegex = [
        /[\\/]node_modules[\\/].*antd/,
        /[\\/]node_modules[\\/].*ant-design-pro/,
    ];
    const notGlobalRegex = /^((?!\.global).)*\.css$/;
    const cssGlobalRule = config.module.rule('css-global');
    cssGlobalRule.test(/\.global\.css$/).end();
    setCssLoaders_1.setCssLoaders(cssGlobalRule, false);
    const antCssRule = config.module.rule('ant-css');
    antCssRule.test(notGlobalRegex)
        .include.merge(antRegex).end();
    setCssLoaders_1.setCssLoaders(antCssRule, false);
    const projectCssRule = config.module.rule('project-css');
    projectCssRule.test(notGlobalRegex).exclude.merge(antRegex).end();
    setCssLoaders_1.setCssLoaders(projectCssRule, options.enableCssModules);
};
exports.default = exports.CssLoader;

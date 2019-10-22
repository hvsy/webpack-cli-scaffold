"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsLoader = (config, options) => {
    const rule = config.module.rule('js');
    rule.test(/\.m?jsx?$/).exclude.add((what) => {
        const cliIndex = what.indexOf('shopify-js');
        const moduleIndex = what.lastIndexOf('node_modules');
        if (cliIndex !== -1 && (moduleIndex === -1 || cliIndex > moduleIndex)) {
            return false;
        }
        if (options.exclude(what))
            return true;
        return /(node_modules|bower_components)/.test(what);
    }).end();
    rule.use('babel-loader').loader(require.resolve('babel-loader')).options({
        presets: [
            require.resolve('@babel/preset-env'),
        ],
        plugins: [],
    });
};
exports.default = exports.JsLoader;

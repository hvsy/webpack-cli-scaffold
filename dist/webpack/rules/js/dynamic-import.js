"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicImport = (config, options) => {
    const rule = config.module.rule('js');
    rule.use('babel-loader').tap((opts) => {
        opts.plugins.push(require.resolve("babel-plugin-syntax-dynamic-import"));
        return opts;
    });
};
exports.default = exports.dynamicImport;

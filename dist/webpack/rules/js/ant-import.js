"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dev_1 = require("../../utils/dev");
const react_1 = require("../../utils/react");
exports.antImport = (config, options) => {
    config.module.rule('js').use('babel-loader').tap((opts) => {
        opts.plugins.push([
            require.resolve('babel-plugin-import'),
            {
                libraryName: 'antd', libraryDirectory: 'lib', style: 'css',
            }, "ant-design",
        ], [
            require.resolve('babel-plugin-import'),
            {
                libraryName: 'ant-design-pro', libraryDirectory: 'lib', style: 'css', camel2DashComponentName: false,
            }, "ant-design-pro",
        ]);
        return opts;
    });
};
exports.default = react_1.react(dev_1.dev(exports.antImport));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
exports.AntIconLoader = (config) => {
    config.module.rule('ant-icon').pre().include.add(path.resolve('node_modules/@ant-design/icons/lib/dist')).end().use('ant-icon').loader(require.resolve('webpack-ant-icon-loader'));
};
exports.default = exports.AntIconLoader;

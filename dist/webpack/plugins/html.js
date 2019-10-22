"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlWebpackPlugin = require('html-webpack-plugin');
exports.htmlPlugin = (html, config, options) => {
    const opt = Object.assign({
        base: '/' + (config.get('name') || ''),
        filename: config.get('name') + '/index.html',
        inject: 'body',
    }, html);
    console.log(opt);
    config.plugin('html').use(HtmlWebpackPlugin, [opt]);
};
exports.default = exports.htmlPlugin;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebpackAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let from = 8888;
exports.AnalyzerPlugin = (opts, config, options) => {
    config.plugin('analyzer').use(WebpackAnalyzerPlugin, [
        {
            analyzerPort: from++,
        }
    ]).end();
};
exports.default = exports.AnalyzerPlugin;

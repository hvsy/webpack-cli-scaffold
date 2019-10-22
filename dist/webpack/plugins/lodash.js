"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LodashWebpackPlugin = require('lodash-webpack-plugin');
exports.lodashPlugin = (lodash, config, options) => {
    config.plugin('lodash').use(LodashWebpackPlugin, [{
            paths: true,
        }]);
};
exports.default = exports.lodashPlugin;

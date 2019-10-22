"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpackDevMiddleware = require('webpack-dev-middleware');
function default_1(opts, compiler) {
    return webpackDevMiddleware(compiler, {
        publicPath: '/',
        ...opts,
    });
}
exports.default = default_1;

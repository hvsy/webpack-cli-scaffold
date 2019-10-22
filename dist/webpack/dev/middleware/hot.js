"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(options, compiler) {
    return require("webpack-hot-middleware")(compiler, {
        path: '/__webpack_hmr',
        ...options,
    });
}
exports.default = default_1;

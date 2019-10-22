"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
exports.DefaultWebpackOptions = {
    enableCssModules: true,
    exclude(path) {
        return false;
    },
    dev: true,
    plugin: {}
};

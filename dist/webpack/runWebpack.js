"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack = require("webpack");
const console_1 = __importDefault(require("console"));
function runWebpack(webpackConfig) {
    return webpack(webpackConfig.map(c => c.toConfig()), (error, stats) => {
        if (error) {
            console_1.default.error(error.stack || error);
            if (error.details) {
                console_1.default.error(error.details);
            }
            return;
        }
        const info = stats.toJson();
        if (stats.hasErros()) {
            console_1.default.error(info.errors);
        }
        if (stats.hasWarnings()) {
            console_1.default.warn(info.warnings);
        }
        console_1.default.log(`run webpack ok!\n`);
    });
}
exports.runWebpack = runWebpack;

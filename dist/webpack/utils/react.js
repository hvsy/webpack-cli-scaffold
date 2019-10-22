"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebpackConfig_1 = __importDefault(require("../WebpackConfig"));
exports.react = WebpackConfig_1.default.createDecorate((config, options) => {
    if (!options.plugin.react)
        return false;
});

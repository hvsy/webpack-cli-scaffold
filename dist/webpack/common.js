"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebpackConfig_1 = __importDefault(require("./WebpackConfig"));
exports.default = WebpackConfig_1.default.FormPath(__dirname, (config, webpackConfig) => {
    webpackConfig.addNodeModules(__dirname, config.get('context') || process.cwd());
    config.resolve.modules.add('node_modules').end();
    config.resolve.extensions.add('.js').add('.jsx').add('.tsx').add('.ts').end();
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("../../utils/react");
exports.presetReact = (config, options) => {
    config.module.rule('js').use('babel-loader').tap((opts) => {
        opts.presets.push(require.resolve('@babel/preset-react'));
        return opts;
    });
};
exports.default = react_1.react(exports.presetReact);

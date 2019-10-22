"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dev_1 = require("../../utils/dev");
const react_1 = require("../../utils/react");
exports.hotLoader = (config, options) => {
    const rule = config.module.rule('js');
    rule.use('babel-loader').tap((opts) => {
        opts.plugins.push(require.resolve('react-hot-loader/babel'));
        return opts;
    });
};
exports.default = react_1.react(dev_1.dev(exports.hotLoader));

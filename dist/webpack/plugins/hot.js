"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dev_1 = require("../utils/dev");
const Webpack = require('webpack');
exports.HotPlugin = (hot, config, options) => {
    const hotClient = require.resolve('webpack-hot-middleware/client');
    const queryString = [
        `path=http://localhost:${hot.port || 3000}/__webpack_hmr`
    ];
    const name = config.get('name');
    if (name) {
        queryString.unshift(`name=${name}`);
    }
    const url = queryString.length > 0 ? `${hotClient}?${queryString.join('&')}` : hotClient;
    config.entry(hot.name || name).add(url).end();
    config.resolve.alias.set('react-dom', require.resolve('@hot-loader/react-dom')).end();
    config.plugin('hot').use(Webpack.HotModuleReplacementPlugin).end();
};
exports.default = dev_1.dev(exports.HotPlugin);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const find_up_1 = __importDefault(require("find-up"));
const VirtualModulePlugin = require('virtual-module-webpack-plugin');
const nodeModules = find_up_1.default.sync('node_modules', {
    type: 'directory',
    allowSymlinks: true,
    cwd: __dirname,
});
exports.VirtualRoutesPlugin = (routes, config, options) => {
    const opts = Object.assign({
        regex: /^(.*)\/route\.(js|ts|tsx|jsx)$/,
        path: "@root",
        moduleName: '@routes',
    }, routes);
    const regex = opts.regex.toString();
    const Loader = path_1.default.resolve(__dirname + '/../../core/module/Loader');
    const FilesTree = path_1.default.resolve(__dirname + '/../../core/module/FilesTree');
    // const basename = config.get('name') || '';
    config.plugin('virtual-routes').use(VirtualModulePlugin, [
        {
            path: nodeModules + '/' + opts.moduleName,
            moduleName: opts.moduleName,
            // language=JSX Harmony
            contents: `    
               import Loader from "${Loader}";
               import FilesTree from "${FilesTree}";
               const routes = require.context("${opts.path}/".concat(__resourceQuery.substr(1)),true,${regex},'lazy');
               const loader = new Loader(FilesTree.From(routes).toTree(${regex}));
               export default loader.load();
            `
        }
    ]);
};
exports.default = exports.VirtualRoutesPlugin;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeModuleManager_1 = __importDefault(require("../core/NodeModuleManager"));
const WebpackOptions_1 = require("./WebpackOptions");
const webpack_chain_1 = __importDefault(require("webpack-chain"));
const find_up_1 = __importDefault(require("find-up"));
class WebpackConfig {
    constructor(path, options, config = new webpack_chain_1.default()) {
        this._config = config;
        this.options = Object.assign(WebpackOptions_1.DefaultWebpackOptions, options);
        this._rules = new NodeModuleManager_1.default(path + "/rules");
        this._plugins = new NodeModuleManager_1.default(path + "/plugins");
        this.getConfig().mode(this.getOptions().dev ? 'development' : 'production');
    }
    static FormPath(path, callback) {
        return (options) => {
            const config = WebpackConfig.Creator(path, options);
            if (callback) {
                config.config(callback);
            }
            return config;
        };
    }
    static Creator(path, options) {
        return new WebpackConfig(path, options);
        //return config.setup();
    }
    getOptions() {
        return this.options;
    }
    getConfig() {
        return this._config;
    }
    toConfig() {
        this.setup();
        return this.getConfig().toConfig();
    }
    context(path) {
        this.getConfig().context(path).resolve.alias.set('@root', path).end();
        return this;
    }
    addNodeModules(...paths) {
        paths.forEach((p) => {
            this.addNodeModule(p);
        });
        return this;
    }
    addNodeModule(path) {
        this.getConfig().resolve.modules.add(find_up_1.default.sync('node_modules', {
            type: "directory",
            allowSymlinks: true,
            cwd: path,
        }));
        return this;
    }
    name(name) {
        this.getConfig().name(name).output.publicPath(`/js/`);
        return this;
    }
    rule(name) {
        this._rules.curring(name)(this.getConfig(), this.getOptions());
        return this;
    }
    plugin(name, option = {}) {
        if (!this.getOptions().plugin[name] && !option) {
            return null;
        }
        this.options.plugin[name] = option || this.getOptions().plugin[name];
        this._plugins.curring(name)(this.getOptions().plugin[name], this.getConfig(), this.getOptions());
        return this;
    }
    config(callback) {
        callback(this.getConfig(), this);
        return this;
    }
    setup() {
        this._rules.apply(this.getConfig(), this.getOptions());
        this._plugins.runByFilter(({ name }) => {
            return !!this.getOptions().plugin[name];
        }, ({ module, name }) => {
            module(this.getOptions().plugin[name], this.getConfig(), this.getOptions());
        });
        return this;
    }
    static createDecorate(callback) {
        return (func) => {
            return (...args) => {
                const len = args.length;
                const options = args[len - 1];
                const config = args[len - 2];
                if (callback(config, options) === false) {
                    return;
                }
                func(...args);
            };
        };
    }
}
exports.default = WebpackConfig;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const console_1 = __importDefault(require("console"));
const NodeModuleManager_1 = __importDefault(require("../../core/NodeModuleManager"));
const express = require('express');
class Server {
    constructor(configs, options) {
        this.compiler = webpack_1.default(configs);
        this.app = express();
        const path = __dirname + "/middleware";
        this.middleware = new NodeModuleManager_1.default(path);
        if (options) {
            this.setup(options);
        }
    }
    use(middleware) {
        this.app.use(middleware);
        return this;
    }
    setup(options) {
        const middleware = Object.assign({
            webpack: {},
            hot: {},
            proxy: {},
            "virtual-router": {}
        }, options.middleware);
        this.middleware.runByFilter(m => !!middleware[m.name], ({ module, name }) => {
            this.app.use(module(middleware[name], this.compiler));
        });
        return this;
    }
    run(port = 3000) {
        this.app.listen(port, () => {
            console_1.default.log(`listening on port ${port}!`);
        });
    }
}
exports.Server = Server;

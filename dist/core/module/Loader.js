"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const remove_1 = __importDefault(require("lodash/remove"));
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const renderTree_1 = require("./renderTree");
const getModule = (module) => {
    return module.default || module;
};
const Container = ({ nodeData, children, callbacks = [] }) => {
    const { path, } = nodeData;
    const promises = Promise.all([
        nodeData.loader(),
        ...callbacks.map(c => c(nodeData))
    ]);
    const Lazy = react_1.default.lazy(() => {
        return promises.then(([m, ...others]) => {
            const ModuleComponent = getModule(m);
            const nest = children ? react_1.default.createElement(react_router_dom_1.Switch, null, children) : null;
            return {
                default: (props) => react_1.default.createElement(ModuleComponent, Object.assign({}, props, { path: path }), nest)
            };
        });
    });
    return react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement("div", null, "loading") },
        react_1.default.createElement(Lazy, null));
};
class ModuleLoader {
    constructor(tree) {
        this.callbacks = [];
        this.render = renderTree_1.createTreeRender((node, children = null) => {
            //const path = children ? node.path + "/*" : node.path;
            return react_1.default.createElement(react_router_dom_1.Route, { path: node.path, key: node.name },
                react_1.default.createElement(Container, { nodeData: node.data, callbacks: this.callbacks }, children));
        });
        this.tree = tree;
    }
    addListener(callback) {
        if (this.callbacks.indexOf(callback) === -1) {
            this.callbacks.push(callback);
        }
        return this;
    }
    removeListener(callback) {
        this.callbacks = remove_1.default(this.callbacks, (c) => {
            return c === callback;
        });
        return this;
    }
    load() {
        return this.tree.children.map(this.render);
    }
}
exports.default = ModuleLoader;

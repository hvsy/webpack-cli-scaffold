"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("babel-polyfill");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
exports.default = (name, App, Container, targetId = 'root') => {
    const main = Container ? react_1.default.createElement(Container, null,
        react_1.default.createElement(App, { name: name })) : react_1.default.createElement(App, { name: name });
    let root = document.getElementById(targetId);
    if (!root) {
        root = document.createElement('div');
        root.id = targetId;
        document.body.append(root);
    }
    return react_dom_1.default.render(main, root);
};

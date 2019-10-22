"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoaderPlugin_1 = __importDefault(require("../LoaderPlugin"));
class MenuLoader extends LoaderPlugin_1.default {
    constructor(files) {
        super();
        this.files = files;
    }
    handle(nodeData) {
        const keys = this.files.keys();
        const key = nodeData.key;
        let menuKey = key.replace('route', 'menu');
        if (keys.indexOf(menuKey) !== -1) {
            const m = this.files(menuKey);
            nodeData.menu = m.default || m;
        }
        return nodeData;
    }
}
exports.default = MenuLoader;

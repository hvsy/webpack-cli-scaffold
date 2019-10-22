"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const getFilesSync_1 = require("../utils/getFilesSync");
const find_1 = __importDefault(require("lodash/find"));
class NodeModuleManager {
    constructor(dir, ext = ['js', 'ts', 'jsx', 'tsx']) {
        this._cache = {};
        this.path = path_1.default.resolve(dir + "/");
        this.ext = ext;
        this._files = getFilesSync_1.getFilesSync(this.path, true, this.ext);
    }
    curring(name) {
        if (!this._cache[name]) {
            this._cache[name] = this.load(name);
        }
        return this._cache[name];
    }
    applyByFilter(filter, ...args) {
        return this.getModules().map(({ module }) => {
            return module(...args);
        });
    }
    runByFilter(filter, callback) {
        return this.getModules(filter).map(callback);
    }
    run(callback) {
        return this.runByFilter(null, callback);
    }
    getModules(filter = null) {
        return this.get(filter).map(({ path, name }) => {
            if (!this._cache[name]) {
                const mod = require(path);
                this._cache[name] = mod.default || mod;
            }
            return { module: this._cache[name], name };
        });
    }
    get(filter = null) {
        return filter ? this._files.filter(filter) : this._files;
    }
    apply(...args) {
        return this.applyByFilter(null, ...args);
    }
    load(name) {
        const file = find_1.default(this._files, ({ name: n }) => n === name);
        if (!file) {
            return null;
        }
        const mod = require(file.path);
        return mod.default || mod;
    }
}
exports.default = NodeModuleManager;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function fileToModule(withName = false) {
    return (file) => {
        const p = typeof file === 'string' ? file : file.path;
        const module = require(p);
        if (withName) {
            return {
                module: module.default || module,
                name: path_1.default.basename(p, path_1.default.extname(p)),
            };
        }
        return module.default || module;
    };
}
exports.default = fileToModule;

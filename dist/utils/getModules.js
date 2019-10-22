"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getFilesSync_1 = require("./getFilesSync");
const path_1 = __importDefault(require("path"));
function getModules(dir, withName = false) {
    const files = getFilesSync_1.getFilesSync(dir);
    return files.map((file) => {
        const module = require(file);
        if (withName) {
            return {
                module: module.default || module,
                name: path_1.default.basename(file, path_1.default.extname(file)),
            };
        }
        return module.default || module;
    });
}
exports.getModules = getModules;

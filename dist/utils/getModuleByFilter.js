"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getFilesSync_1 = require("./getFilesSync");
const fileToModule_1 = __importDefault(require("./fileToModule"));
function getModuleByFilter(path, filter) {
    let files = getFilesSync_1.getFilesSync(path, true);
    if (filter)
        files = files.filter(filter);
    return files.map(fileToModule_1.default(true));
}
exports.getModuleByFilter = getModuleByFilter;

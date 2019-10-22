"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const first_1 = __importDefault(require("lodash/first"));
function findEntry(pattern, target = null) {
    if (target === null) {
        target = process.cwd();
    }
    const entryPattern = (`${(target)}/${pattern}.?s*`);
    const files = glob_1.default.sync(entryPattern);
    return first_1.default(files);
}
exports.findEntry = findEntry;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const escapeRegExp_1 = __importDefault(require("lodash/escapeRegExp"));
function getFile(dir, ex = ['js', 'ts']) {
    const targetDir = path_1.default.resolve(dir) + '/';
    const target = targetDir + "**/*.*(" + ex.join('|') + ")";
    return glob_1.default(target, (er, files) => {
    });
}
exports.getFile = getFile;
function getFilesSync(dir, withName = false, ex = ['js', 'ts']) {
    const targetDir = path_1.default.resolve(dir) + '/';
    const target = targetDir + "**/*.*(" + ex.join('|') + ")";
    const files = glob_1.default.sync(target).filter((f) => f.indexOf('d.ts') === -1);
    if (withName) {
        return files.map((file) => {
            const ext = path_1.default.extname(file);
            const name = file.replace(new RegExp('^' + escapeRegExp_1.default(targetDir)), '')
                .replace(new RegExp(escapeRegExp_1.default(ext) + "$"), '');
            return {
                path: file,
                name: name,
            };
        });
    }
    else
        return files;
}
exports.getFilesSync = getFilesSync;

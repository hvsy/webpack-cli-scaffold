"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findIndex_1 = __importDefault(require("lodash/findIndex"));
const kebabCase_1 = __importDefault(require("lodash/kebabCase"));
const escapeRegExp_1 = __importDefault(require("lodash/escapeRegExp"));
function appendToTree(segments, tree, nodeData) {
    let currentNode = tree;
    const len = segments.length;
    const passes = [];
    segments.forEach((segment, i) => {
        const last = len === (i + 1);
        const hit = findIndex_1.default(currentNode.children, c => c.name === segment);
        passes.push(segment);
        if (hit === -1) {
            const newNode = {
                name: segment,
                path: '/' + passes.join('/'),
                children: [],
            };
            if (last) {
                newNode.data = nodeData;
            }
            currentNode.children.push(newNode);
            currentNode = newNode;
        }
        else {
            currentNode = currentNode.children[hit];
            if (last) {
                currentNode.data = nodeData;
            }
        }
    });
    return tree;
}
class FilesTree {
    static From(files, prefix = './') {
        return new FilesTree(files, prefix);
    }
    getPrefix() {
        return this.prefix;
    }
    setPrefix(prefix) {
        this.prefix = prefix;
        return this;
    }
    constructor(files, prefix = './') {
        this.files = files;
        this.prefix = prefix;
    }
    toTree(regex, callback) {
        const prefix = this.prefix;
        const files = this.files;
        let tree = {
            children: []
        };
        files.keys().forEach((key) => {
            const matches = key.match(regex);
            if (matches) {
                const [, filePath, ext] = matches;
                const path = filePath.replace(new RegExp('^' + escapeRegExp_1.default(prefix)), '');
                const segments = path.split('/').map(kebabCase_1.default);
                let nodeData = {
                    filePath,
                    ext,
                    key,
                    path: segments.join('/'),
                    loader() {
                        return files(key).then((m) => {
                            return m.default && m;
                        });
                    }
                };
                if (callback)
                    nodeData = callback(nodeData, matches, key);
                tree = appendToTree(segments, tree, nodeData);
            }
        });
        return tree;
    }
}
exports.default = FilesTree;

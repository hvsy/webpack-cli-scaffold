"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTreeRender = (fn) => {
    return (node) => {
        const { data, children, } = node;
        const childNodes = children.length === 0 ? null : children.map((child) => {
            return fn(child);
        });
        if (!data) {
            return childNodes;
        }
        return fn(node, childNodes);
    };
};

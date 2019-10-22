"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isFunction_1 = __importDefault(require("lodash/isFunction"));
const isArray_1 = __importDefault(require("lodash/isArray"));
const get_1 = __importDefault(require("lodash/get"));
const proxyMiddleware = require('http-proxy-middleware');
function default_1(opts) {
    const { rule, options } = Object.assign(opts, {
        rule: {
            passes: ['api']
        },
        options: {
            host: 'localhost',
            port: '8082',
        }
    });
    const host = get_1.default(options || {}, 'host', 'localhost');
    const port = get_1.default(options || {}, 'port', 8082);
    return proxyMiddleware(isFunction_1.default(rule) ? rule : function (pathname, request) {
        const passes = isArray_1.default(rule) ? rule : rule.passes;
        const rules = passes.join('|');
        const regex = new RegExp(`^\/([^\/]+)\/(${rules})`);
        return !!pathname.match(regex);
    }, {
        target: `http://${host}:${port}`,
        pathRewrite: {
            '^/': '/',
        }
    });
}
exports.default = default_1;

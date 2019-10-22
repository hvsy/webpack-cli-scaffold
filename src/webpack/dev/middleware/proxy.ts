import _isFunction from "lodash/isFunction";
import _isArray from "lodash/isArray";
import _get from "lodash/get";

const proxyMiddleware = require('http-proxy-middleware');

type ProxyRule = ((pathname:string, request:any)=>boolean) | {
    passes : string[],
} | string[];

export type ProxyOptions = {
    rule : ProxyRule,
    options ?: {
        port?: string|number,
        host?: string
    },
};
export default function (opts : ProxyOptions){
    const {rule,options} = Object.assign(opts,{
        rule : {
            passes : ['api']
        },
        options : {
            host : 'localhost',
            port : '8082',
        }
    });
    const host= _get(options||{},'host','localhost');
    const port = _get(options||{},'port',8082);
    return proxyMiddleware(_isFunction(rule) ? rule : function(pathname: string,request : any){
        const passes = _isArray(rule) ? rule : rule.passes;
        const rules = passes.join('|');
        const regex = new RegExp(`^\/([^\/]+)\/(${rules})`);
        return !!pathname.match(regex);
    },{
        target : `http://${host}:${port}`,
        pathRewrite : {
            '^/' : '/',
        }
    });
}
import {getModuleByFilter} from "../../utils/getModuleByFilter";
import {ProxyOptions} from "./middleware/proxy";
import {WebpackOptions} from "./middleware/webpack";
import webpack, {MultiCompiler} from "webpack";
import console from "console";
import {virtualRouterOptions} from "./middleware/virtual-router";
import NodeModuleManager from "../../core/NodeModuleManager";

const express = require('express');
export type ServerOptions = {
    middleware ?: {
        proxy ?: ProxyOptions,
        webpack?: WebpackOptions,
        "virtual-router" ?: virtualRouterOptions,
    }
};
export class Server<T extends ServerOptions>{
    private app;
    private readonly compiler : MultiCompiler;
    private middleware : NodeModuleManager;
    constructor(configs : any[],options ?: T){
        this.compiler = webpack(configs);
        this.app = express();
        const path = __dirname + "/middleware";
        this.middleware = new NodeModuleManager(path);
        if(options){
            this.setup(options);
        }
    }
    use(middleware : any){
        this.app.use(middleware);
        return this;
    }
    setup(options : T){
        const middleware: T['middleware']= Object.assign({
           webpack : {

           } ,
           hot : {

           } ,
           proxy : {

           },
            "virtual-router" : {

            }
        },options.middleware);

        this.middleware.runByFilter(m=>!!middleware[m.name], ({module,name}) => {
            this.app.use(module(middleware[name],this.compiler));
        });
        return this;
    }
    run(port = 3000){
        this.app.listen(port, () => {
            console.log(`listening on port ${port}!`);
        });
    }
}
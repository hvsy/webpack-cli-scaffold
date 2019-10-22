import { ProxyOptions } from "./middleware/proxy";
import { WebpackOptions } from "./middleware/webpack";
import { virtualRouterOptions } from "./middleware/virtual-router";
export declare type ServerOptions = {
    middleware?: {
        proxy?: ProxyOptions;
        webpack?: WebpackOptions;
        "virtual-router"?: virtualRouterOptions;
    };
};
export declare class Server<T extends ServerOptions> {
    private app;
    private readonly compiler;
    private middleware;
    constructor(configs: any[], options?: T);
    use(middleware: any): this;
    setup(options: T): this;
    run(port?: number): void;
}

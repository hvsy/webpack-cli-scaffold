/// <reference types="webpack" />
import NodeModuleManager from "../core/NodeModuleManager";
import { BaseWebpackOptions, WebpackOptions } from "./WebpackOptions";
import Config from "webpack-chain";
export declare type PluginOptions = WebpackOptions['plugin'];
export declare type Plugins = keyof PluginOptions;
export declare type RuleCallback<T extends BaseWebpackOptions = WebpackOptions> = (config: Config, options: T) => void;
export declare type PluginCallback<PT, T extends BaseWebpackOptions = WebpackOptions> = (opts: PT, config: Config, options: T) => void;
export declare type ConfigCallback = (config: Config, context: WebpackConfig) => void;
export default class WebpackConfig<T extends BaseWebpackOptions = WebpackOptions> {
    static FormPath<T extends BaseWebpackOptions = WebpackOptions>(path: string, callback?: ConfigCallback): (options: T) => WebpackConfig<T>;
    static Creator<T extends BaseWebpackOptions = WebpackOptions>(path: string, options: T): WebpackConfig<T>;
    private readonly _config;
    private readonly options;
    getOptions(): T;
    getConfig(): Config;
    toConfig(): import("webpack").Configuration;
    constructor(path: string, options: T, config?: Config);
    context(path: string): this;
    addNodeModules(...paths: string[]): this;
    addNodeModule(path: string): this;
    name(name: string): this;
    protected _rules: NodeModuleManager;
    protected _plugins: NodeModuleManager;
    rule(name: string): this;
    plugin<T extends Plugins>(name: T, option?: PluginOptions[T]): this;
    config(callback: ConfigCallback): this;
    setup(): this;
    static createDecorate<T extends BaseWebpackOptions = WebpackOptions>(callback: (config: Config, options: T) => any): (func: any) => (...args: any[]) => void;
}

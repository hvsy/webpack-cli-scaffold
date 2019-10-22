import NodeModuleManager from "../core/NodeModuleManager";
import {BaseWebpackOptions, DefaultWebpackOptions, WebpackOptions} from "./WebpackOptions";
import Config from "webpack-chain";
import findUp from "find-up";


export type PluginOptions= WebpackOptions['plugin'];
export type Plugins = keyof PluginOptions;
export type RuleCallback<T extends BaseWebpackOptions = WebpackOptions> = (config:Config,options : T)=>void;
export type PluginCallback<PT,T extends BaseWebpackOptions = WebpackOptions> = (opts : PT,config:Config,options : T)=>void;

export type ConfigCallback = (config : Config,context : WebpackConfig)=>void;
export default class WebpackConfig<T extends BaseWebpackOptions = WebpackOptions>{
    public static FormPath<T extends BaseWebpackOptions = WebpackOptions>(path:string,callback ?: ConfigCallback){
        return (options : T)=>{
            const config = WebpackConfig.Creator(path,options);
            if(callback){
                config.config(callback);
            }
            return config;
        }
    }
    public static Creator<T extends BaseWebpackOptions = WebpackOptions>(path : string,options : T){
        return new WebpackConfig(path,options);
        //return config.setup();
    }
    private readonly _config: Config;
    private readonly options : T ;

    getOptions(){
        return this.options;
    }
    getConfig(){
        return this._config;
    }
    toConfig(){
        this.setup();
        return this.getConfig().toConfig();
    }
    constructor(path:string,options : T,config : Config = new Config()){
        this._config = config;
        this.options =  Object.assign(DefaultWebpackOptions,options);
        this._rules = new NodeModuleManager(path + "/rules");
        this._plugins = new NodeModuleManager(path+ "/plugins");
        this.getConfig().mode(this.getOptions().dev ? 'development' : 'production');
    }
    context(path:string){
        this.getConfig().context(path).resolve.alias.set('@root',path).end();
        return this;
    }
    addNodeModules(...paths : string[]){
        paths.forEach((p) => {
            this.addNodeModule(p);
        });
        return this;
    }
    addNodeModule(path : string){
        this.getConfig().resolve.modules.add(
            findUp.sync('node_modules',{
                type : "directory",
                allowSymlinks : true,
                cwd : path,
            }),
        );
        return this;
    }
    name(name:string){
        this.getConfig().name(name).output.publicPath(`/js/`);
        return this;
    }
    protected _rules : NodeModuleManager;
    protected _plugins : NodeModuleManager;

    public rule(name: string){
        this._rules.curring(name)(this.getConfig(),this.getOptions());
        return this;
    }
    public plugin<T extends Plugins>(name : T,option : PluginOptions[T]= {}){
        if(!this.getOptions().plugin[name] && !option){
            return null;
        }
        this.options.plugin[name] = option || this.getOptions().plugin[name];
        this._plugins.curring(name)(this.getOptions().plugin[name],this.getConfig(),this.getOptions());
        return this;
    }

    public config(callback : ConfigCallback){
        callback(this.getConfig(),this);
        return this;
    }

    public setup(){
        this._rules.apply(this.getConfig(),this.getOptions());
        this._plugins.runByFilter(({name})=>{
            return !!this.getOptions().plugin[name];
        }, ({module,name}) => {
            module(this.getOptions().plugin[name],this.getConfig(),this.getOptions());
        });
        return this;
    }
    public static createDecorate<T extends BaseWebpackOptions = WebpackOptions>(callback : (config : Config,options : T)=>any){
        return (func)=>{
            return (...args)=>{
                const len = args.length;
                const options = args[len-1];
                const config = args[len-2];
                if(callback(config,options) === false){
                    return;
                }
                func(...args);
            }
        };
    }
}
import { PluginCallback } from "../WebpackConfig";
export declare type VirtualRoutesPluginOptions = {
    regex?: RegExp;
    path?: string;
    moduleName?: string;
};
export declare const VirtualRoutesPlugin: PluginCallback<VirtualRoutesPluginOptions>;
export default VirtualRoutesPlugin;

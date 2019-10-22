import { PluginCallback } from "../WebpackConfig";
export declare type HotPluginOptions = {
    name?: string;
    port?: number | string;
};
export declare const HotPlugin: PluginCallback<HotPluginOptions>;
declare const _default: (...args: any[]) => void;
export default _default;

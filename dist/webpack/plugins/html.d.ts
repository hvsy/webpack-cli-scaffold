import { PluginCallback } from "../WebpackConfig";
export declare type HtmlPluginOptions = {
    inject?: boolean;
    template?: string;
    filename?: string;
};
export declare const htmlPlugin: PluginCallback<HtmlPluginOptions>;
export default htmlPlugin;

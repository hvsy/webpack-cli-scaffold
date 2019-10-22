import { VirtualRoutesPluginOptions } from "./plugins/routes";
import { ReactPluginOptions } from "./plugins/react";
import { HtmlPluginOptions } from "./plugins/html";
import { HotPluginOptions } from "./plugins/hot";
import { AnalyzerPluginOptions } from "./plugins/analyzer";
export interface BaseWebpackOptions {
    dev?: boolean;
    plugin?: any;
}
export declare const DefaultWebpackOptions: {
    enableCssModules: boolean;
    exclude(path: any): boolean;
    dev: boolean;
    plugin: {};
};
export interface WebpackOptions extends BaseWebpackOptions {
    enableCssModules?: boolean;
    exclude?: (path: string) => boolean;
    dev?: boolean;
    plugin?: {
        routes?: VirtualRoutesPluginOptions;
        react?: ReactPluginOptions;
        html?: HtmlPluginOptions;
        lodash?: any;
        hot?: HotPluginOptions;
        analyzer?: AnalyzerPluginOptions;
    };
}

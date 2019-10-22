import { ReactNode } from "react";
import { PluginCallback } from "../WebpackConfig";
export declare type ReactPluginOptions = {
    container?: string | ((App: ReactNode) => ReactNode);
    targetId?: string;
};
export declare const ReactEntryPlugin: PluginCallback<ReactPluginOptions>;
export default ReactEntryPlugin;

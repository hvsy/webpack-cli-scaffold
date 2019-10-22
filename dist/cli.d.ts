export { Command, CommandArg, CommandArgs } from "@hvsy/node-cli";
export { Server } from "./webpack/dev/Server";
export { runWebpack } from "./webpack/runWebpack";
import { ModuleWithName } from "./utils/getModules";
export declare function cli(commands: string | (ModuleWithName[]), version?: string): (argv?: string[]) => void;

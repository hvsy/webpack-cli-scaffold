export {Command,CommandArg,CommandArgs} from "@hvsy/node-cli";
export {Server} from "./webpack/dev/Server";
export {runWebpack} from "./webpack/runWebpack";

import {cli as NodeCli} from "@hvsy/node-cli";
import {getModules, ModuleWithName} from "./utils/getModules";

export function cli(commands : string | (ModuleWithName[]),version = ''){
    let all = typeof (commands) === 'string' ? getModules(commands,true) : commands;
    return NodeCli({
        commands: all,
        version,
    });
}
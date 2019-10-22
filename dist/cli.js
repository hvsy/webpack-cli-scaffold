"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_cli_1 = require("@hvsy/node-cli");
exports.Command = node_cli_1.Command;
var Server_1 = require("./webpack/dev/Server");
exports.Server = Server_1.Server;
var runWebpack_1 = require("./webpack/runWebpack");
exports.runWebpack = runWebpack_1.runWebpack;
const node_cli_2 = require("@hvsy/node-cli");
const getModules_1 = require("./utils/getModules");
function cli(commands, version = '') {
    let all = typeof (commands) === 'string' ? getModules_1.getModules(commands, true) : commands;
    return node_cli_2.cli({
        commands: all,
        version,
    });
}
exports.cli = cli;

import Config = require("webpack-chain");
import {AntIconLoader} from "../../src/webpack/rules/ant-icon";

it("loader",() => {
    const config = new Config();
    AntIconLoader(config,{});
    console.log(JSON.stringify(config.toConfig()));
});
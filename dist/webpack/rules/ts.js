"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsImportPluginFactory = require('ts-import-plugin');
exports.tsLoader = (config, options) => {
    const rule = config.module.rule('ts');
    const tsconfig = __dirname + "/../../../tsconfig.json";
    console.log(tsconfig);
    rule.test(/\.m?tsx?$/).exclude.add((what) => {
        if (what.indexOf('node_modules') !== -1) {
            return true;
        }
        return false;
    });
    rule.use('ts-loader').loader(require.resolve('ts-loader')).options({
        transpileOnly: true,
        configFile: tsconfig,
        compilerOptions: {
            "jsx": "react",
        },
        getCustomTransformers: () => ({
            before: [tsImportPluginFactory([{
                        libraryName: 'antd',
                        style: options.dev ? 'css' : false,
                        libraryDirectory: 'lib',
                    }, {
                        libraryName: 'ant-design-pro',
                        // style : dev ? 'css' : false,
                        style: options.dev ? 'css' : false,
                        camel2DashComponentName: false,
                        libraryDirectory: 'lib',
                    },])]
        }),
    });
};
exports.default = exports.tsLoader;

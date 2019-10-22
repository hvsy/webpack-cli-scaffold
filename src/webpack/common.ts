import WebpackConfig from "./WebpackConfig";
import findUp from "find-up";




export default WebpackConfig.FormPath(__dirname, (config,webpackConfig) => {
    webpackConfig.addNodeModules(__dirname,config.get('context') || process.cwd());
    config.resolve.modules.add('node_modules').end();
    config.resolve.extensions.add('.js').add('.jsx').add('.tsx').add('.ts').end();
});
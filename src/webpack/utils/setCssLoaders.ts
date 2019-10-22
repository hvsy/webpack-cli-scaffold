import {Rule} from "webpack-chain";

export const setCssLoaders = (rule: Rule, enableCssModules = true) => {
    rule.use('style-loader').loader(require.resolve('style-loader'));
    rule.use('css-loader').loader(require.resolve('css-loader')).options({
        url: true, import: true, modules: enableCssModules,
    });
    rule.use('postcss-loader').loader(require.resolve('postcss-loader')).options({
        plugins: (loader: any) => [
            require('autoprefixer')({
                overrideBrowserslist: ['last 3 versions', 'iOS 9']
            }),
        ]
    });
    rule.use('url-loader').loader(require.resolve('resolve-url-loader'));
};
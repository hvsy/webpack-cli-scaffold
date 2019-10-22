"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaLoader = (config, options) => {
    const rule = config.module.rule('media');
    const ex = [
        'mp4', 'ogg', 'svg', 'eot', 'ttf', 'woff', 'woff2', 'jpg', 'png',
    ];
    rule.test(new RegExp("\\.(" + ex.join('|') + ")$")).end();
    rule.use('file-loader').loader(require.resolve('file-loader')).options({
        outputPath: (url, resourcePath, context) => {
            if (/\.(eot|ttf|woff|woff2)$/.test(resourcePath)) {
                return `fonts/${url}`;
            }
            if (/\.(jpg|png)$/.test(resourcePath)) {
                return `images/${url}`;
            }
            return url;
        },
    });
};
exports.default = exports.MediaLoader;

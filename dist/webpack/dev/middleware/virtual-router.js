"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(options, compiler) {
    const names = compiler.compilers.map((c) => c.name);
    const regex = new RegExp(`^\/(${names.join('|')})`);
    return (request, res, next) => {
        const { path } = request;
        if (path.indexOf('js') !== -1) {
            next();
            return;
        }
        const found = path.match(regex);
        if (found) {
            const name = found[1];
            request.url = '/' + name + "/index.html";
            next('route');
        }
    };
}
exports.default = default_1;

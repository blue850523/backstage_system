const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/backstage-system/'
    : '/',
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module.rule("svg").exclude.add(resolve("src/icons")).end();
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            })
            .end();
    },
    devServer: {
        proxy: 'http://dev-tc-laravel.vc-technology.com',
    }
};

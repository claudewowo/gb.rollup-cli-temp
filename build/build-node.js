require('@babel/register');
const path = require('path');
const rollup = require('rollup');
const resolve = p => path.resolve(__dirname, '../', p);
const env = process.env.npm_lifecycle_event;
let config;
// console.log(env, remain, process.env);

if (env === 'build') {
    config = require('./rollup.config.prod');
} else {
    config = require('./rollup.config.dev');
}

if (env === 'watch') {
    // 监听文件
    const watchOptions = {
        ...config.baseConfig,
        output: config.outputs,
        include: resolve('src'),
        exclude: resolve('node_modules'),
        clearScreen: true,
    };
    const watcher = rollup.watch(watchOptions);

    watcher.on('event', event => {
        // event.code can be one of:
        //   START        — watcher 已启动
        //   BUNDLE_START — 正在创建 bundle
        //   BUNDLE_END   — 已创建 bundle
        //   END          — 已创建所有 bundles
        //   ERROR        — 打包时出错
        //   FATAL        — 发生不可恢复的错误
        console.log('eventcode: ', event.code);
    });
} else {
    // 编译文件
    (async () => {

        // 创建 bundle
        const bundle = await rollup.rollup({
            ...config.baseConfig,
        });

        // 生成 bundle
        config.outputs.forEach(async output => {
            await bundle.write(output);
        });

    })();
};

require('@babel/register');
const path = require('path');
const rollup = require('rollup');
const { writeFileSync } = require('fs');
const git = require('./build-git');
const packageJson = require('../package.json');
const resolve = p => path.resolve(__dirname, '../', p);
const env = process.env.npm_lifecycle_event;

let config;
// console.log(process.env.npm_config_argv.remain);

// 发布前的处理
async function prePublish() {
    config.outputs.forEach(item => {
        if (item.format === 'esm') {
            packageJson.module = item.file;
        } else if (item.format === 'umd') {
            packageJson.main = item.file;
        }
    });

    // 回写 package.json
    await writeFileSync(resolve('package.json'), JSON.stringify(packageJson, null, 4), err => {
        if (err) {
            console.log(err);
        }
    });

    // git commit -> git tag -> git push
    console.log('\n正在执行 git 命令...\n');
    git.init();
}

if (env === 'build' || env === 'prepare') {
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
        clearScreen: true
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
        const bundle = await rollup.rollup(config.baseConfig);

        // 生成文件队列
        const generQueue = [];
        // 生成 bundle
        function generator(output) {
            return new Promise(async (resolve, reject) => {
                await bundle.write(output);
                resolve();
            });
        }
        config.outputs.forEach(output => {
            generQueue.push(generator(output));
        });

        // 发布前的处理
        if (env === 'prepack') {
            Promise.all(generQueue)
                .then(() => {
                    prePublish();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    })();
}

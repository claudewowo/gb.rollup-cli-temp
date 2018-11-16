
const package = require('../package.json');

// 获取命令行中的参数
const argvs = JSON.parse(process.env.npm_config_argv);

const defaultConfigs = {
    name: package.name,         // 项目名称
    version: package.version,   // 版本号
    copyright: 'gb-fe',         // 版权所有
    external: [],               // 外部依赖
    entry: 'src/index.js',      // 入口 js, 目前只支持1个
    filename: '',               // 输出文件夹/文件名前缀
    uglify: true,               // build 时是否进行压缩
    extractcss: true,           // 提取出 css
    buildFiles: ['es'], // Array ['es', 'cjs', 'iife', ...]
    template: {
        use: false,              // 是否自动插入 html 用于测试
        source: 'src/template/index.html', // html 模版来源
        filename: 'index.html', // 输出文件名 (位于 dist 文件夹下)
        /* injectMode: {           // 插入到 html 中的文件名, 如果不指定则
            position: 0,        // 页面中 script 标签的位置, 0 表示 body 下第 0 个 script 位置, 如果在html里已经存在 script, 将会插入到这个 script 前面
            files: ['es'],
        }, */
    }
}

argvs.remain.forEach((arg) => {
    const param = arg.split('=');
    const key = param[0];
    let val = param[1];
    const isarr = /,/.test(val);
    if (isarr) {
        val = [...val.split(',')];
    }
    defaultConfigs[key] = val;
});

defaultConfigs.filename = `dist/${defaultConfigs.name}`;

module.exports = defaultConfigs;

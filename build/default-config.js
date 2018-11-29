/* eslint-disable */

import packageInfo from '../package.json';
import rconfig from '../.gbpackrc.json';
const argv = JSON.parse(process.env.npm_config_argv);
const { remain } = argv;
// console.log(remain);
const defaultOpts = {
    name: packageInfo.name.replace(/@gb\//, ''),
    version: packageInfo.version, // 版本号
    copyright: 'gb-fe',           // 版权所有
    external: [],                 // 外部依赖
    entry: 'src/index.js',        // 入口 js, 目前只支持1个
    filename: '',                 // 输出文件夹/文件名
    uglify: true,                 // build 时是否进行压缩
    extractcss: true,             // 是否提取 css
    output: ['esm'],              // Array ['esm', 'cjs', 'iife', ...]  命令行: esm,cjs,iife
    template: {
        use: true,                // 是否自动插入 html 用于测试
        source: 'src/template/index.html', // html 模版来源
        filename: 'index.html',   // 输出文件名 (位于 dist 文件夹下)
        /* injectMode: {          // 插入到 html 中的文件名, 如果不指定则
            position: 0,          // 页面中 script 标签的位置, 0 表示 body 下第 0 个 script 位置, 如果在html里已经存在 script, 将会插入到这个 script 前面
            files: ['esm'],
        }, */
    }
};

// 先合并rc配置
Object.entries(rconfig).forEach(([k, v]) => {
    if (v !== undefined && v !== '') {
        defaultOpts[k] = v;
    }
});

// 再合并命令行传入的参数
remain.forEach(arg => {
    const param = arg.split('=');
    const key = param[0];
    let val = param[1];
    if (val === 'false') {
        val = false;
    }
    const isarr = /,/.test(val);
    if (isarr) {
        val = [...val.split(',')];
    }
    defaultOpts[key] = val;
});

defaultOpts.filename = `dist/${defaultOpts.name}`;

export default defaultOpts;

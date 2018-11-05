export default {
    version : '0.0.1',          // 版本号
    copyright: 'gb-fe',         // 版权所有
    external: [],               // 外部依赖
    entry: 'src/index.js',      // 入口 js
    filename: 'dist/polyfill',  // 输出文件夹/文件名前缀
    uglify: true,               // build 时是否进行压缩
    template: {
        use: true,              // 是否自动插入 html 用于测试
        source: 'src/template/index.html', // html 模版来源
        filename: 'index.html', // 输出文件名 (位于 dist 文件夹下)
        injectFiles: [],        // 插入到 html 中的文件名, 如果不指定则
    }
}

### gb.rollup-cli-temp

> rollup 打包核心, 可用于脚手架打包模版

- 本地dev开发
- 根据 build/config.js 自动配置
- 支持 watch 编译
- build 生成多个版本

### 安装

```js
npm i gb.rollup-cli-temp -D
```

### 运行

```js
npm run dev
npm run build
```

### 其他

> dev 环境可以将生成的 js 自动引入到模版里, 方便测试
> 配置多条 buildFiles, 则会打包多份 js 到模版中, 建议测试时只写1个参数
> 目前还不支持样式提取

### 自定义配置

```js
// 1, 参数配置说明:
{
    version : '0.0.1',          // 版本号
    copyright: 'gb-fe',         // 版权所有
    external: [],               // 外部依赖
    entry: 'src/index.js',      // 入口 js, 目前只支持1个
    uglify: true,               // build 时是否进行压缩
    extractcss: true,           // 提取出 css
    buildFiles: ['es'], // Array ['es', 'cjs', 'iife', ...]
}

// 2, 只有dev支持直接在命令行中设置参数
// watch和build后续将支持脚手架设置参数
// dev 后可跟参数覆盖默认参数
npm run dev name=aaa extractcss=false buildFiles=es,cjs
```

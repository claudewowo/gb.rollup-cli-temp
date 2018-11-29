### @gb/rollup-cli-temp

> rollup 打包核心, 可用于脚手架打包模版

- 本地dev开发
- 根据 build/config.js 自动配置
- 支持 watch 编译
- build 生成多个版本

### 准备

请确保你有安装 nodejs 和 git, 此脚手架某些功能需要 git 来完成.

### 安装

```js
npm i nrm -g // 安装 nrm
nrm add fenpm http://fenpm.hqygou.com // 添加内部源
nrm use fenpm // 切换至内部源
npm i @gb/rollup-cli-temp -g
```

### 依赖

```js
npm install // npm i for short
```

### 运行

```js
npm run dev|watch // 开发环境
npm run build // 用于生产环境
```

### 其他

> dev 环境可以将生成的 js 自动引入到模版里, 方便测试
> 配置多条 output, 则会打包多份 js 到模版中, 建议测试时只写1个参数
> 目前还不支持样式提取

### 自定义配置文件 .gbpackrc.json

```js
// 1, 参数配置说明:
{
    copyright: 'gb-fe',         // 版权所有
    external: [],               // 外部依赖
    entry: 'src/index.js',      // 入口 js, 目前只支持1个
    uglify: true,               // build 时是否进行压缩
    extractcss: true,           // 提取出 css
    output: ['es'],             // Array ['es', 'cjs', 'iife', ...]  命令行: esm,cjs,iife
}

// 2, 支持直接在命令行中设置参数
npm run dev extractcss=false output=es,cjs
```

> 命令行优先级: 命令行 > .gbpackrc.json > 默认配置

## 发布

```js
npm publish
```

> 执行发布命令时会默认执行 build 和 git commit等操作.

### todo

- es5 无法 tree shaking提示
- 添加 chalk 等待图标
- 添加 TS 支持?

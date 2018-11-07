### @gb/rollup-cli-temp

> rollup 打包核心, 可用于脚手架打包模版

- 本地dev开发
- 根据 build/config.js 自动配置
- 支持 watch 编译
- build 生成多个版本

### 安装

```
npm i @gb/rollup-cli-temp -D
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

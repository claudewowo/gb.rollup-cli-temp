const path = require('path');
const rollup = require('rollup');
// const template = require('./plugins/rollup-plugin-template-html');
const baseConfig = require('./base.config');
const configs = require('./defaultConfigs.js');

const resolve = p => path.resolve(__dirname, '../', p);

if (configs.template.use) {
    baseConfig.plugins.push(
        template({
            template: resolve(configs.template.source),
            filename: configs.template.filename,
            injectMode: configs.template.injectMode,
        }),
    )
}

async function build() {

    // 创建 bundle
    const bundle = await rollup.rollup({
        input: baseConfig.input,
        plugins: baseConfig.plugins,
        external: baseConfig.external,
    });

    // 生成 bundle
    baseConfig.output.forEach(async output => {
        await bundle.write(output);
    });

}

build();

import path from 'path';
import template from './plugins/rollup-plugin-template-html';
import { baseConfig, outputs } from './rollup.config.base';
import configs from './default-config';

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

export {
    baseConfig,
    outputs,
};

import path from 'path';
import template from './plugins/rollup-plugin-template-html';
import { baseConfig } from './base.config';
import configs from './config.js';

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

export default baseConfig;

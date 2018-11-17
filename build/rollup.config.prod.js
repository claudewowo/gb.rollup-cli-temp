import configs from './default-config';
// import { uglify } from 'rollup-plugin-uglify';
import minify from './plugins/rollup-plugin-uglifyjs';
import { baseConfig, outputs } from './rollup.config.base';

if (configs.uglify) {
    baseConfig.plugins.push(
        minify(),
    );
}

export {
    baseConfig,
    outputs,
};

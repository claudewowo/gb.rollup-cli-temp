import configs from './config.js';
// import { uglify } from 'rollup-plugin-uglify';
import minify from './plugins/rollup-plugin-uglifyjs';
import { baseConfig } from './base.config';

if (configs.uglify) {
    baseConfig.plugins.push(
        minify(),
    );
}

export default baseConfig;

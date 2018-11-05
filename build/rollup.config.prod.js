import configs from './config.js';
import { uglify } from 'rollup-plugin-uglify';
import { baseConfig } from './base.config';

if (configs.uglify) {
    baseConfig.plugins.push(
        uglify(),
    );
}

export default baseConfig;

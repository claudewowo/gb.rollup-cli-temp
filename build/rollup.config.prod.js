import { uglify } from 'rollup-plugin-uglify';
import { baseConfig, version } from './base.config';

baseConfig.output.banner = `/* @license ${version} */\n`;

baseConfig.plugins.push(
    uglify(),
);

export default baseConfig;

import { uglify } from 'rollup-plugin-uglify';
import { baseConfig, version } from './base.config';

baseConfig.output.banner = `/* @license ${version} */\n`;
console.log(baseConfig.output);
baseConfig.plugins.push(
    uglify(),
);

export default baseConfig;

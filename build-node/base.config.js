const path = require('path');
const json = require('rollup-plugin-json');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const filesize = require('rollup-plugin-filesize');
const postcss = require('rollup-plugin-postcss');
// const html = require('rollup-plugin-fill-html');
const license = require('rollup-plugin-license');
const babel = require('rollup-plugin-babel');
const del = require('rollup-plugin-delete');
const configs = require('./defaultConfigs.js');

const resolve = p => path.resolve(__dirname, '../', p);

const env = process.env.npm_lifecycle_event;
const sourcemap = env === 'dev';

const buildTime = {
    init(format) {
        const now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        month < 10 ? month = `0${month}` : '';
        date < 10 ? date = `0${date}` : '';
        hour < 10 ? hour = `0${hour}` : '';
        minute < 10 ? minute = `0${minute}` : '';
        second < 10 ? second = `0${second}` : '';
        this.date = [year, '', month, '', date, '', hour, '', minute, '', second];

        return this.formatter(format);
    },

    formatter(format) {
        const split = format.split('');

        if (split.length === 0) {
            return this.date.join('');
        } else {
            for (let i = 0, length = split.length; i < length; i++) {
                if (split[i] === '0') {
                    this.date[i * 2 + 1] = '';
                } else {
                    this.date[i * 2 + 1] = split[i];
                }
            }
            return this.date.join('');
        }
    },

    version(format = '00_00') {
        return this.init(format);
    },

    copyright(format = '-- ::') {
        return this.init(format);
    }
}

const timeForCopyright = buildTime.copyright();
const fileFormat = `${configs.filename}.${env === 'build' ? 'min' : 'dev'}.`;
const banner = `@license ${configs.copyright} v${configs.version} ${timeForCopyright}\n`;
const outputs = [];

for (let index in configs.buildFiles) {
    const item = configs.buildFiles[index];
    outputs.push({
        format: item,
        file: `${fileFormat}${item}.js`,
        // banner,
        sourcemap,
    })
}

const baseConfig = {
    input: resolve(configs.entry),
    output: outputs,
    plugins: [
        del({ targets: ['dist/*'] }),
        json(),
        nodeResolve(),
        babel({
            exclude: 'node_modules/**',
        }),
        postcss({
            extract: configs.extractcss,
        }),
        commonjs(),
        filesize(),
        license({ banner }),
    ],
};

if (configs.external.length) {
    baseConfig.external = configs.external;
}

module.exports = baseConfig;

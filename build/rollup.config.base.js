import path from 'path';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';
// import html from 'rollup-plugin-fill-html';
import babel from 'rollup-plugin-babel';
import del from 'rollup-plugin-delete';
import license from 'rollup-plugin-license';
import configs from './default-config.js';

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

for (let index in configs.output) {
    const item = configs.output[index];
    outputs.push({
        format: item,
        file: `${fileFormat}${item}.js`,
        sourcemap,
    })
}

const baseConfig = {
    input: resolve(configs.entry),
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

export {
    baseConfig,
    outputs,
};

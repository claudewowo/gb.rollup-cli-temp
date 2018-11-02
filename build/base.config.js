import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const env = process.env.npm_lifecycle_event;

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

export const version = buildTime.version();

export const baseConfig = {
    input: 'src/lib/polyfill/polyfill.js',
    output: {
        format: 'iife',
        file: `dist/polyfill.${env}.js`,
        banner: `/* @license ${buildTime.copyright()} */\n`,
        sourcemap: env === 'dev',
    },
    plugins: [
        json(),
        resolve(),
        babel({
            exclude: 'node_modules/**',
        }),
        commonjs(),
    ],
}

// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
    plugins: [
        require('postcss-import')({
            // path: ['resources/assets/']
        }),
        require('postcss-nested'),
        require('postcss-color-function'),
        require('postcss-mixins'),
        require('postcss-extend'),
        require('postcss-cssnext'),
        require('postcss-preset-env'),
        require('cssnano')({
            sourcemap: true,
            autoprefixer: false,
            safe: true,
            discardComments: {
                removeAll: true,
            },
            discardUnused: false,
            zindex: false
        })
    ]
};

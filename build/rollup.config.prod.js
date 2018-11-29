import configs from './default-config';
import uglify from 'rollup-plugin-uglify-es';
import { baseConfig, outputs } from './rollup.config.base';

if (configs.uglify) {
    baseConfig.plugins.push(
        uglify({
            output: {
                comments: function(node, comment) {
                    if (comment.type === 'comment2') {
                        // multiline comment
                        return /@preserve|@license|@cc_on/i.test(comment.value);
                    }
                    return false;
                }
            }
        })
    );
}

export { baseConfig, outputs };

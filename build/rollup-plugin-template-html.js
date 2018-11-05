// import { statSync, readFileSync, writeFileSync, readdirSync, unlinkSync } from 'fs';

export default (opt = {}) => {
    const { template, filename, externals, inject, defaultmode } = opt;
    console.log(template, filename);
    return {
        name: 'template-html', // this name will show up in warnings and errors
        onwrite(config, data) {
            // writeFileSync();
        }
    };
};

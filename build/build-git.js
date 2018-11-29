const shell = require('shelljs');

module.exports = {
    init: () => {
        // git add -> git commit -> npm version patch -> npm publish
        shell.exec('git add .');
        shell.exec('git commit -m "build before publish"');
        shell.exec('npm version patch');
    }
};

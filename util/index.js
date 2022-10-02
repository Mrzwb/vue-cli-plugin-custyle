const path = require('path');
const fs = require('fs');
const pkg = require(path.resolve(process.cwd(),'package.json'));

exports.existDevDependence = (packageName) => {
  return pkg.devDependencies && pkg.devDependencies.hasOwnProperty(packageName);
}
exports.existingFile = (context, filePath) => {
    return fs.existsSync(path.posix.join(context, filePath));
}
exports.SCSS_CUSTYLE_PATH = '/src/libs/custyle.scss';
exports.LESS_CUSTYLE_PATH = '/src/libs/custyle.less';
exports.VUE_CONFIG_JS = 'vue.config.js';
const { existDevDependence, VUE_CONFIG_JS } = require('../util');
const fs = require('fs');
const { EOL } = require('os');
const POSTCSS_TYPE = [];

module.exports = (api, options = {}, rootOptions = {}) => {
    if (options.postCSS == 'pxtorem') {
      if(!existDevDependence("postcss-pxtorem")) {
        api.extendPackage({
          devDependencies : {
            "postcss-pxtorem": "^5.1.1"
          }
        });
      }
      api.render('./template', { type : options.postCSS });
      api.injectImports(api.entryFile, `import curem from './libs/curem'`);
      POSTCSS_TYPE.push(options.postCSS);
    }

    if (options.postCSS == 'pxtoviewport') { 
      if(!existDevDependence("postcss-px-to-viewport")) {
        api.extendPackage({
          devDependencies : {
            "postcss-px-to-viewport": "^1.1.1",
          }
        });
      }
      api.render({'postcss.config.js':'./template/postcss.config.js'}, { type : options.postCSS });
    }

    if (options.preprocessing) {
      const answers = options.preprocessing.slice();
      answers.forEach( item => {
        if ('scss' === item && !existDevDependence("sass-loader")) {
          api.extendPackage({
            // suport vue 2, but not vue 3
            devDependencies : {
              "node-sass": "^4.14.1",
              "sass-loader": "^8.0.2"
            }
          });
        }
        if ('less' === item && !existDevDependence("less-loader")) {
          api.extendPackage({
             // suport vue 2, but not vue 3
            devDependencies : {
              "less": "^3.11.3",
              "less-loader": "^6.2.0",
            }
          });
        }
        api.render(`./template-${item}`, {});
      });
    }
}

module.exports.hooks = (api) => {
  api.afterInvoke(() => {
    if (POSTCSS_TYPE.length > 0) {
      const contentMain = fs.readFileSync(api.resolve(api.entryFile), { encoding: 'utf-8' })
      const lines = contentMain.split(/\r?\n/g);
      const cuRemIndex = lines.findIndex(line => line.match(/curem/));
      lines[cuRemIndex] += `${EOL}curem();${EOL}`
      fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: 'utf-8' })
    }
  })
}
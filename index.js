const { existingFile, SCSS_CUSTYLE_PATH, LESS_CUSTYLE_PATH } = require('./util');
const loaderOptions = {};

module.exports = (api, options) => {
  if (existingFile(api.getCwd(), SCSS_CUSTYLE_PATH)) {
    loaderOptions.scss = {
      prependData: `@import "~@/libs/custyle.scss";`
    }
  }

  if (existingFile(api.getCwd(), LESS_CUSTYLE_PATH)) {
    loaderOptions.less = {
      prependData:`@import "~@/libs/custyle.less";`
      // globalVars: {
      //   hack: `true; @import "/src/libs/custyle.less";`,
      // }
    }
  }

  if (loaderOptions.scss || loaderOptions.less) {
    options.css.loaderOptions = Object.assign({}, options.css.loaderOptions, loaderOptions);
  }
  
}
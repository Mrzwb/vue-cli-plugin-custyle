const { chalk } = require('@vue/cli-shared-utils');
const path = require('path');
const pkg = require('./package.json');
const y18n = require('y18n')({
  directory: path.resolve('node_modules', pkg.name, './locales'),
  updateFiles: false
});

module.exports = pkg => {
    y18n.setLocale(pkg.locale || 'en');
    const prompts = [
        {
          name: 'preprocessing',
          message: `${chalk.yellow(y18n.__('preprocessing'))}`,
          type: 'checkbox',
          choices: [
            {
              name: 'Sass',
              value: 'scss',
              checked: true
            },
            {
              name: 'Less',
              value: 'less',
            }
          ]
        },
        {
          name: 'postCSS',
          message: `${chalk.yellow(y18n.__('postCSS'))}`,
          type: 'list',
          choices: [
            {
              name: chalk.blue('postcss-pxtorem'),
              value: 'pxtorem',
              checked: true
            },
            {
              name: chalk.blue('postcss-px-to-viewport'),
              value: 'postcss-px-to-viewport',
              value: 'pxtoviewport'
            },
            {
              name: chalk.blue('none'),
              value: 'none',
              value: 'none'
            }
          ]
        }     
    ];
    return prompts;
}
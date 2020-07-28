module.exports = (api, options) => {
  api.extendPackage((pkg) => {
    delete pkg.postcss
    delete pkg.browserslist
    return {
      name: options.name,
      description: options.description,
      author: options.author,
      scripts: {
        'serve': `cross-env NODE_ENV=development UNI_PLATFORM=h5 vue-cli-service uni-serve --mode development`,
        'dev': `cross-env NODE_ENV=development UNI_PLATFORM=${options.platform} vue-cli-service uni-build --mode development --watch`,
        'build': `cross-env NODE_ENV=production UNI_PLATFORM=${options.platform} vue-cli-service uni-build --mode production`,
        'lint': 'vue-cli-service lint',
        'upload': 'node uploader.js',
      },
      dependencies: {
        '@dcloudio/uni-h5': '^2.0.0-28220200724002',
        [`@dcloudio/uni-${options.platform}`]: '^2.0.0-28220200724002',
        '@mf2e/ant-wechat-sdk': '0.0.3',
        'flyio': '^0.6.14',
        'vue': '^2.6.11',
        'vuex': '^3.5.1',
      },
      devDependencies: {
        '@dcloudio/uni-cli-shared': '^2.0.0-28220200724002',
        '@dcloudio/uni-migration': '^2.0.0-28220200724002',
        '@dcloudio/uni-template-compiler': '^2.0.0-28220200724002',
        '@dcloudio/vue-cli-plugin-hbuilderx': '^2.0.0-28220200724002',
        '@dcloudio/vue-cli-plugin-uni': '^2.0.0-28220200724002',
        '@dcloudio/webpack-uni-mp-loader': '^2.0.0-28220200724002',
        '@dcloudio/webpack-uni-pages-loader': '^2.0.0-28220200724002',
        '@newap/uploader': '^2.2.16',
        '@vue/cli-plugin-babel': '^4.4.6',
        '@vue/cli-plugin-eslint': '^4.4.6',
        '@vue/cli-service': '^4.4.6',
        '@vue/eslint-config-prettier': '^6.0.0',
        'babel-eslint': '^10.1.0',
        'babel-plugin-import': '^1.13.0',
        'eslint': '^7.5.0',
        'eslint-plugin-prettier': '^3.1.4',
        'eslint-plugin-vue': '^6.2.2',
        'mocker-api': '^2.2.0',
        'postcss-autosize': '^1.0.2',
        'postcss-preset-env': '^6.7.0',
        'tinify-loader': '^1.0.0',
        'vue-template-compiler': '^2.6.11',
      },
      browserslist: ['> 1%', 'last 2 versions', 'Android >= 4.4', 'iOS >= 8'],
    }
  })

  api.render((files) => {
    Object.keys(files).forEach((name) => {
      delete files[name]
    })
  })

  api.render('./template')
}

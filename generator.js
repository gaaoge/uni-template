module.exports = (api, options) => {
  api.extendPackage((pkg) => {
    delete pkg.postcss
    delete pkg.browserslist
    return {
      name: options.name,
      description: options.description,
      author: options.author,
      scripts: {
        'serve': `cross-env NODE_ENV=development UNI_PLATFORM=${options.platform} vue-cli-service uni-build --mode development --watch & cross-env UNI_PLATFORM=h5 vue-cli-service uni-serve --mode development`,
        'build': `cross-env NODE_ENV=production UNI_PLATFORM=${options.platform} vue-cli-service uni-build --mode production --watch`,
        'lint': 'vue-cli-service lint',
        'upload': 'node uploader.js',
      },
      dependencies: {
        '@dcloudio/uni-h5': '^0.7.4',
        [`@dcloudio/uni-${options.platform}`]: '^0.0.969',
        '@mf2e/ant-wechat-sdk': '0.0.3',
        'core-js': '^3.6.5',
        'flyio': '^0.6.14',
        'vue': '^2.6.10',
        'vuex': '^3.0.1',
      },
      devDependencies: {
        '@dcloudio/uni-cli-shared': '^0.2.983',
        '@dcloudio/uni-template-compiler': '^0.9.181',
        '@dcloudio/vue-cli-plugin-uni': '^0.9.511',
        '@dcloudio/webpack-uni-mp-loader': '^0.3.639',
        '@dcloudio/webpack-uni-pages-loader': '^0.2.867',
        '@newap/uploader': '^2.2.15',
        '@vue/cli-plugin-babel': '^3.10.0',
        '@vue/cli-plugin-eslint': '^3.10.0',
        '@vue/cli-service': '^3.10.0',
        '@vue/eslint-config-prettier': '^5.0.0',
        'babel-eslint': '^10.0.2',
        'babel-plugin-import': '^1.12.0',
        'eslint': '^6.1.0',
        'eslint-plugin-vue': '^5.2.3',
        'eslint-plugin-prettier': '^3.1.0',
        'mocker-api': '^1.7.8',
        'postcss-autosize': '^1.0.1',
        'postcss-preset-env': '^6.7.0',
        'tinify-loader': '^0.2.4',
        'vue-template-compiler': '^2.6.10',
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

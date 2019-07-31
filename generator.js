module.exports = (api, options) => {
  api.extendPackage(pkg => {
    delete pkg.postcss
    delete pkg.browserslist
    return {
      name: options.name,
      description: options.description,
      author: options.author,
      scripts: {
        'dev': `cross-env NODE_ENV=development UNI_PLATFORM=${
          options.platform
        } vue-cli-service uni-build --watch`,
        'build': `cross-env NODE_ENV=production UNI_PLATFORM=${
          options.platform
        } vue-cli-service uni-build --watch`,
        'serve':
          'cross-env NODE_ENV=development UNI_PLATFORM=h5 vue-cli-service uni-serve',
        'lint': 'vue-cli-service lint'
      },
      dependencies: {
        '@dcloudio/uni-h5': '^0.7.3',
        [`@dcloudio/uni-${options.platform}`]: '^0.0.967',
        'flyio': '^0.6.14',
        'vue': '^2.6.10',
        'vuex': '^3.0.1'
      },
      devDependencies: {
        '@dcloudio/uni-cli-shared': '^0.2.973',
        '@dcloudio/uni-template-compiler': '^0.9.180',
        '@dcloudio/vue-cli-plugin-uni': '^0.9.500',
        '@dcloudio/webpack-uni-mp-loader': '^0.3.639',
        '@dcloudio/webpack-uni-pages-loader': '^0.2.856',
        '@vue/cli-plugin-babel': '^3.9.2',
        '@vue/cli-plugin-eslint': '^3.9.2',
        '@vue/cli-service': '^3.9.3',
        '@vue/eslint-config-prettier': '^5.0.0',
        'babel-eslint': '^10.0.2',
        'babel-plugin-import': '^1.12.0',
        'easeftp': '^2.0.40',
        'eslint': '^6.1.0',
        'eslint-plugin-vue': '^5.2.3',
        'eslint-plugin-prettier': '^3.1.0',
        'gulp': '^4.0.2',
        'mocker-api': '^1.7.6',
        'postcss-autosize': '^1.0.1',
        'postcss-preset-env': '^6.7.0',
        'tinify-loader': '^0.2.4',
        'vue-template-compiler': '^2.6.10'
      },
      browserslist: ['> 1%', 'last 2 versions', 'Android >= 4.4', 'iOS >= 8']
    }
  })

  api.render(files => {
    Object.keys(files).forEach(name => {
      delete files[name]
    })
  })

  api.render('./template')
}

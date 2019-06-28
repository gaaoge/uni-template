module.exports = (api, options) => {
  api.extendPackage(pkg => {
    delete pkg.postcss
    delete pkg.browserslist
    return {
      name: options.name,
      description: options.description,
      author: options.author,
      scripts: {
        'serve': 'npm run dev:h5',
        'build': 'npm run build:h5',
        'lint': 'vue-cli-service lint',
        'dev:h5':
          'cross-env NODE_ENV=development UNI_PLATFORM=h5 vue-cli-service uni-serve',
        'dev:mp-weixin':
          'cross-env NODE_ENV=development UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch',
        'dev:mp-alipay':
          'cross-env NODE_ENV=development UNI_PLATFORM=mp-alipay vue-cli-service uni-build --watch',
        'dev:mp-baidu':
          'cross-env NODE_ENV=development UNI_PLATFORM=mp-baidu vue-cli-service uni-build --watch',
        'dev:mp-toutiao':
          'cross-env NODE_ENV=development UNI_PLATFORM=mp-toutiao vue-cli-service uni-build --watch',
        'build:h5':
          'cross-env NODE_ENV=production UNI_PLATFORM=h5 vue-cli-service uni-build',
        'build:mp-weixin':
          'cross-env NODE_ENV=production UNI_PLATFORM=mp-weixin vue-cli-service uni-build',
        'build:mp-alipay':
          'cross-env NODE_ENV=production UNI_PLATFORM=mp-alipay vue-cli-service uni-build',
        'build:mp-baidu':
          'cross-env NODE_ENV=production UNI_PLATFORM=mp-baidu vue-cli-service uni-build',
        'build:mp-toutiao':
          'cross-env NODE_ENV=production UNI_PLATFORM=mp-toutiao vue-cli-service uni-build',
        'info':
          'node node_modules/@dcloudio/vue-cli-plugin-uni/commands/info.js'
      },
      dependencies: {
        '@dcloudio/uni-h5': '*',
        '@dcloudio/uni-mp-alipay': '*',
        '@dcloudio/uni-mp-baidu': '*',
        '@dcloudio/uni-mp-toutiao': '*',
        '@dcloudio/uni-mp-weixin': '*',
        'flyio': '^0.6.14',
        'vue': '^2.6.10',
        'vuex': '^3.0.1'
      },
      devDependencies: {
        '@dcloudio/uni-cli-shared': '*',
        '@dcloudio/uni-template-compiler': '*',
        '@dcloudio/vue-cli-plugin-uni': '*',
        '@dcloudio/webpack-uni-mp-loader': '*',
        '@dcloudio/webpack-uni-pages-loader': '*',
        '@vue/cli-plugin-babel': '^3.8.0',
        '@vue/cli-plugin-eslint': '^3.8.0',
        '@vue/cli-service': '^3.8.0',
        '@vue/eslint-config-prettier': '^4.0.1',
        'babel-eslint': '^10.0.1',
        'babel-plugin-import': '^1.11.2',
        'easeftp': '^2.0.40',
        'eslint': '^5.16.0',
        'eslint-plugin-vue': '^5.2.2',
        'gulp': '^4.0.2',
        'mocker-api': '^1.7.6',
        'postcss-autosize': '^1.0.1',
        'postcss-preset-env': '^6.5.0',
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

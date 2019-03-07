const path = require('path')
const apiMocker = require('mocker-api')

module.exports = {
  configureWebpack: {
    devServer: {
      before (app) {
        apiMocker(app, path.resolve('./mock/index.js'))
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g)(\?.*)?$/)
      .use('tinify-loader')
      .loader('tinify-loader')
      .tap(() => {
        return {
          apikey: 'ai3NQ23wq2pbQvy2JNylfuQMNJ99YAOZ',
          cache: path.resolve('node_modules/.cache/tinify-loader')
        }
      })

    config.module
      .rule('svg')
      .test(/\.(svg|gif|webp)(\?.*)?$/)
  }
}

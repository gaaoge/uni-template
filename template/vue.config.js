const pkg = require('./package.json')
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

    let rules = ['images', 'svg', 'media', 'fonts']
    rules.forEach(rule => {
      config.module
        .rule(rule)
        .use(rule === 'svg' ? 'file-loader' : 'url-loader')
        .tap(options => {
          let publicPath = process.env.NODE_ENV === 'production' ?
            `//static.ws.126.net/163/activity/${pkg.name}/` : 'http://localhost:8080/'
          options.publicPath = publicPath
          return options
        })
    })
  }
}

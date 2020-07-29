const path = require('path')
const apiMocker = require('mocker-api')

module.exports = {
  configureWebpack: {
    devServer: {
      before(app) {
        apiMocker(app, path.resolve('./mock/index.js'))
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g)(\?.*)?$/)
      .use('tinify-loader')
      .loader('tinify-loader')
      .tap(() => {
        return {
          apikey: 'ai3NQ23wq2pbQvy2JNylfuQMNJ99YAOZ',
          cache: path.resolve('node_modules/.loader-cache/tinify-loader'),
        }
      })

    config.module
      .rule('svg')
      .test(/\.(svg|gif|webp)(\?.*)?$/)
      .use('file-loader')
      .tap(() => {
        return {
          name: 'cdn/images/[name].[hash:8].[ext]',
          publicPath: process.env.VUE_APP_PUBLIC_PATH,
        }
      })

    let rules = ['images', 'media', 'fonts']
    rules.forEach((rule) => {
      config.module
        .rule(rule)
        .use('url-loader')
        .tap(() => {
          return {
            limit: 4096,
            fallback: {
              loader: 'file-loader',
              options: {
                name: `cdn/${rule}/[name].[hash:8].[ext]`,
                publicPath: process.env.VUE_APP_PUBLIC_PATH,
              },
            },
          }
        })
    })
  },
}

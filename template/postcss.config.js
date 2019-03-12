const presetEnv = require('postcss-preset-env')
const autoSize = require('postcss-autosize')
const uniPlugin = require('@dcloudio/vue-cli-plugin-uni/packages/postcss')

module.exports = {
  plugins: [
    presetEnv({
      stage: 0
    }),
    autoSize(),
    uniPlugin()
  ]
}

const presetEnv = require('postcss-preset-env')
const uniPlugin = require('@dcloudio/vue-cli-plugin-uni/packages/postcss')

module.exports = {
  plugins: [
    presetEnv({
      stage: 0
    }),
    uniPlugin()
  ]
}

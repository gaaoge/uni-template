const fs = require('fs')
const path = require('path')

function findFiles(rootPath, replacePath = '') {
  let result = []

  function finder(tempPath) {
    let files = fs.readdirSync(tempPath)
    files.forEach(val => {
      let fPath = path.posix.join(tempPath, val)
      let stats = fs.statSync(fPath)

      if (stats.isDirectory()) {
        finder(fPath)
      } else if (stats.isFile()) {
        result.push(fPath.replace(rootPath, replacePath))
      }
    })
  }

  finder(rootPath)
  return result
}

const files = findFiles(`mock`)
const proxy = {}

files.forEach(file => {
  if (file === '/index.js') return

  let path = file.replace('.json', '')
  proxy[`${path}`] = require(`.${file}`)
})

module.exports = proxy

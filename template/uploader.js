const pkg = require('./package.json')
const fs = require('fs')
const del = require('del')
const path = require('path')
const Uploader = require('@newap/uploader')

const cacheDir = path.resolve('node_modules/.loader-cache/uploader/')

function findFiles(rootPath, replacePath = '') {
  let result = []

  function finder(tempPath) {
    let files = fs.readdirSync(tempPath)
    files.forEach((val) => {
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

async function uploadCDN() {
  let filesPath = `dist/build/${process.env.UNI_PLATFORM}/cdn/`
  if (!fs.existsSync(filesPath)) return

  let allFiles = findFiles(filesPath)
  let cachePath = `${cacheDir}/cache-${process.env.UNI_PLATFORM}.json`
  if (fs.existsSync(cachePath)) {
    cacheFiles = JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
  }

  await new Uploader({
    dir: filesPath,
    target: `frontend/uniapp/${pkg.name}/cdn`,
    exclude: cacheFiles.map((item) => new RegExp(path.basename(item))),
  }).run()

  if (!fs.existsSync(cacheDir)) {
    cacheDir.split('/').reduce((current, next) => {
      const full = path.resolve(current, next)
      if (!fs.existsSync(full)) {
        fs.mkdirSync(full)
      }
      return full
    }, '/')
  }
  fs.writeFileSync(cachePath, JSON.stringify(allFiles))
  del(filesPath)
}

uploadCDN()

const pkg = require('./package.json')
const fs = require('fs')
const del = require('del')
const path = require('path')
const easeftp = require('easeftp/upload')
const ftppass = JSON.parse(fs.readFileSync('.ftppass', 'utf-8'))

const cacheDir = path.resolve('node_modules/.cache/easeftp/')

function findFiles (rootPath, replacePath = '') {
  let result = []

  function finder (tempPath) {
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

function uploadStatic (platform) {
  let staticPath = `dist/build/${platform}/static/`
  let allFiles = findFiles(staticPath, 'static/')

  let cacheFiles = []
  let cachePath = `${cacheDir}/cache-${platform}.json`
  if (fs.existsSync(cachePath)) {
    cacheFiles = JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
  }

  let newFiles = allFiles.filter(item => cacheFiles.indexOf(item) === -1)

  return easeftp.addFile(newFiles, {
    debug: true,
    ...ftppass,
    path: 'activity/' + pkg.name,
    cwd: path.resolve(`dist/build/${platform}/`)
  }).then(() => {
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
    del(staticPath)
  })
}

function uploadHtml (dir) {
  return easeftp.addFile(['index.html'], {
    debug: true,
    ...ftppass,
    path: `${dir}/activity/${pkg.name}`,
    cwd: path.resolve('dist/build/h5')
  })
}

exports['test:h5'] = async function () {
  await uploadStatic('h5')
  await uploadHtml('test')
}

exports['publish:h5'] = async function () {
  await uploadStatic('h5')
  await uploadHtml('html')
}

exports['publish:mp-weixin'] = async function () {
  await uploadStatic('mp-weixin')
}

exports['publish:mp-alipay'] = async function () {
  await uploadStatic('mp-alipay')
}

exports['publish:mp-baidu'] = async function () {
  await uploadStatic('mp-baidu')
}

exports['publish:mp-toutiao'] = async function () {
  await uploadStatic('mp-toutiao')
}

exports['clear'] = function () {
  return del([cacheDir])
}

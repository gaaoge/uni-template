/**
 * Created by GG on 2018/1/9.
 */

// 格式化时间
function formatDate(dateInput, format) {
  let date = new Date(dateInput)

  let o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S+': date.getMilliseconds(), // millisecond
  }

  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return format
}

// 获取static目录文件的实际路径
function getStaticPath(path) {
  return process.env.VUE_APP_PUBLIC_PATH + '/static/' + path
}

// 异步执行函数，等待上一次执行完成后才能进行下次的执行
let asyncKeys = {}
async function asyncExec(func, key) {
  if (asyncKeys[key]) return

  asyncKeys[key] = true
  try {
    await func()
    delete asyncKeys[key]
  } catch (e) {
    delete asyncKeys[key]
    throw e
  }
}

// 异步等待函数
async function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export { formatDate, getStaticPath, asyncExec, sleep }

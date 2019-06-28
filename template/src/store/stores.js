import home from '@/pages/home/store'

const DIALOG_CONFIG = 'DIALOG_CONFIG'

const stores = {
  modules: {
    home
  },
  state: {
    dialogConfig: {}
  },
  mutations: {
    [DIALOG_CONFIG](state, payload) {
      state.dialogConfig = payload
    }
  },
  actions: {
    /**
     * 打开弹窗
     * @param {String|Object} payload 支持字符串或者对象参数
     *  String参数：弹窗名称
     *  Object参数：{
     *    dialog: 弹窗名称
     *    isScroll: 弹窗是否可滚动
     *    isForce: 弹窗是否强制展示（点击弹窗周围空白处不可关闭）
     *    params: 其他弹窗参数
     *  }
     */
    openDialog({ state, commit }, payload) {
      let config = Object.assign({}, state.dialogConfig, {
        [payload.dialog || payload]: payload
      })
      commit(DIALOG_CONFIG, config)
    },
    /**
     * 关闭弹窗
     * @param {String|Object} payload 支持字符串或者对象参数
     *  String参数：弹窗名称
     *  Object参数：{
     *    dialog: 弹窗名称
     *  }
     */
    closeDialog({ state, commit }, payload) {
      let config = Object.assign({}, state.dialogConfig, {
        [payload.dialog || payload]: null
      })
      commit(DIALOG_CONFIG, config)
    },
    /**
     * 发送fetch请求
     * @param {Object}
     *  {
     *    url: 请求url,
     *    method: 请求方法（默认get）
     *    header: 请求头
     *    params: 请求参数
     *  }
     */
    async fetch(context, { url, method = 'get', header, params }) {
      url = process.env.VUE_APP_HOST + url
      if (method.toLowerCase() === 'post') {
        header = Object.assign({}, header, {
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      }

      let data
      try {
        data = await new Promise((resolve, reject) => {
          uni.request({
            url,
            method,
            header,
            data: params,
            success({ statusCode, data }) {
              if (statusCode === 200) {
                resolve(data)
              } else {
                reject(new Error('网络请求出错'))
              }
            },
            fail() {
              reject(new Error('网络请求出错'))
            }
          })
        })
      } catch (e) {
        uni.showToast({
          title: e.message,
          icon: 'none'
        })
        throw e
      }

      // 处理错误返回结果
      if (data.code !== 10000) {
        switch (data.code) {
          default:
            uni.showToast({
              title: data.msg,
              icon: 'none'
            })
            break
        }
        let err = new Error(data.msg)
        err.code = data.code
        throw err
      }

      return data.data
    }
  }
}

export default stores

import modules from './modules'

const stores = {
  modules,
  actions: {
    /**
     * 发送fetch请求
     * @param {Object} payload
     *  {
     *    url: 请求url,
     *    method: 请求方法（默认get）
     *    params: 请求参数
     *  }
     */
    async fetch(context, payload = {}) {
      let { url, method = 'get', params } = payload

      // 配置url和method
      url = process.env.VUE_APP_BASE_URL + url
      method = method.toLowerCase()

      // 配置headers
      let headers
      if (method === 'post') {
        headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
      }

      // 发送请求
      let data
      try {
        data = await new Promise((resolve, reject) => {
          uni.request({
            url,
            method,
            header: headers,
            data: params,
            success({ statusCode, data }) {
              if (statusCode === 200) {
                resolve(data)
              } else {
                reject()
              }
            },
            fail() {
              reject()
            }
          })
        })
      } catch (e) {
        throw new Error('网络请求错误')
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

        let err = new Error('网络请求错误:' + data.msg)
        err.code = data.code
        throw err
      }

      return data.data
    }
  }
}

export default stores

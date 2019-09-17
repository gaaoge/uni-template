const DIALOG_CONFIG = 'DIALOG_CONFIG'

const stores = {
  namespaced: true,
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
     * 清除弹窗
     */
    clearDialog({ commit }) {
      commit(DIALOG_CONFIG, {})
    }
  }
}

export default stores

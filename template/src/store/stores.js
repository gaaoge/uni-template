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
    [DIALOG_CONFIG] (state, payload) {
      state.dialogConfig = payload
    }
  },
  actions: {
    openDialog ({ state: { dialogConfig }, commit }, payload) {
      let config = Object.assign({}, dialogConfig, {
        [payload.dialog || payload]: payload.config || true
      })
      commit(DIALOG_CONFIG, config)
    },
    closeDialog ({ state: { dialogConfig }, commit }, payload) {
      let config = Object.assign({}, dialogConfig, {
        [payload.dialog || payload]: false
      })
      commit(DIALOG_CONFIG, config)
    },
  }
}

export default stores

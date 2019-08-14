import ant from '@mf2e/ant-wechat-sdk'

function trackInit() {
  ant.init({
    app_id: process.env.VUE_APP_APP_ID,
    project_id: process.env.VUE_APP_PROJECT_ID
  })
}

function trackPage() {
  ant.stat()
}

function trackEvent(event, info) {
  ant.stat({
    val_act: event,
    info
  })
  // #ifdef MP-WEIXIN
  wx.reportAnalytics(event, info)
  // #endif
}

export { trackInit, trackPage, trackEvent }

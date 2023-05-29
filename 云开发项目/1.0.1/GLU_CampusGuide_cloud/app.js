// app.js
App({
  onLaunch() {
    wx.cloud.init({
        env: 'gluguide-0g65cvsv649006da' // 云开发id
    })  
  },
  globalData: {
    userInfo: null
  }
})

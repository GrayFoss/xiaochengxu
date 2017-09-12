//app.js
App({
  globalData: {
    userInfo: null,
    code: '',
    key: ''
  },
  onLaunch: function () {
    var that = this
    wx.login({
      success: function (res) {
        that.globalData.code = res.code;
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: true,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  }
})  
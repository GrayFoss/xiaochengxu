//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  getInfo: function () {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
      }
    })
  },
  getPhoneNumber: function (data) {
    var info = data.detail;
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.request({
          url: 'https://wecareroom.com/api/stpaul/user/wxAppLogin',
          method: 'POST',
          data: {
            code: code,
            encryptedData: info.encryptedData,
            iv: info.iv
          },
          success: function (e) {
            if (e.data && e.data.status.error === 0) {
              console.log("登陆成功!");
              wx.setStorage({
                key: "sessionKey",
                data: e.data.result
              })
              wx.reLaunch({
                url: '../index/index',
              })

            } else {
            }
          },
          fail: function (e) {
          }
        })
      }
    })
  },
  getUserInfo: function (data) {
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.getStorage({
      key: 'sessionKey',
      success: function (res) {
        var key = res.data;
        wx.request({
          url: 'https://wecareroom.com/api/stpaul/user/getWxAppLoginStatus',
          method: 'GET',
          data: {
            key: key
          },
          success: function (e) {
            console.log(e);
            if (e.data.status.error === 0) {
              wx.showLoading({
                title: '自动登陆中...',
              })
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/index/index',
                })
                wx.hideLoading()
              }, 1500)
            } else {
              wx.showToast({
                title: '验证登陆状态失败',
                duration: 1000
              })
              console.log("验证登陆状态失败");
            }
          },
        })
      }
    })
  }
})

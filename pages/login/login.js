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
    var code = app.globalData.code;
    wx.request({
      url: 'https://wecareroom.com/api/stpaul/user/wxAppLogin',
      method: 'POST',
      data: {
        code: code, 
        encryptedData: info.encryptedData, 
        iv: info.iv
      },
      success: function(e){
        console.log(e)
        if (e.data && e.data.status.error  === 0){
          app.globalData.key =  e.data.result
          wx.reLaunch({
            url: '../index/index',
          })
    
        }else {
          console.log("登陆失败!");
        }
      },
      fail: function(e){
      }
    })
  },
  getUserInfo: function (data) {
    // console.log(data);
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
  }
})

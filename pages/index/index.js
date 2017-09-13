//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ownMoney: '加载ing',
    reward: 1,
    isRecieved: false,
    word: '领取奖励'
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 验证登陆状态 并获取数据
    var that = this
    wx.request({
      url: 'https://wecareroom.com/api/stpaul/user/getWxAppLoginStatus',
      method: 'POST',
      data: {
        key: app.globalData.key
      },
      success: function (e) {
        console.log(e)
        if (e.data.status.error === 0) {
          that.setData({
            user: e.data.result
          })
          console.log(that.data.user)
        } else {
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      },
    })
  },
  // 领取签到奖励
  key: function (e){
    console.log(1);
    let that = this;
    wx.request({
      url: 'https://wecareroom.com/api/stpaul/user/getWxAppLoginStatus',
      method: 'GET',
      data: {
        key: app.globalData.key
      },
      success: function (e) {
        console.log(e);
        if (e.data.status.error === 0) {
          console.log("验证登陆状态成功");
          wx.request({
            url: 'https://wecareroom.com/api/stpaul/user/checkIn',
            data: {
              key: app.globalData.key
            },
            method: 'POST',
            success: (res) => {
              if (res.data.status.error === 0) {
                wx.request({
                  url: 'https://wecareroom.com/api/stpaul/user/getWxAppLoginStatus',
                  method: 'GET',
                  data: {
                    key: app.globalData.key
                  },
                  success: function (e) {
                    if (e.data.status.error === 0) {
                      that.setData({
                        user: e.data.result
                      })
                    } else {
                      wx.reLaunch({
                        url: 'pages/login/login',
                      })
                    }
                  },
                })
              }
            }
          })
        } else {
          console.log("验证登陆状态失败");
          wx.reLaunch({
            url: 'pages/login/login',
          })
        }
      },
    })
    
   
    
  },
  gotoEarn: function() {
    wx.navigateTo({
      url: './earn/earn',
    })
  },
  gotoRecharge: function () {
    wx.navigateTo({
      url: './recharge/recharge',
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

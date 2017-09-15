//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    animationDay: {},
    animationData: {},
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
    } else if (this.data.canIUse) {
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
    wx.getStorage({
      key: 'sessionKey',
      success: function (res) {
        let key = res.data;
        wx.request({
          url: 'https://wecareroom.com/api/stpaul/user/getWxAppLoginStatus',
          method: 'GET',
          data: {
            key: key
          },
          success: function (e) {
            if ( e.data && e.data.status &&e.data.status.error === 0) {
              that.setData({
                user: e.data.result
              })
            } else {
              wx.showLoading({
                title: '您尚未登陆...',
              })
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/login/login',
                })
                wx.hideLoading()
              }, 1500)
            }
          },
        })
      }
    })
  },
  // 领取签到奖励
  key: function (e) {
    let that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
    })
    this.animation = animation
    animation.opacity(1).translateY(-40).step()
    animation.opacity(0).step()
    wx.getStorage({
      key: 'sessionKey',
      success: function (res) {
        let key = res.data;
        wx.request({
          url: 'https://wecareroom.com/api/stpaul/user/getWxAppLoginStatus',
          method: 'GET',
          data: {
            key: key
          },
          success: function (e) {
            if (e.data.status.error === 0) { 
              wx.getStorage({
                key: 'sessionKey',
                success: function (res) {
                  let key = res.data;
                  wx.request({
                    url: 'https://wecareroom.com/api/stpaul/user/checkIn',
                    data: {
                      key: key
                    },
                    method: 'GET',
                    success: (res) => {
                      if (res.data.status.error === 0) {
                        wx.request({
                          url: 'https://wecareroom.com/api/stpaul/user/getWxAppLoginStatus',
                          method: 'GET',
                          data: {
                            key: key
                          },
                          success: function (e) {
                            if (e.data.status.error === 0) {
                              that.setData({
                                user: e.data.result,
                                animationDay: animation.export()
                              })
                            } else {
                              wx.reLaunch({
                                url: 'pages/login/login',
                              })
                            }
                          },
                        })
                      }else{
                        wx.showToast({
                          icon: "loading",
                          title: "签到失败"
                        })
                      }
                    }
                  })
                }
              })
            } else {
              wx.reLaunch({
                url: 'pages/login/login',
              })
            }
          },
        })
      }
    })
  },
  onShow: function () {
   
  },
  gotoEarn: function () {
    wx.navigateTo({
      url: './earn/earn',
    })
  },
  gotoRecharge: function () {
    wx.navigateTo({
      url: './recharge/recharge',
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
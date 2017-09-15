// pages/product/recharge.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    paymoney: 1,
    detail: '标准套餐',
    cost: [
       { price:3000,
         detail: '充值云豆',
         show: '30云豆',
         isChecked: true
       },
       {
         price: 10000,
         detail: '充值云豆',
         show: '100云豆',
         isChecked: false
       },
       {
         price: 30000,
         detail: '充值云豆',
         show: '300云豆',
         isChecked: false
       },
       {
         price: 50000,
         detail: '充值云豆',
         show: '500云豆',
         isChecked: false
       }
      ,
       {
         price: 60000,
         detail: '标准套餐',
         show: '标准套餐',
         isChecked: false
       }],
    items: [
      { name: 'agree', value: '同意', checked: 'true' }
    ],
    agree: true
  },
  recharge: function(){
    console.log("paymoney:", this.data.paymoney);
    var that = this;
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
              console.log("验证登陆状态成功");
              wx.login({
                success: function (res) {
                  var myCode = res.code;
                  wx.request({
                    url: 'https://wecareroom.com/api/stpaul/payment/createWxAppPay',
                    method: 'post',
                    data: {
                      balance: that.data.paymoney,
                      key: key,
                      body: that.data.detail,
                      code: myCode
                    },
                    success: function (e) {
                      console.log(e);
                      var message = e.data.result;
                      wx.requestPayment(
                        {
                          'timeStamp': message.timeStamp,
                          'nonceStr': message.nonceStr,
                          'package': message.package,
                          'signType':  'MD5',
                          'paySign': message.paySign,
                          'success': function (res) { 
                            console.log("支付成功")
                            console.log(res)
                          },
                          'fail': function (res) { 
                            console.log("支付失败")
                            console.log(res)
                          },
                          'complete': function (res) { }
                        })
                    }, fail: function () {

                    }, complete: function () {
                    }
                  })
                }
              })
            } else {
              //提示登陆状态失效，1S后跳转至登陆页
              wx.showToast({
                title: '验证登陆状态失败',
                duration: 1000
              })
              setTimeout(
                function(){
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
                },1000)
            }
          },
        })
      }
    })
  },
  choosePay: function(e){
    let money = e.currentTarget.dataset.money
    let detail = e.currentTarget.dataset.detail
    let that = this
    this.data.cost.forEach( cost => {
      cost.isChecked = false
      if(cost.price === money){
        cost.isChecked = true
      }
    } )
    this.setData({
      paymoney: money,
      cost: this.data.cost,
      detail: detail
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
        agree: !this.data.agree
    })
  },
  gotoProtocol: function(){
    wx.navigateTo({
      url: '../protocol/protocol',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
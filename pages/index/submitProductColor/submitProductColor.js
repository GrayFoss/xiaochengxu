// pages/geren/submitScene/submitScene.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    codeInputVal: '',
    text: '',
    showCodeSearch: true,
    codeSearchWord:['a','b','c','d','a3'],
    codeInitWord: ['a', 'b', 'c', 'd', 'a3']
  },
  // 输入地板Code
  codeInputTyping: function (e) {
    var input = e.detail.value + '';
    var searched = this.data.codeInitWord.filter(item => item.indexOf(input) !== -1)
    this.setData({
      codeInputVal: e.detail.value,
      codeSearchWord: searched,
      showCodeSearch: true
    });
  },
  //输入描述
  inputDesc: function(e){
    this.setData({
      text: e.detail.value,
    });
  },
  // 选择地板Code
  codeSelectItem: function (e) {
    var chooseValue = e.currentTarget.dataset.choosecode;
    this.setData({
      codeInputVal: chooseValue,
      showCodeSearch: false
    });
  },
  // 提交地板
  submitProduct: function() {
    var code = this.data.codeInputVal;
    var text = this.data.text;
    var that = this
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
            if (e.data.status.error === 0) {
              if (code && text) {
                wx.getStorage({
                  key: 'sessionKey',
                  success: function (res) {
                    var key = res.data;
                    wx.request({
                      url: 'https://wecareroom.com/api/stpaul/debug/submitProductDebug',
                      data: {
                        type: 'productColor',
                        productCode: code,
                        content: text,
                        key: key
                      },
                      method: 'POST',
                      success: (res) => {
                        wx.showToast({
                          title: '提交成功',
                          icon: 'success'
                        })
                        setTimeout(function () {
                          wx.navigateBack({
                            delta: 1
                          })
                        }, 1500)
                      }
                    })
                  }
                })
              }
              else {
                wx.showModal({
                  title: '信息填写不完整',
                  content: '请填写完整的反馈信息',
                  confirmText: '继续填写',
                  success: (res) => {
                    if (res.confirm) {
                      console.log(res);
                    } else {
                      console.log(res);
                    }
                  }
                })
              }
            } else {
              wx.reLaunch({
                url: '/pages/login/login',
              })
            }
          },
        })
      }
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
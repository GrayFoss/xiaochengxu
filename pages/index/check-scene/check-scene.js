// pages/index/submit/submit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: [
      { "name": "已提交", seleClass: "seleClass"},
      { "name": "审核通过", seleClass: "" },
    ],
    seleClass: { "name": "已提交", seleClass: "seleClass" },
    listAll: [],
    listShow: []
  },
  seleSubmit: function (e) {
    this.data.header.forEach(res => {
      res.seleClass = "";
      if (res.name === e.currentTarget.dataset.hi.name) {
        res.seleClass = 'seleClass';
      }
    })
   
    this.setData({
      header: this.data.header,
      seleClass: e.currentTarget.dataset.hi
    })
    let xx;
    if (this.data.seleClass.name === "审核通过") {
      xx = this.data.listAll.filter(response => {
        return response.state === "approved";
      })
    }else{
      xx = this.data.listAll.filter(response => {
        return response.state === "approving" || response.state === "denied";
      })
    }
    this.setData({
      listShow: xx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'sessionKey',
      success: function (res) {
        let key = res.data;
        wx.request({
          url: 'https://wecareroom.com/api/stpaul/debug/listInstallPicture', //仅为示例，并非真实的接口地址
          data: {
            key: key,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            let list = res.data.result.filter(response => {
              return response.state === "approving";
            })
            console.log(res.data.result)
            that.setData({
              listAll: res.data.result,
              listShow: list
            })
          }
        })
      }
    })
  },
  gotoScene: function(){
    wx.navigateTo({
      url: './../submitScene/submitScene',
    })
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
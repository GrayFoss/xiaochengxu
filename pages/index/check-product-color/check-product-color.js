// pages/index/submit/submit.js
const app = getApp();
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
    productList: []
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
    console.log(this.data.seleClass.name)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.request({
      url: 'https://wecareroom.com/api/stpaul/debug/listRecords',
      data: {
        type: 'productColor',
        key: app.globalData.key
      },

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        const arrayList = res.data.result.filter(response => {
          return response.state === null;
        })
        that.setData({
          productList: res.data.result,
          showProductList: arrayList
        })
        console.log(that.data.productList.length)
      }
    })
  },
  gotoColor: function() {
    wx.navigateTo({
      url: './../submitProductColor/submitProductColor',
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
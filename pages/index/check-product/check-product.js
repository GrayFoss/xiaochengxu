// pages/index/submit/submit.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    header: [
      { "name": "已提交", seleClass: "seleClass", state: "unapproved" },
      { "name": "审核通过", seleClass: "", state: "approved" },
    ],
    seleClass: { "name": "已提交", seleClass: "seleClass" },
    productList: [],
    showProductList: []
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
      seleClass: e.currentTarget.dataset.hi,
    })
    let arrayList;
    if (this.data.seleClass.name === "审核通过") {
      arrayList = this.data.productList.filter(response => {
        return response.state === 'approved';
      })
    } else {
      arrayList = this.data.productList.filter(response => {
        return response.state !== 'approved';
      })
    }
    this.setData({
      showProductList: arrayList
    })
    // console.log(this.data.showProductList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: 'sessionKey',
      success: function (res) {
        var key = res.data;
        wx.request({
          url: 'https://wecareroom.com/api/stpaul/debug/listRecords',
          data: {
            type: 'productDebug',
            key: key
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            let arrayList;
            if (res.data.result.length > 0) {
              arrayList = res.data.result.filter(response => {
                return response.state !== 'approved';
              })
            } else {
              arrayList = [];
            }
            that.setData({
              productList: res.data.result,
              showProductList: arrayList
            })
          }
        })
      }
    })
  },
  gotoColor: function () {
    wx.navigateTo({
      url: './../submitProduct/submitProduct',
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
    const that = this;
    wx.getStorage({
      key: 'sessionKey',
      success: function (res) {
        var key = res.data;
        wx.request({
          url: 'https://wecareroom.com/api/stpaul/debug/listRecords',
          data: {
            type: 'productDebug',
            key: key
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            let arrayList;
            if (res.data.result.length > 0) {
              arrayList = res.data.result.filter(response => {
                return response.state !== 'approved';
              })
            } else {
              arrayList = [];
            }
            that.setData({
              productList: res.data.result,
              showProductList: arrayList
            })
            // console.log(that.data.showProductList.length)
          }
        })
      }
    })
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
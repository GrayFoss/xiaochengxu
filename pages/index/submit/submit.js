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
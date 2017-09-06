// pages/index/earn/earn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submit_data: [
      { title: '提交安装实景图', backgroundColor: '#ff6262', nav: './../check-scene/check-scene'},
      { title: '提交有色差的产品', backgroundColor: '#6bcb70', nav: './../check-product-color/check-product-color' },
      { title: '提交信息缺失的产品', backgroundColor: '#f59b57', nav: './../check-product/check-product' },
    ],
    wh: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          wh: res.windowHeight
        })
      }
    })
  },
  gotoScene: function(e){
    console.log(e);
    wx.navigateTo({
      url: `${e.currentTarget.dataset.url.nav}`,
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
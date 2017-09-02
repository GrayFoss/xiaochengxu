// pages/shijing/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wh: 0,
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.maxlengt)
    console.log(options.title)
    let maxLenght = options.maxlengt || 8;
    let name = options.title || '7286';
    let data = new Array(maxLenght);
    for (let x = 0; x < maxLenght; x++) {
      data[x] = { "floorName": name, "current": `${x+1}/${maxLenght}`, "url": `${x+1}`}
    }
    this.setData({
      imgUrls: data
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          wh: res.windowHeight
        })
      }
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
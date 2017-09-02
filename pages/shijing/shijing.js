var app = getApp()
Page({
  data: {
    noteAll: [
      {
        "title": "7286",
        "maxLenght": 10
      },
      {
        "title": "7881",
        "maxLenght": 5
      },
      {
        "title": "8746",
        "maxLenght": 9
      },
      {
        "title": "9061",
        "maxLenght": 9
      },
      {
        "title": "9332",
        "maxLenght": 5
      },
      {
        "title": "A28",
        "maxLenght": 4
      },
      {
        "title": "A29",
        "maxLenght": 8
      },
      {
        "title": "F4-729",
        "maxLenght": 1
      },
      {
        "title": "F4G491",
        "maxLenght": 1
      },
      {
        "title": "F4G649",
        "maxLenght": 9
      },
      {
        "title": "F4-S112",
        "maxLenght": 14
      },
      {
        "title": "F4S255",
        "maxLenght": 4
      },
      {
        "title": "F4-S295",
        "maxLenght": 11
      },
      {
        "title": "F4-S609",
        "maxLenght": 12
      },
      {
        "title": "F4-S783",
        "maxLenght": 2
      },
      {
        "title": "F4-S982",
        "maxLenght": 5
      },
      {
        "title": "F4-X128",
        "maxLenght": 6
      },
      {
        "title": "FC162",
        "maxLenght": 2
      },
      {
        "title": "FC169",
        "maxLenght": 4
      },
      {
        "title": "GD853",
        "maxLenght": 7
      },
      {
        "title": "GD859",
        "maxLenght": 6
      },
      {
        "title": "GM157",
        "maxLenght": 15
      },
      {
        "title": "GM578",
        "maxLenght": 7
      },
      {
        "title": "GP322",
        "maxLenght": 11
      }
    ]
  },
  tapName: function (event) {
    wx.navigateTo({
      url: `/pages/shijing/details/details?title=${event.currentTarget.dataset.title}&maxlengt=${event.currentTarget.dataset.maxlenght}`
    })
  },
  bindJiazhuang: function (e) {
    const xx = this.data.noteAll.filter(res => {
      return res.title.toString().indexOf(e.detail.value) > -1;
    })
    this.setData({
      nodeShow: xx
    })
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    this.setData({
      nodeShow: this.data.noteAll
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
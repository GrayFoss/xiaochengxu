// pages/articles/articles.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputValue: '',
    articles: [],
    seleArticles: []
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  getoDetails: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `/pages/articles/details/details?id=${e.currentTarget.dataset.id}`
    })
  },
  bindKeyInput: function (e) {
    const xx = this.data.articles.filter(res => {
      return res.title.toString().indexOf(e.detail.value) > -1;
    })
    this.setData({
      seleArticles: xx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.request({
      url: 'http://m.wecareroom.com/api/article/listArticles?', //仅为示例，并非真实的接口地址
      data: {
        page: '1',
        cate: '1',
        limit: 'undefined'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        res.data.result
          .forEach(res => {
            res.time = res.createTime.toString().slice(0, 10).replace('-', '年').replace('-', '月') + '日'
            return res;
          })
        res.data.result = res.data.result.filter(res => res.id !== 194);        
        that.setData({
          articles: res.data.result,
          seleArticles: res.data.result
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
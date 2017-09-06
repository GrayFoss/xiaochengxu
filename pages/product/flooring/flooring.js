// pages/product/flooring/flooring.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: [
      { name: '强化', url: 'LaminateFlooring'},
      { name: '复合', url: 'EngineeredFlooring' },
      { name: '实木', url: 'SolidwoodFlooring' },
      { name: '进口', url: 'LaminateFlooring' },
      { name: 'XXX', url: 'LaminateFlooring' },
      { name: 'XXX', url: 'LaminateFlooring' },
      { name: 'XXX', url: 'LaminateFlooring' }
    ],
    isFilter: true,
    isDetail: false,
    productList: [],
    initProductList: [],
    selectPro: {},
    loadDataUrl: 'LaminateFlooring'
  },
  showFilter: function() {
    this.setData({
      isFilter: !this.data.isFilter
    })
  },
  showDetail: function(e) {
    var select = e.currentTarget.dataset.select
    this.setData({
      isDetail: !this.data.isDetail,
      selectPro: select
    })
  },
  bindBlur: function (e) {
    console.log(e.detail.value);
    if (e.detail.value){
      const xx = this.data.initProductList.filter(pro => {
        return pro.name.toString().indexOf(e.detail.value) > -1;
      })
      this.setData({
        productList: xx
      })
    } else {
      this.setData({
        productList: this.data.initProductList
      })
    }
  },
  changeUrl: function(e){
    var selectUrl = e.currentTarget.dataset.url
  
    if (selectUrl !== this.data.loadDataUrl){
      this.setData({
        loadDataUrl: selectUrl
      })
      this.onLoad()
    }else{
      console.log("无需重复加载")
    }
  },
  goRecharge: function (){
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    wx.request({
      url: 'http://immersive.wecareroom.com/api/stpaul/product/listProducts',
      data: {
        type: 'FLOORING',
        filter: that.data.loadDataUrl,
        page: 1,
        size: 1000
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          productList: res.data.result,
          initProductList: res.data.result
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
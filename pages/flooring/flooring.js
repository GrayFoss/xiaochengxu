// pages/product/flooring/flooring.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: [
      { name: '强化', url: 'LaminateFlooring', isChecked:true},
      { name: '复合', url: 'EngineeredFlooring', isChecked: false },
      { name: '实木', url: 'SolidwoodFlooring', isChecked: false }
    ],
    noSearchWord: true,
    isFilter: true,
    isDetail: false,
    productList: [],
    initProductList: [],
    selectPro: {},
    loadDataUrl: 'LaminateFlooring'
  },
  showDetail: function(e) {
    var select = e.currentTarget.dataset.select
    this.setData({
      isDetail: !this.data.isDetail,
      selectPro: select
    })
  },
  payment: function() {
    wx.requestPayment(
    {
    'timeStamp': '1505210441',
    'nonceStr': 'jSeQEN7Fv6oMfsi7',
    'package': 'prepay_id=wx2017091218004176dd2906c30882165983',
    'signType': 'MD5',
    'paySign': '5D06E958C51BD78DF667F96143A54511',
    'success':function(res){
      console.log("success")
      console.log(res)
    },
    'fail':function(res){
      console.log("fail")
      console.log(res)
    },
    'complete':function(res){
      console.log(res)
    }
    });
  },
  bindBlur: function (e) {
    if (e.detail.value){
      const xx = this.data.initProductList.filter(pro => {
        return pro.name.toString().indexOf(e.detail.value) > -1;
      })
      if(xx.length){
        this.setData({
          productList: xx
        })
      }else{
       this.setData({
          noSearchWord: false,
          productList: []
        })
      }
    } else {
      this.setData({
        productList: this.data.initProductList
      })
    }
  },
  changeUrl: function(e){
    var selectUrl = e.currentTarget.dataset.url
    this.data.type.forEach( pro => {
      pro.isChecked = false;
      if(pro.url === selectUrl){
        pro.isChecked = true;
      }
    } )
    this.setData({
      type: this.data.type
    })
   
    if (selectUrl !== this.data.loadDataUrl){
      this.setData({
        loadDataUrl: selectUrl
      })
      this.onLoad()
    }else{}
  },
  goRecharge: function (){
    wx.navigateTo({
      url: '../index/recharge/recharge',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://wecareroom.com/api/stpaul/product/listProducts',
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
        that.setData({
          productList: res.data.result,
          initProductList: res.data.result
        })
        wx.showToast({
          title: '加载成功',
          icon: 'success',
          duration: 1000
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
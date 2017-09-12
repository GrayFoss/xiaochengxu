// pages/product/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymoney: 30,
    cost: [
       { price:30,
         isChecked: true
       },
       {
         price: 100,
         isChecked: false
       },
       {
         price: 300,
         isChecked: false
       },
       {
         price: 500,
         isChecked: false
       }],
    items: [
      { name: 'agree', value: '同意', checked: 'true' }
    ],
    agree: true
  },
  choosePay: function(e){
    var money = e.currentTarget.dataset.money
    var that = this
    this.data.cost.forEach( cost => {
      cost.isChecked = false
      if(cost.price === money){
        cost.isChecked = true
      }
    } )
    this.setData({
      paymoney: money,
      cost: this.data.cost
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
        agree: !this.data.agree
    })
  },
  gotoProtocol: function(){
    wx.navigateTo({
      url: '../protocol/protocol',
    })
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
// pages/product/product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 500,
    circular: true,
    autoplay: true,
    productList: [
      { name: '地板',
        color: '#ffa2a2',
        pro:'flooring',
        type: ['强化','复合','多层','进口'],
        imgUrl: './img/icon_1.png'
       },
      {
        name: '铺装场景',
        color: '#8de892',
        pro: 'scene',
        type: ['新中式', '美式', '欧式'],
        imgUrl: './img/icon_4.png'
      },
      {
        name: '辅料',
        color: '#8eb9f5',
        imgUrl: './img/icon_2.png'
      },
      {
        name: '铺装方法',
        color: '#f9aa73',
        imgUrl: './img/icon_3.png'
      }
    ]
  },
  goItem: function(e){
      console.log(e)
      var pro = e.currentTarget.dataset.pro
      var type =  e.currentTarget.dataset.protype
      if(pro){
        wx.navigateTo({
          url: pro+'/'+pro
        })
      }else{
        console.log('error')
      }
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
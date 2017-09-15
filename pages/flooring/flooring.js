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
    owned: [
      { type: '显示全部', url: '', isOwned: false },
      { type: '未拥有', url: '', isOwned: true },
      { type: '已拥有', url: '', isOwned: true }      
    ],
    isFilter: true,
    noSearchWord: true,
    isFilter: true,
    isDetail: false,
    isAlreadyHave: [],
    isNotHave: [],
    AllProduct: [],
    nothing: false,
    productList: [],
    initProductList: [],
    selectPro: {},
    loadOwned: '未拥有',
    loadDataUrl: 'LaminateFlooring',
    money: 0,
  },
  showFilter: function () {
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
  changeOwned: function(e){
    var selectType = e.currentTarget.dataset.type
    this.data.owned.forEach(pro => {
      pro.isOwned = true;
      if (pro.type === selectType) {
        pro.isOwned = false;
      }
    })
    this.setData({
      owned: this.data.owned
    })
    if (this.data.isAlreadyHave){
      this.setData({
        nothing: true        
      })
    }
    if (selectType === '已拥有'){
      this.setData({
        productList: this.data.isAlreadyHave,
        initProductList: this.data.isAlreadyHave
      })
    } else if (selectType === '未拥有'){
      this.setData({
        productList: this.data.isNotHave,
        initProductList: this.data.isNotHave
      })
    } else if (selectType === '显示全部') {
      this.setData({
        productList: this.data.AllProduct,
        initProductList: this.data.AllProduct
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
        wx.getStorage({
          key: 'sessionKey',
          success: function (res) {
            var key = res.data;
            wx.request({
              url: 'https://wecareroom.com/api/stpaul/user/getWxAppLoginStatus',
              method: 'GET',
              data: {
                key: key
              },
              success: function (e) {
                if (e.data && e.data.status && e.data.status.error === 0) {
                  wx.showLoading({
                    title: '加载中',
                  })
                  var money = e.data.result.balance;
                  that.setData({
                    money: money
                  })
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
                      var allProduct = res.data.result;
                      wx.request({ 
                        url: 'https://wecareroom.com/api/stpaul/product/listProductByUser',
                        data: {
                          type: 'FLOORING',
                          filter: that.data.loadDataUrl,
                          page: 1,
                          size: 1000,
                          key: key
                        },
                        success: function (res) {
                          var alreadyHave = res.data.result;
                          var notHave = allProduct.filter(item => { return !alreadyHave.find(b => b.id === item.id); });
                          // 标示已拥有
                          alreadyHave.map(pro => pro.ownTag = true);
                          allProduct = [...notHave, ...alreadyHave];
                          // console.log(allProduct);
                          that.setData({
                            isAlreadyHave: alreadyHave,
                            isNotHave: notHave,
                            AllProduct: allProduct,
                            productList: allProduct,
                            initProductList: allProduct
                          })
                          wx.hideLoading()
                        }
                      })
                    }
                  })
                } else {
                  wx.showLoading({
                    title: '您尚未登陆...',
                  })
                  setTimeout(function () {
                    wx.reLaunch({
                      url: '/pages/login/login',
                    })
                    wx.hideLoading()
                  }, 1500)
                }
              },
              fail: function(){}
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
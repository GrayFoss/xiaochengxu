// pages/geren/submitScene/submitScene.js
var imageId = new Set();
var id = 0;
var upId = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    productName: '',
    region: ['湖南省', '长沙市', '开福区'],
    address: '',
    array: ['客厅', '主卧室', '次卧室', '书房', '客厅', '餐厅', '门厅', '卫生间','阳台','其他'],
    files: [],
    showSearch: true,
    searchWord: ['111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '222', '22323', '34', '6', '7', '8', '9'],
    initWord: ['111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '111', '111', '111', '112', '222', '22323', '34', '6', '7', '8', '9']
  },
  // 地区选择
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 安装位置选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value, this.data.array[e.detail.value])
    this.setData({
      index: e.detail.value
    })
  },
  // 输入地板名称
  inputTyping: function (e) {
    var input = e.detail.value + '';
    var searched = this.data.initWord.filter(item => item.indexOf(input) !== -1)
    console.log(searched);
    this.setData({
      productName: e.detail.value,
      searchWord: searched,
      showSearch: true
    });
  },
  // 输入地址
  inputAddress: function (e){
    this.setData({
      address: e.detail.value,
    });
  },
  // 选择地板名称
  selectItem: function(e){
    var chooseValue = e.currentTarget.dataset.choosevalue;
    this.setData({
      productName: chooseValue,
      showSearch: false
    });
  },
  //选择图片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        let file = res.tempFilePaths;
        console.log(file[0])
        wx.getStorage({
          key: 'sessionKey',
          success: function (response) {
            let key = response.data;
              // 选中图片并上传
            wx.uploadFile({
              url: 'https://wecareroom.com/api/stpaul/debug/uploadFlooringPicture',
              filePath: file[0],
              name: 'image',
              header: {
                "Content-Type": "multipart/form-data"
              },
              success: function (res) {
                if (res.statusCode != 200) { 
                  wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                  })
                  return;
                }
                var data = res.data
                id++;
                //do something
                upId.push(id);
                imageId.add({ path: `${file[0]}`, id: `${id}`});
              }
            })
          },
          fail: function (e) {
            console.log(e);
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
        })
      }
    })
  },
  // 预览图片
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  // 取消上传图片
  delPhoto: function (e) {
    let index = e.target.dataset.index;
    let _picUrls = this.data.files;
    for(let i of imageId) {
      if (i.path === _picUrls[index]) {
        imageId.delete(i)
      }
    }
    upId = [];
    for(let i of imageId) {
      upId.push(i.id);
    }
    _picUrls.splice(index, 1);
    this.setData({
      files: _picUrls
    })
  },
  // 提交
  submit: function(){
    var address = this.data.address;
    console.log(address);
    var flooring = this.data.productName;
    console.log(flooring);
    var region = this.data.region[0] + this.data.region[1] + this.data.region[2];
    console.log(region);
    var position = this.data.array[this.data.index];
    console.log(position);
    if (this.data.files.length > 0 && address && flooring && region && position ) {
      wx.getStorage({
        key: 'sessionKey',
        success: function (res) {
          let key = res.data;
          wx.request({
            url: 'https://wecareroom.com/api/stpaul/debug/saveInstallFlooring',
            data: {
              key: key,
              uploadImages: upId,
              InstallFlooringPicture: `{
              
              }`
            },
            success: (res) => {
              console.log(res);
              wx.showToast({
                title: '提交成功',
                icon: 'success'
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
            },
            fail: function (e){
              console.log(e);
            }
          })
        }
      })
    }  else {
      wx.showModal({
        title: '信息填写不完整',
        content: '请填写完整的反馈信息',
        confirmText: '继续填写',
        // cancelText: '',
        success: (res) => {
          if (res.confirm) {
            console.log(res);
          } else {
            console.log(res);
          }
        }
      })
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

export const bb = function(callback) {
  console.log(1);
  wx.getStorage({
    key: 'key',
    success: callback
  })
}
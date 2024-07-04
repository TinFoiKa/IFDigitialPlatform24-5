
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid: wx.getStorageSync('openid')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  scan: function(){
    const status = this.findActivityStatus()
    if (!status){
      return
    }
    
    wx.scanCode({

    })
  },

  userDeduct: function (braceletID) {
    
  },

  complementaryDeduct: function (braceletID){

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
  });

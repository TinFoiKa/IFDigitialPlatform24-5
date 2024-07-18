
Page({
  /**
   * 页面的初始数据
   */
  data: {
    braceletData: {}
  },

  complementaryActivate: function(amount) {
    const status = this.findActivityStatus()
    if (!status) {
      return
    }

    wx.scanCode({
      success: function(res){
        wx.cloud.callFunction({
          name: "callSQL",
          data: {string: "UPDATE Bracelets SET is_active = 1, complementary_amount = "+ amount + " WHERE qr_link = " + res},
          success: function(){
            wx.showToast("Bracelet Linked!")
          },
          fail: function(err){
            console.log(err)
          }
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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

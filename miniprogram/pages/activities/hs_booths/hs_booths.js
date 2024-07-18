const { windowHeight } = wx.getSystemInfoSync()
const menuRect = wx.getMenuButtonBoundingClientRect()
const menuBottom = menuRect.bottom + 1

Page({
  /**
   * 页面的初始数据
   */
  data: {
   // boothList: <></>
    sheetHeight: windowHeight - menuBottom,
    initialSize: 0,
    minSize: 0,
    maxSize: 1,
    list: ["wow", "wow2", "wow3"]
  },

  
  /*getHsBoothList: function() {
    let that = this
    wx.cloud.callFunction({
      name: "executeSql",
      data: {
        sql: "select * from BoothData where booth_type = 2"
      },  
      success : function(res) {
        wx.hideLoading();
        that.setData({
          boothList : this.data
        })
      }

    })
  },*/

  updateList : function (){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getHsBoothList()
    this.createSelectorQuery().select('.sheet').node().exec(res => {
      // 使用 sheetContext 控制 draggable-sheet 组件的滚动
      const sheetContext = res[0].node
      sheetContext.scrollTo({
        size: 0.7,
        animated: true,
        duration: 300,
        easingFunction: 'ease'
      })
    });
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

const { windowHeight } = wx.getSystemInfoSync()
const menuRect = wx.getMenuButtonBoundingClientRect()
const menuBottom = menuRect.bottom + 1

Page({
  /**
   * 页面的初始数据
   */
  data: {
    braceletData: {}
  },

  findActivityStatus(){
		let result = true
		if(this.data.activityStatus == 0){
			//管理员未开启活动
			wx.showModal({
				title : "Alert",
				content : "Activity not enabled",//活动未开启
				showCancel : false,
				confirmText : "Ok",
			})
			result = false
		}else if(this.data.activityStatus == 3){
			//活动已开启，已到活动结束时间
			wx.showModal({
				title : "Alert",
				content : "Activity has ended",//活动已结束
				showCancel : false,
				confirmText : "Ok",
			})
			result = false
		}else if(this.data.activityStatus == 4){
			//活动已手动结束
			wx.showModal({
				title : "Alert",
				content : "Activity terminated",//活动已终止
				showCancel : false,
				confirmText : "Ok",
			})
			result = false
		}
		return result
	},
  
  /*getHsBoothList: function() {
    let that = this
    wx.cloud.callFunction({
      name: "executeSql",
      data: {
        string: "select * from BoothData where booth_type = 2"
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

  scanToDeduct: function(amount){
    const status = this.findActivityStatus()
    if (!status) {
      return
    }

    let outscope = this
    wx.scanCode({
      onlyFromCamera: true,
      success: function(res){
        wx.cloud.callFunction({
          name: "executeSql",
          data: {string: "select * from Bracelets where qr_link = " + res},
          success: function(res) {
            outscope.setData({braceletData: res})
          },
          fail: function(err){
            console.log(err)
          }
        })

      },
      fail: function(){
        console.log(err)
      }
    })
    let braceletID = braceletData.bl_ID
    if (braceletID >= 900) {
      // handle complementary bracelet indices
      wx.cloud.callFunction({
        name: "deductFromComplementary",
        data: {
          braceletID: braceletID,
          amount: 
        }
      })
      this.data.braceletData = {}
    } else {
      // normal handle
    }
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

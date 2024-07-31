const { windowHeight } = wx.getSystemInfoSync()
const menuRect = wx.getMenuButtonBoundingClientRect()
const menuBottom = menuRect.bottom + 1

Page({
  /**
   * 页面的初始数据
   */
  data: {
    mgrOpenID: wx.getStorageSync('openid'),
    braceletData: {},
    transferData: {
      open_ID: "", 
      user: "",
      bl_qr: "",
      is_transfer: false,
      amount: 1
    },
    boothData: {

    }
  },

  loadBoothData : function(){
		const outscope = this
		wx.showLoading({title: 'Loading', mask : true})
		wx.cloud.callFunction({
      name : "executeSql",
      data : {
        string : "select * from BoothData where booth_ID in (select booth_id from BoothManagers where open_id='"+ outscope.data.mgrOpenID +"' and status=1)"
      },
      success : function(res){
				wx.hideLoading()
				console.log("BoothData res", res)
				if(res.result == null || res.result.length == 0){
					wx.showModal({
						title: 'Alert',
						content: 'No booth data was found',//没有查询到摊位数据
						showCancel: false,
						confirmText: 'Ok',
						complete: (res) => {
							if (res.confirm) {
								wx.navigateBack()
							}
						}
					})
					return
				}
        outscope.setData({
          boothInfo : res.result[0]
				})
      },
      fail : function(res){
				console.log(res)
				wx.hideLoading()
				wx.showModal({
					title: 'Alert',
					content: 'Booth data acquisition failed, do you want to reload？',//摊位数据获取失败，是否重新加载
					cancelText: 'Cancel',
					confirmText: 'Ok',
					complete: (res) => {
						if (res.confirm) {
							outscope.loadBoothData()
						}
						if (res.cancel) {
							wx.navigateBack()
						}
					}
				})
        // wx.showToast({
        //     title: "Load timeout",
        //     icon : "error"
        // })
      }
    })
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

  alert: function(content){
    wx.showModal({
      title: "Alert",
      content: content,
      showCancel: false,
      confirmText: "OK"
    })

  },

  changeTransferAmount: function(event){
    let value = event.detail.value
    this.setData({
      transferData:{
        amount: value
      }
    })
    if(value != ""){
      value = parseInt(e.detail.value)
    } else {
      value = 0
    }
  },

  scanToDeduct: function(){
    const status = this.findActivityStatus()
    if (!status) {
      return
    }

    // ensure EB functions are activated
    let useEBState = 0
    if (this.data.activityEvent.activityID != undefined){
      useEBState = this.data.activityEvent.useEB_state
    }
    if(useEBState == 0){
      this.alert("The use EB function has been turned off")//使用EB功能已关闭
      return
    }

    let outscope = this
    wx.scanCode({
      onlyFromCamera: true,
      success: function(res){
        outscope.setData({
          transferData:{
            bl_qr: res.result
          }
        })
        wx.cloud.callFunction({
          name: "executeSql",
          data: {string: "select * from Bracelets where qr_link = " + res.result},

          success: function(res) {
            if (res.result == null || res.result.length == 0){ // no error message
              outscope.setData({
                braceletData: res, // assign bracelet Data for further processing
              }) 
            } else { // catch and define error
              wx.hideLoading()
              outscope.alert("Bracelet does not exist or QR code is invalid")
            }
          },
          fail: function(err){
            console.log(err)
          }
        })

      },
      fail: function(){
        outscope.alert("Timeout")
        console.log(err)
      }
    })

    if (outscope.data.braceletData.bl_id >= 900){
      outscope.setData({ // ensure that bracelet == complementary
        braceletData: outscope.data.braceletData.defineProperty("isComplementary", true)
      })
    } else { // if not, create link to userID
      wx.cloud.callFunction({
        name : "executeSql",
        data : {
          string : "select * from Users where open_ID='"+outscope.data.braceletData.linked_open_id+"'"
        },
        success : function(res){

          wx.hideLoading()
          if(res.result == null || res.result.length == 0){
            outscope.alert("QR Code is invalid")
          } else {

            if(res.result[0].is_Disable == 1){
              outscope.alert("User has been disabled by event admin")
              return
            }
            outscope.setData({
              transferData :{
                open_ID: res.result[0].open_ID,
                user: res.result[0],
                bl_qr: "",
                is_transfer: true,
              } 
            })
          }
        },
        fail : function(res){
          console.log("fail", res)
          wx.hideLoading()
          this.alert("Timeout")
        }
      })
    }
    
  },

  submitDeduct: function(){
    const status = this.findActivityStatus()
		if(!status){
			return
    }
    
    const outscope = this

    if(this.data.transferData.amount < 1){
      wx.showToast({
          title : "Please fill in the transfer quantity",//请填写转账数量
          icon : "none",
          duration : 2000
      })
      return
    }

    const bracelet = this.data.braceletData

    let outscope = this
    wx.showModal({
			content : "You are collecting "+ outscope.data.transferData.amount +" Buck(s).",//您希望转移的EB数量为xxx
      cancelText : "Cancel",
      confirmText : "Ok",
      success : function(res){
        if(res.confirm){
				  wx.showLoading({title: 'Loading', mask : true})
          if(bracelet.isComplementary){  
            // complementary handle
            wx.cloud.callFunction({
              name: "deductFromComplementary",
              data: {
                bl_id: braceletID,
                withdraw: amount
              },
              success: function (res){
                if (res.result != null){ // error catching
      
                }
                outscope.alert("")
                
              },
              fail: function (res){
                this.alert("The bracelet may not be activated or has an invalid QR code")
              }
            })
            outscope.data.braceletData = {}
          } else if (!bracelet.isComplementary) {
            // normal handle
            this.accountDeduct()
            
          } else { // error handling
      
          }
        }
      }
    })

    
  },
  

  accountDeduct: function(){
    wx.cloud.callFunction({
      name: "eagleBucks",
      data: {
        recordType:3,//1购买EB，2转账，3摊位付款
        boothType:1,//摊位类型:1摊位付款，2灌水付款，3抽奖付款
        ebNumber: outscope.data.transferData.amount,
        transferOpenId : outscope.data.transferData.open_ID,
        transferBraceletQR : outscope.data.transferData.bl_qr,
        boothId : outscope.data.boothData.booth_ID
      },

      success: function(res) {
        wx.hideLoading()
        if(res.result == 1000){ // if collection successful
          
          wx.showModal({
            title : "Alert",
            content : "Successfully collected "+ outscope.data.transferData.amount +" Buck(s)",
            showCancel : false,
            confirmText : "Ok",
            success : function(res){
              outscope.cancel()
            }
          })

        }else if(res.result == 1001){ // server error
          outscope.alert("Server Error")
        }else if(res.result == 1002){ // user cannot be found
          outscope.alert("User cannot be found or does not exist")
        } else if(res.result == 1003){ // insufficient funds
          outscope.alert("Insufficient Balance")
        }
      },
      fail(res) {
        console.log("转账失败", res)
        wx.hideLoading()
        outscope.alert("Transaction Failed")
      }
    })
  },

  cancelDeduct: function(){
    this.setData({
      transferData: {
        open_ID: "",
        user: {},
        bl_qr: "",
        is_transfer: false
      }
    })
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

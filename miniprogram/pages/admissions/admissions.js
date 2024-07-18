

// pages/admissions/admissions.js
Page({

  /**
   * Page initial data
   */
  data: {
    last_selected: 0,
    items: [
      { name: '0', value: 'standard is dealt for u.', checked: 'true'},
      { name: '1', value: 'standard is dealicient for u.'},
      { name: '2', value: 'standard is for u'},
      { name: '3', value: 'option 4'},
    ],
  },

  checkboxChange(a){

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },

  toSasChina(){
    wx.reLaunch({
      url: 'https://www.saschina.org/',
    })
  }


})
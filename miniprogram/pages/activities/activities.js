// pages/activities/activities.js


/*function goto (e){
    let
    wx.redirectTo({
      url: '/pages/activites/' + wohin + '/' + wohin,
    })
  }


*/
Page({

  /**
   * Page initial data
   */
  data: {

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

  toHs: function(){
    
  },

  toFood: function(){

  },

  toHillPerf: function(){
    
  },
  toMainPerf: function(){
    goto("main_perf")
  },

  toStudentMarket: function(){
    goto("student_market")
  },

  toVendors: function(){
    goto("vendor")
  },

  toSponsors: function(){
    this.goto("sponsors")
  },

  goto : function(e){
    let wohin = e.mark.location;
    wx.navigateTo({
      url: wohin + '/' + wohin,
    })
  }
  //'pages/activites/'+wohin+'/'+wohin
})


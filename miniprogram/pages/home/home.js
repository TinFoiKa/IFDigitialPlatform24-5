// pages/landing/landing.js
const dummybullshit = ["demo1", "demo2", "demo3"]

const credits = `
Programmed by Allan Chen ('25), Aaron Li ('25), & Byron Stewart ('24)
Art done by Abi Cheng ('25)
Organized by the IF core team

`

Page({

    /**
     * Page initial data
     */
    

    data: {
        //pinned

        pinned: {
            text: "placeholder-text",
            publish: "placeholder-time",
            id: 0
        },

        //recent
        loaded_recent:[

        ],
        loaded_recent_len: 0,
        loadnums: 1,
        credits: credits,
    },

    loadRecentAnnouncements(posts/*int*/){
        if (typeof posts !== "number"){
            throw("die")
        }

        wx.cloud.callFunction({
            name:"getAnnouncements",
            data: {recent: posts},
            success: (ret) => {
                if (ret.result.code !== "success"){
                    this.setData({
                        loaded_recent: [{
                            text: ret.result.code,
                            publish_time: ret.result.code,
                            id: "unknown"
                        }]
                    })
                    
                } else {
                    this.setData({
                        loaded_recent: ret.result.entries
                    })
                    console.log(this.data)
                }   
            },
            fail: () => {
                const cloud_error = "cloud_function_connection_error"
                this.setData({
                    loaded_recent: [{
                        text: cloud_error,
                        publish_time: cloud_error,
                        id: "unknown"
                    }]
                })
            }
        })


    },


    loadPinnedAnnouncement(){
        wx.cloud.callFunction({
            name: "getAnnouncements",
            data: {recent: "pinned"},
            success: (ret) => {
                if (ret.result.code !== "success"){
                    this.setData({
                        pinned: {
                            text: ret.result.code,
                            publish_time: ret.result.code
                        },
                    })
                } else {
                    this.setData({
                        pinned: ret.result.entries
                    })
                }
            },
            fail: () => {
                this.setData({
                    pinned: {
                        text: "cloud_function_connection_error",
                        time: "cloud_function_connection_error"
                    }
                })
            },
            complete: (res) => {
                console.log(res)
                console.log(this.data)
            }
        })
    },

    GoToFeedback: () => {
        wx.navigateTo({
          url: 'feedback/feedback',
        })
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        console.log(this.data)
        this.loadPinnedAnnouncement()
        //console.log(this.data)
        this.loadRecentAnnouncements(8)
    },

    OnReachBottom: function() {
        let amount_to_add = 2 * this.data.loadnums;
        let amount_loaded = this.data.loaded_recent.length;

        this.loadRecentAnnouncements(amount_loaded + amount_to_add)

        //don't update loadnums if there is no change
        if (this.data.loaded_recent_len === this.data.loaded_recent.length){
            return
        }
        this.setData({
            loadnums: this.data.loadnums + 1,
            loaded_recent_len: this.data.loaded_recent.length
        })
    },

    GoToEas: () => {
        wx.navigateTo({url: "/pages/eas/eas"})

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

    }
})
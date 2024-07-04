// components/floating_button_comp/floating_button.js
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    
  },

  /**
   * Component methods
   */
  methods: {

  },

  add: function(e){
    console.log(e);
    wx.navigateTo({
      url: 'pages/admissions/admissions',
    })
  }
})

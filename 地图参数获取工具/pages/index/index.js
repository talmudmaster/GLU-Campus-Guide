// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    dialogShow: false,
    button: [{
      text: '关闭'
    }],

    info: [
      "815075137",
      "https://pan.baidu.com/s/178lwGP1KIwtJekt55Fv2FA?pwd=f6gg",
      "https://blog.csdn.net/weixin_45940369/category_12257059.html",
      "https://gitee.com/talmudmaster/GLU-Campus-Guide",
      "https://github.com/talmudmaster/GLU-Campus-Guide",
      "https://space.bilibili.com/384844986/channel/collectiondetail?sid=1197124",
    ]
  },

  map() {
    wx.switchTab({
      url: '../map/map',
    })
  },

  location() {
    wx.switchTab({
      url: '../location/location',
    })
  },

  site() {
    wx.switchTab({
      url: '../site/site',
    })
  },

  polygons() {
    wx.switchTab({
      url: '../polygons/polygons',
    })
  },

  study() {
    this.setData({
      dialogShow: true
    })
  },

  // 对话框按钮
  dialogButton() {
    this.setData({
      dialogShow: false,
    })
  },

  getInfo(e) {
    let id = e.currentTarget.dataset.id

    var result = this.data.info[id]
    wx.setClipboardData({
      data: result,
      success(res) {
        wx.getClipboardData({
          success(res) {
            // console.log(res.data) // data
          }
        })
      }
    })
  }
})
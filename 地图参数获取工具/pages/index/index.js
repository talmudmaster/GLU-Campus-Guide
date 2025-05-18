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
      {
        name: "QQ",
        content: "229600398"
      },
      {
        name: "QQ交流群",
        content: "815075137"
      },
      {
        name: "相关资料",
        content: "https://pan.baidu.com/s/178lwGP1KIwtJekt55Fv2FA?pwd=f6gg"
      },
      {
        name: "CSDN",
        content: "https://blog.csdn.net/weixin_45940369/category_12257059.html"
      },
      {
        name: "Gitee",
        content: "https://gitee.com/talmudmaster/GLU-Campus-Guide"
      },
      {
        name: "GitHub",
        content: "https://github.com/talmudmaster/GLU-Campus-Guide"
      },
      {
        name: "bilibili",
        content: "https://space.bilibili.com/384844986/channel/collectiondetail?sid=1197124"
      },
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

  range() {
    wx.navigateTo({
      url: '../polygons/range/range',
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
    let data = e.currentTarget.dataset.content
    wx.setClipboardData({
      data,
    })
  }
})
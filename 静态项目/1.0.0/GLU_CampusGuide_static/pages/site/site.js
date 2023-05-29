// pages/place/place.js
var utils = require('../../utils/utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tag: utils.tag,
        location : utils.location,
        scorll_view_sitedata: utils.sitedata,

        windowWidth: 295,
        windowHeight: 500,
        category: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this;
        wx.getSystemInfo({
            success: function(res){
                // console.log(res.windowHeight)
                // console.log(res.windowWidth)
                that.setData({
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight,
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    /**
     * 用户点击右上角分享到朋友圈
     */
    onShareTimeline: function (res) {

    },

    changeCategory: function (event){
        this.setData({
            category: event.currentTarget.id,
        })
        // console.log(this.data.desc1)
    },

    click: function(event) {
        // console.log(event.currentTarget.dataset)
        var site = event.currentTarget.dataset
        wx.showModal({
          title: site.name,
          content: site.desc,
          confirmText: '到这里去',
          success: (res) => {
            if (res.confirm) {
                const site_end = event.currentTarget.id
                const category_end = this.data.category
                wx.setStorageSync('site_end', site_end)
                wx.setStorageSync('category_end', category_end)
                wx.switchTab({
                    url: '../../pages/map/map',
                })
            }
          }
        })
    }
  
})
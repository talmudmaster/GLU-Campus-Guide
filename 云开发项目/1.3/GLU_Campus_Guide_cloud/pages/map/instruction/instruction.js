// pages/instruction/instruction.js
var utils = require('../../../utils/utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        map: "../" + utils.map,
        default_site_name: utils.default_site_name
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},

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

    tosite() {
        wx.switchTab({
            url: '../../../pages/site/site',
        })
    },

    tomap() {
        wx.switchTab({
            url: '../../../pages/map/map',
        })
    }
})
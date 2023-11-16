// pages/home/home.js
var utils = require('../../utils/utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        school_name_short: utils.school_name_short,
        school_name_English_short: utils.school_name_English_short,

        cover: utils.cover,
        school_icon: utils.school_icon,
        map: utils.map,
        school_life: utils.school_life,
        right_arrow: utils.right_arrow
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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

    tointroduction() {
        wx.navigateTo({
            url: '../../pages/school/introduction/introduction',
        })
    },

    tomap() {
        wx.switchTab({
            url: '../../pages/map/map',
        })
    },

    toschool() {
        wx.switchTab({
            url: '../../pages/school/school',
        })
    }
})
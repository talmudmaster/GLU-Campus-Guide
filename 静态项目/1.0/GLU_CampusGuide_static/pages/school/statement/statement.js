// pages/statement/statement.js
var utils = require('../../../utils/utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        message_icon: "../"+utils.message_icon,
        message: "../"+utils.message,
        zhixie: "../"+utils.zhixie,
        zhixie_kaifazhe: utils.zhixie_kaifazhe,
        zhixie_up: utils.zhixie_up,
        zhixie_honghui: utils.zhixie_honghui,
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

})
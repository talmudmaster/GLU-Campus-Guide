// pages/statement/statement.js
var utils = require('../../../utils/utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        school_name_full: utils.school_name_full,
        miniprogram_name: utils.miniprogram_name,

        message_icon: "../" + utils.message_icon,
        message: "../" + utils.message,
        zhixie: "../" + utils.zhixie,
        zhixie_kaifazhe: utils.zhixie_kaifazhe,
        zhixie_up: utils.zhixie_up,
        zhixie_honghui: utils.zhixie_honghui,

        notes: "../" + utils.notes,
        book: "../" + utils.book,
        media: "../" + utils.media,
        bilibili: "../" + utils.bilibili,
        gitee: "../" + utils.gitee,
        github: "../" + utils.github,
        csdn: "../" + utils.csdn,
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
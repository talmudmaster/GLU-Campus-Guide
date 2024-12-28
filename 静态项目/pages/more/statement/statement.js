// pages/more/statement/statement.js
var media = require('../../../data/media')
var school = require('../../../data/school')
var data = require('../../../data/data')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        school_name_full: school.school_information.school_name_full,

        miniprogram_name: data.miniprogram_name,
        information: data.information,

        message: "../" + media.message,
        statement: "../" + media.statement,
        zhixie: "../" + media.zhixie,

        zhixie_kaifazhe: media.zhixie_kaifazhe,
        zhixie_up: media.zhixie_up,
        zhixie_honghui: media.zhixie_honghui,

        notes: "../" + media.notes,
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
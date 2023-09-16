// pages/instruction/instruction.js
var utils = require('../../utils/utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        map: utils.map,
        school_icon: utils.school_icon,

        school_logo: utils.school_logo,
        new: utils.new,
        bus: utils.bus,
        magazine: utils.magazine,

        school: utils.school,
        home: utils.home,
        rank: utils.rank,
        message: utils.message,
        notes: utils.notes,
        users: utils.users,
        chat: utils.chat,

        // windowHeight: 1,
        sid: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // var that = this;
        // wx.getSystemInfo({
        //     success: function(res){
        //         // console.log(res.windowHeight)
        //         // console.log(res.windowWidth)
        //         that.setData({
        //             windowHeight: res.windowHeight,
        //         })
        //     }
        // })
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

    click1: function (event){
        this.setData({
            sid: 1,
        })
    },

    click2: function (event){
        this.setData({
            sid: 2,
        })
    },
})
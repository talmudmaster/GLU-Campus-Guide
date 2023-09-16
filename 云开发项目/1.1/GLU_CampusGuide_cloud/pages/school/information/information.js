// pages/school/school.js
var utils = require('../../../utils/utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        school_icon: "../" + utils.school_icon,
        message_icon: "../" + utils.message_icon,
        tel: "../" + utils.tel,
        laba: "../" + utils.laba,
        schooldata: utils.schooldata,
        teldata: utils.teldata,
        school_information: utils.school_information,

        desc1: 1,
        desc2: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    changeSchool: function (event) {
        this.setData({
            desc1: event.currentTarget.id,
        })
    },

    changeDept: function (event) {
        this.setData({
            desc2: event.currentTarget.id,
        })
    },

    call: function (event) {
        wx.authorize({
            scope: 'scope.addPhoneContact',
            success() {
                wx.addPhoneContact({
                    firstName: event.target.dataset.name,
                    mobilePhoneNumber: event.target.dataset.tel,
                })
            },
            fail() {
                wx.showToast({
                    title: '拒绝授权将无法添加联系人至通讯录！',
                    icon: 'none',
                    duration: 3000
                })
            }
        })
    }
})
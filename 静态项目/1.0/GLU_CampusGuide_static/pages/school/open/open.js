// pages/open/open.js
var utils = require('../../../utils/utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        notes: "../"+utils.notes,
        laba: "../"+utils.laba,
        book: "../"+utils.book,
        bilibili: "../"+utils.bilibili,
        gitee: "../"+utils.gitee,
        github: "../"+utils.github,
        cnblog: "../"+utils.cnblog,
        csdn: "../"+utils.csdn,
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

    tobilibili(){
        wx.showToast({
            title: '正在打开外部小程序\n请稍等',
            icon: 'none',
            duration: 1500
        })
        setTimeout(() => {
            wx.navigateToMiniProgram({
                appId: 'wxe81de4a47ea1ab33',
                path: 'go?to=https://b23.tv/wmylOjj',
            }).catch((e) => {});
        }, 1500)
    },

    togitee(){
        wx.showToast({
            title: '正在打开外部小程序\n请稍等',
            icon: 'none',
            duration: 1500
        })
        setTimeout(() => {
            wx.navigateToMiniProgram({
                appId: 'wxe81de4a47ea1ab33',
                path: 'go?to=https://gitee.com/talmudmaster/GLU-Campus-Guide',
            }).catch((e) => {});
        }, 1500)
    },

    togithub(){
        wx.showToast({
            title: '正在打开外部小程序\n请稍等',
            icon: 'none',
            duration: 1500
        })
        setTimeout(() => {
            wx.navigateToMiniProgram({
                appId: 'wxe81de4a47ea1ab33',
                path: 'go?to=https://github.com/talmudmaster/GLU-Guide',
            }).catch((e) => {});
        }, 1500)
    },

    tocnblog(){
        wx.showToast({
            title: '正在打开外部小程序\n请稍等',
            icon: 'none',
            duration: 1500
        })
        setTimeout(() => {
            wx.navigateToMiniProgram({
                appId: 'wxe81de4a47ea1ab33',
                path: 'go?to=https://www.cnblogs.com/talmudmaster/p/17226181.html',
            }).catch((e) => {});
        }, 1500)
    },

    tocsdn(){
        wx.showToast({
            title: '正在打开外部小程序\n请稍等',
            icon: 'none',
            duration: 1500
        })
        setTimeout(() => {
            wx.navigateToMiniProgram({
                appId: 'wxe81de4a47ea1ab33',
                path: 'go?to=https://blog.csdn.net/weixin_45940369/article/details/129279263',
            }).catch((e) => {});
        }, 1500)
    }

})
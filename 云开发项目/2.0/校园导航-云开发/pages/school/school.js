// pages/school/school.js
var school = require('../../utils/school');
var media = require('../../utils/media');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allWords: school.shool_guide,

        green_arrow: media.green_arrow
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
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    /* 关于侧边栏，点击跳转 */
    jump(event) {
        let id = event.currentTarget.dataset.id;
        // 获取到跳转锚点id
        wx.navigateTo({
            url: '/pages/school/guidance/guidance?id=' + id, // 通过url传到跳转页面
        })
    },

})
// pages/rank/rank.js
var media = require('../../../utils/media');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        arrow_first: media.arrow_first,
        arrow_first_no: media.arrow_first_no,
        arrow_last: media.arrow_last,
        arrow_last_no: media.arrow_last_no,
        arrow_left: media.arrow_left,
        arrow_left_no: media.arrow_left_no,
        arrow_right: media.arrow_right,
        arrow_right_no: media.arrow_right_no,

        list: [],
        current: 1, // 当前页数
        pagination: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getList()
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        console.log("PullDownRefresh")
        this.getList()
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

    getList() {
        var that = this
        wx.cloud.callFunction({
                name: 'rank',
                data: {
                    current: that.data.current
                }
            })
            .then(res => {
                console.log('success', res.result.data.data)
                console.log('success', res.result.pagination)
                wx.stopPullDownRefresh()
                that.setData({
                    list: res.result.data.data,
                    pagination: res.result.pagination
                })
                console.log(that.data.list)
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    go(e) {
        console.log(e)
        var step = e.currentTarget.dataset.index * 1;
        console.log(step)
        this.setData({
            current: this.data.current + step
        })
        this.getList()
    },

    gooneside(e) {
        let step = e.currentTarget.dataset.index * 1
        if (step == -1) {
            this.setData({
                current: 1
            })
        } else if (step == 1) {
            this.setData({
                current: this.data.pagination.totalPage
            })
        }
        this.getList();
    }
})
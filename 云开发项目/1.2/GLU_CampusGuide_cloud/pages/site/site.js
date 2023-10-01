// pages/site/site.js
var utils = require('../../utils/utils.js');
let db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tag: utils.tag,
        location: utils.location,
        windowWidth: 297,
        windowHeight: 500,
        category_list: [],
        category: 1,
        site_list: [],
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight,
                })
            }
        })
        this.lianbiaoquery()
    },

    onShow() {
        
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        console.log("PullDownRefresh")
        this.lianbiaoquery()
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

    lianbiaoquery() {
        db.collection('category')
            .get()
            .then(res => {
                console.log('success', res)
                wx.stopPullDownRefresh()
                this.setData({
                    category_list: res.data
                })
            })
            .catch(err => {
                console.log('fail', err)
            })

        wx.cloud.callFunction({
                name: 'lianbiaoquery',
            })
            .then(res => {
                this.setData({
                    list: res.result
                })
                this.getSiteList()
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    changeCategory(e) {
        this.setData({
            category: e.target.dataset.c_id,
        })
        console.log(e.target.dataset.c_id)
        this.getSiteList()
    },

    getSiteList() {
        let category = this.data.category
        console.log(category)
        this.setData({
            site_list: this.data.list.list[category - 1].site_list
        })
    },

    click(e) {
        console.log(e.currentTarget.dataset)
        console.log(e.currentTarget.dataset.s_id)
        let id = e.currentTarget.dataset.s_id
        let name = e.currentTarget.dataset.name
        let desc = e.currentTarget.dataset.desc
        // 浏览次数加1
        wx.cloud.callFunction({
            name: 'browse',
            data: {
                id: id,
            }
        })
        wx.showModal({
            title: name,
            content: desc,
            confirmText: '到这里去',
            success: (res) => {
                if (res.confirm) {
                    const s_id = id
                    wx.setStorageSync('s_id', s_id)
                    wx.switchTab({
                        url: '../../pages/map/map',
                    })
                }
            }
        })
    }
})
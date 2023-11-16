// pages/place/place.js
var utils = require('../../utils/utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tag: utils.tag,
        location: utils.location,
        scorll_view_sitedata: utils.sitedata,

        windowWidth: 295,
        windowHeight: 500,
        category: 1,

        id: null,
        card: null,
        dialogShow: false,
        buttons: [{
            text: '取消'
        }, {
            text: '设为终点'
        }],
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

    changeCategory: function (e) {
        this.setData({
            category: e.currentTarget.id,
        })
    },

    click: function (e) {
        console.log(e)
        var card = e.currentTarget.dataset
        let id = e.currentTarget.id

        this.setData({
            dialogShow: true,
            card: card,
            id: id,
        })

        // wx.showModal({
        //     title: site.name,
        //     content: site.desc,
        //     confirmText: '到这里去',
        //     success: (res) => {
        //         if (res.confirm) {
        //             const site_end = e.currentTarget.id
        //             const category_end = this.data.category
        //             wx.setStorageSync('site_end', site_end)
        //             wx.setStorageSync('category_end', category_end)
        //             wx.switchTab({
        //                 url: '../../pages/map/map',
        //             })
        //         }
        //     }
        // })
    },

    //点击图片可查看
    lookPhoto(e) {
        console.log("点击了图片", e.target.dataset.src)
        var url = e.target.dataset.src
        wx.previewImage({
            current: 'url', // 当前显示图片的http链接
            urls: [url] // 需要预览的图片http链接列表
        })
    },

    mapmarker(e) {
        this.setData({
            dialogShow: false,
        })
        console.log(e.detail)
        let choose = e.detail.item.text
        let id = this.data.id
        if (choose == "设为终点") {
            const site_end = id
            const category_end = this.data.category
            wx.setStorageSync('site_end', site_end)
            wx.setStorageSync('category_end', category_end)
            wx.switchTab({
                url: '../../pages/map/map',
            })
        }
    }

})
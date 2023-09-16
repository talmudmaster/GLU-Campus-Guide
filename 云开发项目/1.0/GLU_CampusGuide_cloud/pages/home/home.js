// pages/home/home.js
var utils = require('../../utils/utils.js');
let db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        school_icon: utils.school_icon,
        map: utils.map,
        right_arrow: utils.right_arrow,
        school_life: utils.school_life,
        cover: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.get()
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

    get() {
        db.collection('resource')
            .where({
                name: "封面"
            })
            .get()
            .then(res => {
                console.log('success', res.data[0].img)
                this.setData({
                    cover: res.data[0].img,
                })
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    taplist1() {
        wx.navigateTo({
            url: '../../pages/school/introduction/introduction',
        })
    },

    taplist2() {
        wx.switchTab({
            url: '../../pages/map/map',
        })
        // wx.showModal({
        //     title: '友情提示',
        //     content: '如果你还不会使用\r\n可以先看看使用说明',
        //     confirmText: '去看说明',
        //     cancelText: '去查地图',
        //     success(res) {
        //         if (res.confirm) {
        //             console.log('用户点击确定')
        //             wx.navigateTo({
        //                 url: '../../pages/school/instruction/instruction',
        //             })
        //         } else if (res.cancel) {
        //             console.log('用户点击取消')
        //             wx.switchTab({
        //                 url: '../../pages/map/map',
        //             })
        //         }
        //     }
        // })
    },

    taplist3() {
        wx.switchTab({
            url: '../../pages/school/school',
        })
    }
})
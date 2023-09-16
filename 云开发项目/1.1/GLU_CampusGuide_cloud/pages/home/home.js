// pages/home/home.js
var utils = require('../../utils/utils.js');
let db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        school_name_English_short: utils.school_name_English_short,
        school_name_short: utils.school_name_short,

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
                let img = res.data[0].img
                if (img == "" || img == null) {
                    img = "cloud://gluguide-0g65cvsv649006da.676c-gluguide-0g65cvsv649006da-1316857255/学校/素材/default_cover.jpg"
                }
                console.log('img', img)
                this.setData({
                    cover: img,
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
    },

    taplist3() {
        wx.switchTab({
            url: '../../pages/school/school',
        })
    }
})
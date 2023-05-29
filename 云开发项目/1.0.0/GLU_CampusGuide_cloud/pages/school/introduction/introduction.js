// pages/introduction/introduction.js
var utils = require('../../../utils/utils.js');
let db = wx.cloud.database()
Page({

    /**
     * 组件的初始数据
     */
    data: {
        // background: ['../../assets/images/home/swiper_1.jpg', '../../assets/images/home/swiper_2.jpg', '../../assets/images/home/swiper_3.jpg'],
        // background: utils.swiper_background,
        // video: utils.video,
        background: [],
        video: null,
        text: utils.text,

        indicatorDots: true,
        indicatorColor: "white", //指示点颜色
        activeColor: "#2adce2", //当前选中的指示点颜色
        autoplay: true, //是否自动切换
        circular: true, //是否采用衔接滑动
        interval: 3500, //间隔时间
        duration: 1500, //滑动时间
        windowWidth: 500
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
                })
            }
        })
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
                name: "视频"
            })
            .get()
            .then(res => {
                console.log('success', res.data[0].img)
                this.setData({
                    video: res.data[0].img,
                })
            })
            .catch(err => {
                console.log('fail', err)
            })

        db.collection('resource')
            .where({
                name: "轮播图"
            })
            .get()
            .then(res => {
                console.log('success', res.data[0].img)
                this.setData({
                    background: res.data[0].img,
                })
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    //图片比例
    imgHeight: function (e) {
        var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
        var imgh = e.detail.height; //图片高度
        var imgw = e.detail.width; //图片宽度
        var swiperH = winWid * imgh / imgw + "px" //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
        this.setData({
            Height: swiperH //设置高度
        })
    },

    taptomap() {
        wx.switchTab({
            url: '../../../pages/map/map',
        })
        // wx.showModal({
        //     title: '友情提示',
        //     content: '如果你还不会使用\r\n可以先看看使用说明',
        //     confirmText: '去看说明',
        //     cancelText: '去查地图',
        //     success (res) {
        //         if (res.confirm) {
        //             console.log('用户点击确定')
        //             wx.navigateTo({
        //                 url: '../../../pages/school/instruction/instruction',
        //             })
        //         } else if (res.cancel) {
        //             console.log('用户点击取消')
        //             wx.switchTab({
        //                 url: '../../../pages/map/map',
        //             })
        //         }
        //     }
        // })
    }
})
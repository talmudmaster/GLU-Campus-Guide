// pages/school/school.js
var utils = require('../../utils/utils.js');
let db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        school_name_full: utils.school_name_full,
        school_name_short: utils.school_name_short,
        miniprogram_name: utils.miniprogram_name,
        school_information: utils.school_information,

        laba: utils.laba,
        new: utils.new,
        bus: utils.bus,
        school_icon: utils.school_icon,
        school_logo: utils.school_logo,
        magazine: utils.magazine,
        school: utils.school,
        instruction: utils.instruction,
        information: utils.information,
        notes: utils.notes,
        contact: utils.contact,
        guanwei: utils.guanwei,
        wechat: utils.wechat,
        weather: utils.weather,

        APIKEY: utils.weatherKey,
        school_location: utils.school_location,

        background: null,
        indicatorDots: true, //是否显示面板指示点
        indicatorColor: "white", //指示点颜色
        activeColor: "#2adce2", //当前选中的指示点颜色
        autoplay: true, //是否自动切换
        circular: true, //是否采用衔接滑动
        interval: 3500, //间隔时间
        duration: 1500, //滑动时间
        windowWidth: 400,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getWeather()
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

    get() {
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

    // 学校信息
    toinformation() {
        wx.navigateTo({
            url: "../../pages/school/information/information",
        })
    },
    // 交通出行
    totraffic() {
        wx.navigateTo({
            url: "../../pages/school/traffic/traffic",
        })
    },
    // 学校简介
    tointroduction() {
        wx.navigateTo({
            url: "../../pages/school/introduction/introduction",
        })
    },
    // 学校官微
    towechat() {
        wx.previewImage({
            current: this.data.guanwei,
            urls: [this.data.guanwei]
        })
    },
    // 招生官微
    toMiniProgram() {
        wx.navigateToMiniProgram({
            appId: 'wx0a954435bd49aca4',
            success(res) {
                // 打开成功
                console.log("打开成功")
            },
            fail(res) {
                // 打开失败
                console.log("打开失败")
            }
        })
    },
    // 获取天气
    getWeather() {
        var that = this
        wx.request({
            url: 'https://devapi.qweather.com/v7/weather/now?key=' + that.data.APIKEY + "&location=" + that.data.school_location,
            success(result) {
                var res = result.data
                that.setData({
                    now: res.now
                })
            }
        })
    },
})
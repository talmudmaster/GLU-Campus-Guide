// pages/me/me.js
var utils = require('../../utils/utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

        laba: utils.laba,
        school_logo: utils.school_logo,
        new: utils.new,
        bus: utils.bus,
        school_icon: utils.school_icon,
        magazine: utils.magazine,
        school: utils.school,
        home: utils.home,
        rank: utils.rank,
        information: utils.information,
        message: utils.message,
        notes: utils.notes,
        users: utils.users,
        chat: utils.chat,
        share: utils.share,
        admin: utils.admin,
        right_arrow: utils.right_arrow,
        contact: utils.contact,
        guanwei: utils.guanwei,

        background: utils.swiper_background,
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
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowWidth: res.windowWidth,
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

    // 学校信息
    tapmenu1() {
        wx.navigateTo({
            url: "../../pages/school/information/information",
            // url: "../../pages/weather/weather",
        })
    },
    // 交通出行
    tapmenu2() {
        wx.navigateTo({
            url: "../../pages/school/traffic/traffic",
        })
    },
    // 学校官网
    tapmenu3() {
        wx.showToast({
            title: '首次访问外部小程序可能时间较长\n请耐心等待',
            icon: 'none',
            duration: 1500
        })
        setTimeout(() => {
            wx.navigateToMiniProgram({
                appId: 'wxe81de4a47ea1ab33',
                path: 'go?to=https://www.gxljc.edu.cn/',
            }).catch((e) => {});
        }, 1500)
    },
    // 桂院官微
    tapmenu4() {
        wx.previewImage({
            current: this.data.guanwei,
            urls: [this.data.guanwei]
        })
    },
    // 招生官微
    tapmenu5() {
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
    // 学校简介
    taptointroduction() {
        wx.navigateTo({
            url: "../../pages/school/introduction/introduction",
        })
    },
    // 返回主页
    taptohome() {
        wx.navigateTo({
            url: "../../pages/home/home",
        })
    },
    // 地点浏览排名
    taptorank() {

    },
    // 软件声明与致谢
    taplist3() {
        wx.navigateTo({
            url: '../../pages/school/statement/statement',
        })
    },
    // 开源代码
    taptoopen() {
        wx.navigateTo({
            url: "../../pages/school/open/open",
        })
    },
    // 联系作者
    tapcontact() {
        wx.previewImage({
            current: this.data.contact,
            urls: [this.data.contact]
        })
    },

})
// pages/jianjie/jianjie.js
var utils = require('../../../utils/utils.js');
Page({

    /**
     * 组件的初始数据
     */
    data: {
        // background: ['../../images/home/swiper_1.jpg', '../../images/home/swiper_2.jpg', '../../images/home/swiper_3.jpg'],
        background: utils.swiper_background,
        text: utils.text,
        videourl: utils.videourl,
        indicatorDots: true,
        indicatorColor: "white", //指示点颜色
        activeColor: "#2adce2", //当前选中的指示点颜色
        autoplay: true, //是否自动切换
        circular: true, //是否采用衔接滑动
        interval: 3500, //间隔时间
        duration: 1500, //滑动时间
        windowWidth: 400
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

    taptomap() {
        wx.switchTab({
            url: '../../../pages/map/map',
        })
        // wx.showModal({
        //     title: '友情提示',
        //     content: '如果你还不会使用\n可以先看看使用说明',
        //     confirmText: '去看说明',
        //     cancelText: '去查地图',
        //     success (res) {
        //         if (res.confirm) {
        //             console.log('用户点击确定')
        //             wx.switchTab({
        //                 url: '../../../pages/instruction/instruction',
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


// 百度网盘分享链接
// https://bdbl-cm01.baidupcs.com/file/b17da26f6g8238e3ade6472c152c015b?bkt=en-2a4ba40c42c88fabdc8c11aa448bd76d554f086e301403382fca5f3773a998e707ed1095bc66e0efd995be57c4def749843c9b70b235e74545194967c19014ce&fid=3926760046-250528-17138646329917&time=1674984813&sign=FDTAXUbGERLQlBHSKfWqiu-DCb740ccc5511e5e8fedcff06b081203-olS5lagSG4Bq4A6DuPbYFXlltfg%3D&to=401&size=1838484&sta_dx=1838484&sta_cs=0&sta_ft=mp4&sta_ct=0&sta_mt=0&fm2=MH%2CBaoding%2CAnywhere%2C%2C%E6%B1%9F%E8%8B%8F%2Ccmnet&ctime=1674984642&mtime=1674984642&resv0=0&resv1=0&resv2=rlim&resv3=5&resv4=1838484&vuk=3926760046&iv=0&htype=&randtype=&tkbind_id=0&newver=1&newfm=1&secfm=1&flow_ver=3&pkey=en-c9b4c16e5675e9a3a2238bd60bff14015b5d7c8f2dd1f8a8c3fe773e6e50e606999daa9f7b77ac17113ce98cfa16c74906126b81210dd39b305a5e1275657320&sl=68616270&expires=8h&rt=sh&r=128275663&vbdid=800996808&fin=GLUlandscape.mp4&fn=GLUlandscape.mp4&rtype=1&dp-logid=8736818290815849679&dp-callid=0.1&hps=1&tsl=200&csl=200&fsl=0&csign=0eDaQRVDgM47o1Kw5vPbPXto9wI%3D&so=0&ut=6&uter=4&serv=1&uc=32672573&ti=19328f7b5b91b3792c9f2e8980785b71e2a4fd3cccdd1efe&hflag=30&from_type=1&adg=c_edf1da0a147034341028b8d750f4e570&reqlabel=250528_f_67f43f825ae21963eb2fa5ef08c6d1fb_-1_27a280f7c2245bf910db8ffd788322ad&by=themis&resvsflag=1-0-0-1-1-1

// 关联微信公众号文章的视频
// http://mpvideo.qpic.cn/0bc3lmaa2aaajaaebz6wtrrvaw6dbvnqadia.f10004.mp4?dis_k=6f306409b38965989545ed90b3af2da7&dis_t=1675050179&play_scene=10400&vid=wxv_2774893625107038211&format_id=10004&support_redirect=0&mmversion=false

// QQ空间相册视频
// https://photovideo.photo.qq.com/1075_0b53vcw7kdicvman7n6xfbrtdkae6utafgka.f0.mp4?dis_k=5e06ec6f0d7af110c6dc244917a2a204&dis_t=1674970537&vuin=229600398&owner=MjI5NjAwMzk4
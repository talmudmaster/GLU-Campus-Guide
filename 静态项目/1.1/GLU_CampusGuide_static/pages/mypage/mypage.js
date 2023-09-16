// pages/mypage/mypage.js
var utils = require('../../utils/utils.js');
Page({
    data: {
        miniprogram_name: utils.miniprogram_name,

        avatarUrl: utils.avatarUrl,
        green_arrow: utils.green_arrow,
        home: utils.home,
        message_mypage: utils.message_mypage,
        notes_mypage: utils.notes_mypage,
        users: utils.users,
        contact: utils.contact,
        chat: utils.chat,
        feedback: utils.feedback,
        share: utils.share,
        admin: utils.admin,
        userInfo: {},
        hasUserInfo: false,
    },

    onLoad: function () {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true,
            })
        }
    },

    // 用户点击右上角分享
    onShareAppMessage() {},

    // 用户点击右上角分享到朋友圈
    onShareTimeline: function (res) {},

    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res.userInfo)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                })
            }
        })
    },
    // 回到首页
    tohome() {
        wx.navigateTo({
            url: "../../pages/home/home",
        })
    },
    // 软件声明
    tostatement() {
        wx.navigateTo({
            url: '../../pages/mypage/statement/statement',
        })
    },
    // 特别说明
    aboutus() {
        wx.showModal({
            title: '特别说明',
            content: '本项目同时应用于中国大学生计算机设计大赛，未经允许，不得随意用于各类比赛项目',
        })
    },
    // 联系作者
    contact() {
        wx.showModal({
            title: '联系作者',
            content: '如果遇到什么问题\n请点击确认与我联系',
            success: (res => {
                if (res.confirm == true) {
                    wx.previewImage({
                        current: this.data.contact, // 当前显示图片的http链接
                        urls: [this.data.contact] // 需要预览的图片http链接列表
                    })
                }
            }),
            fail(res) {
                console.log('fail')
            }
        })
    },
})
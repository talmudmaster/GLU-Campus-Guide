// pages/map/map.js
var utils = require('../../utils/utils.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        miniprogram_name: utils.miniprogram_name,

        blue_location: utils.blue_location,
        red_location: utils.red_location,
        location: utils.location,
        map_bottom: utils.map_bottom,

        windowHeight: 400,
        windowWidth: 400,

        category: 1,
        site: 0,
        category_tem: 0,
        is_at_school: false,
        sitedata: utils.sitedata,
        //默认地点所在的category
        default_category: 4,
        marker: [],
        mylocationmarkers: [],

        fullscreen: false,

        mylocation: "我的位置",

        category_begin: 0,
        site_begin: 0,
        category_end: 0,
        site_end: 0,

        subKey: utils.mapKey,
        latitude: utils.latitude,
        longitude: utils.longitude,
        scale: 16.1,
        showLocation: true,
        enablepoi: false,
        markers: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.map()

        let begin = {
            currentTarget: {
                id: 1,
            }
        }

        var that = this
        //判断所在位置是否在校区内
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                var nowlatitude = res.latitude
                var nowlongitude = res.longitude
                if ((nowlatitude > 25.089701) && (nowlatitude < 25.09839) && (nowlongitude > 110.2733) && (nowlongitude < 110.280699)) {
                    that.setData({
                        mylocationmarkers: {
                            id: 0,
                            iconPath: that.data.red_location,
                            latitude: nowlatitude,
                            longitude: nowlongitude,
                            width: 30,
                            height: 30,
                            callout: {
                                content: " 当前位置 ",
                                display: 'ALWAYS',
                                padding: 1
                            }
                        },
                        is_at_school: true,
                        category_begin: 0,
                        site_begin: 0,
                    })
                    that.changeCategory(begin)
                } else {
                    that.setData({
                        mylocationmarkers: {
                            id: 0,
                            iconPath: that.data.red_location,
                            latitude: '25.095321',
                            longitude: '110.280392',
                            width: 30,
                            height: 30,
                            callout: {
                                content: " 默认位置-东门 ",
                                display: 'ALWAYS',
                                padding: 1
                            }
                        },
                        category_begin: that.data.default_category,
                        site_begin: 1,
                    })
                    that.changeCategory(begin)
                    wx.showToast({
                        title: '当前位置不在校区内\n默认位置设为东门',
                        icon: 'none',
                        duration: 2000
                    })
                }
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        var that = this
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const site_end = wx.getStorageSync('site_end')
        const category_end = wx.getStorageSync('category_end')
        console.log(site_end)
        console.log(category_end)
        if (site_end && category_end) {
            this.setData({
                category_end: category_end,
                site_end: site_end,
            })
            wx.clearStorageSync()
        }
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

    map() {
        var that = this
        this.mapCtx = wx.createMapContext('map')
        this.mapCtx.addGroundOverlay({
            id: 0,
            src: that.data.map_bottom,
            bounds: {
                southwest: { //西南角
                    latitude: 25.088910,
                    longitude: 110.273880,
                },
                northeast: { //东北角
                    latitude: 25.098995,
                    longitude: 110.281259,
                }
            },
            opacity: 0.7,
            success(res) {
                console.log('wp', res)
            },
            fail(err) {
                console.log('wperr', err)
            }
        })
        this.mapCtx.setBoundary({
            southwest: { //西南角
                latitude: 25.088083,
                longitude: 110.272618,
            },
            northeast: { //东北角
                latitude: 25.099580,
                longitude: 110.281911,
            }
        })
    },

    location() {
        var that = this
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                var nowlatitude = res.latitude
                var nowlongitude = res.longitude
                if ((nowlatitude > 25.089701) && (nowlatitude < 25.09839) && (nowlongitude > 110.2733) && (nowlongitude < 110.280699)) {
                    that.setData({
                        longitude: res.longitude,
                        latitude: res.latitude,
                        is_at_school: true,
                        category_begin: 0,
                        site_begin: 0,
                    })
                    console.log(that.data.category_begin)
                    console.log(that.data.site_begin)
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '请到学校区域再定位吧',
                        confirmText: '朕知道了',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            }
                        }
                    })
                }
            }
        })
    },

    changeCategory: function (event) {
        this.setData({
            category: event.currentTarget.id,
        })
        console.log(this.data.category)
        console.log(this.data.sitedata[this.data.category - 1].list)

        let site_list = this.data.sitedata[this.data.category - 1].list
        let marker = []
        for (let i = 0; i < site_list.length; i++) {
            let la = site_list[i].latitude
            let lo = site_list[i].longitude
            let name = site_list[i].name
            let m = {
                id: i + 1,
                latitude: la,
                longitude: lo,
                iconPath: "https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker1_Activated@3x.png",
                width: 30,
                height: 30,
                callout: {
                    content: " " + name + " ",
                    display: 'ALWAYS',
                    padding: 1
                }
            }
            marker.push(m)
        }
        marker.push(this.data.mylocationmarkers)
        console.log(marker)
        this.setData({
            marker: marker
        })

        var mapCtx = wx.createMapContext("map");
        mapCtx.includePoints({
            padding: [60, 20, 40, 40],
            points: marker
        })
    },

    click: function (event) {
        var that = this
        var site = event.currentTarget.dataset
        wx.showModal({
            title: site.name,
            content: site.desc,
            confirmText: "设为终点",
            cancelText: "设为起点",
            complete: (res) => {
                if (res.cancel) {
                    that.setData({
                        category_begin: that.data.category,
                        site_begin: event.currentTarget.id,
                    })
                    console.log(that.data.category_begin)
                    console.log(that.data.site_begin)
                }

                if (res.confirm) {
                    that.setData({
                        category_end: that.data.category,
                        site_end: event.currentTarget.id,
                    })
                    console.log(that.data.category_end)
                    console.log(that.data.site_end)
                }
            }
        })
    },

    clickButton: function (e) {
        //打印所有关于点击对象的信息
        this.setData({
            fullscreen: !this.data.fullscreen
        })
    },

    routePlan: function () {
        console.log(this.data.category_end)
        if (this.data.category_end != 0) {
            let plugin = requirePlugin('routePlan');
            let key = this.data.subKey //使用在腾讯位置服务申请的key
            let referer = this.data.miniprogram_name; //调用插件的app的名称
            console.log(referer)
            let mode = 'walking'; //出行规划方式-步行

            var begin = ''
            let beginPoint = ''
            if (this.data.category_begin != 0 && this.data.site_begin != 0) {
                begin = this.data.sitedata[this.data.category_begin - 1].list[this.data.site_begin - 1]
                beginPoint = JSON.stringify({ //起点
                    name: begin.name,
                    latitude: begin.latitude,
                    longitude: begin.longitude
                });
            }

            var end = this.data.sitedata[this.data.category_end - 1].list[this.data.site_end - 1]
            let endPoint = JSON.stringify({ //终点
                name: end.name,
                latitude: end.latitude,
                longitude: end.longitude
            });
            if (beginPoint == endPoint) {
                wx.showToast({
                    title: '起点和终点不能相同哦',
                    icon: 'none',
                    duration: 2000
                })
            } else {
                wx.navigateTo({
                    url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&startPoint=' + beginPoint + '&endPoint=' + endPoint + '&mode=' + mode
                });
            }
        } else {
            wx.showToast({
                title: '请选择终点！',
                icon: 'none',
                duration: 2000
            })
        }
    },

    markertap: function (event) {
        console.log(event.markerId)
        console.log(this.data.category)

        if (event.markerId == 0) {
            this.setData({
                category: this.data.default_category,
            })
            event.markerId = 1 // 默认地点是那个类别的第几个
        }

        this.setData({
            fullscreen: true,
            site: parseInt(event.markerId),
            category_tem: this.data.category
        })
    },

    toinstruction() {
        wx.navigateTo({
            url: '../../pages/map/instruction/instruction',
        })
    }
})
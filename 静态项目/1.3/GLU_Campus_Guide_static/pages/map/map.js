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
        markers: [],

        scale: utils.scale,
        minscale: utils.minscale,
        showLocation: utils.showLocation,
        enablepoi: utils.enablepoi,
        groundoverlay: utils.groundoverlay,
        boundary: utils.boundary,
        school_boundary: utils.school_boundary,

        // 默认地点
        default_point: utils.default_point,

        id: null,
        card: null,
        dialogShow: false,
        buttons: [{
            text: '设为起点'
        }, {
            text: '设为终点'
        }],
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
        var school_boundary = this.data.school_boundary
        //判断所在位置是否在校区内
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                var nowlatitude = res.latitude
                var nowlongitude = res.longitude
                if (nowlatitude > school_boundary.south && nowlatitude < school_boundary.north && nowlongitude > school_boundary.west && nowlongitude < school_boundary.east) {
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
                            latitude: that.data.default_point.latitude,
                            longitude: that.data.default_point.longitude,
                            width: 30,
                            height: 30,
                            callout: {
                                content: " " + that.data.default_point.name + " ",
                                display: 'ALWAYS',
                                padding: 1
                            }
                        },
                        category_begin: that.data.default_category,
                        site_begin: 1,
                    })
                    that.changeCategory(begin)
                    wx.showToast({
                        title: '当前位置不在校区内\n默认位置设为' + that.data.default_point.name,
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
                    latitude: this.data.groundoverlay.southwest_latitude,
                    longitude: this.data.groundoverlay.southwest_longitude,
                },
                northeast: { //东北角
                    latitude: this.data.groundoverlay.northeast_latitude,
                    longitude: this.data.groundoverlay.northeast_longitude,
                }
            },
            opacity: this.data.groundoverlay.opacity, //图层透明度
            success(res) {
                console.log('wp', res)
            },
            fail(err) {
                console.log('wperr', err)
            }
        })
        this.mapCtx.setBoundary({
            southwest: { //西南角
                latitude: this.data.boundary.southwest_latitude,
                longitude: this.data.boundary.southwest_longitude,
            },
            northeast: { //东北角
                latitude: this.data.boundary.northeast_latitude,
                longitude: this.data.boundary.northeast_longitude,
            }
        })
    },

    location() {
        var that = this
        let school_boundary = this.data.school_boundary
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                var nowlatitude = res.latitude
                var nowlongitude = res.longitude
                if (nowlatitude > school_boundary.south && nowlatitude < school_boundary.north && nowlongitude > school_boundary.west && nowlongitude < school_boundary.east) {
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

    changeCategory: function (e) {
        this.setData({
            category: e.currentTarget.id,
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

    click: function (e) {
        var site = e.currentTarget.dataset
        let id = e.currentTarget.id
        console.log(e)
        this.setData({
            dialogShow: true,
            card: site,
            id: id,
        })

        // var that = this
        // wx.showModal({
        //     title: site.name,
        //     content: site.desc,
        //     confirmText: "设为终点",
        //     cancelText: "设为起点",
        //     complete: (res) => {
        //         if (res.cancel) {
        //             that.setData({
        //                 category_begin: that.data.category,
        //                 site_begin: e.currentTarget.id,
        //             })
        //             console.log(that.data.category_begin)
        //             console.log(that.data.site_begin)
        //         }

        //         if (res.confirm) {
        //             that.setData({
        //                 category_end: that.data.category,
        //                 site_end: e.currentTarget.id,
        //             })
        //             console.log(that.data.category_end)
        //             console.log(that.data.site_end)
        //         }
        //     }
        // })
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

    markertap: function (e) {
        console.log(e.markerId)
        console.log(this.data.category)

        if (e.markerId == 0) {
            this.setData({
                category: this.data.default_category,
            })
            e.markerId = 1 // 默认地点是那个类别的第几个
        }

        this.setData({
            fullscreen: true,
            site: parseInt(e.markerId),
            category_tem: this.data.category
        })
    },

    toinstruction() {
        wx.navigateTo({
            url: '../../pages/map/instruction/instruction',
        })
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
        let category = this.data.category
        if (choose == "设为起点") {
            this.setData({
                category_begin: category,
                site_begin: id,
            })
        } else {
            this.setData({
                category_end: category,
                site_end: id,
            })
        }
    }
})
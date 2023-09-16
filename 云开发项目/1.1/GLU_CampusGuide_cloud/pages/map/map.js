// pages/map/map.js
var utils = require('../../utils/utils.js');
let db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        miniprogram_name: utils.miniprogram_name,

        location: utils.location,
        blue_location: utils.blue_location,
        red_location: utils.red_location,
        map_bottom: null,
        windowHeight: 400,
        windowWidth: 400,
        fullscreen: false,
        category_list: [],
        category: 1,
        site_list: [],
        site: 0,
        site_all_list: [],
        move: 0,
        ishow: false,
        is_at_school: false,
        site_begin: -1,
        site_end: -1,
        search_begin: 0,
        search_end: 0,
        search_site_id: 0,

        default_site: 0,
        default_category: 0,
        isfirst: true,
        list: [],

        subKey: utils.mapKey,
        latitude: '25.093668',
        longitude: '110.277685',
        scale: 16.1,
        minscale: 16,
        showLocation: true,
        enablepoi: false,
        markers: [],
        mylocationmarkers: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.get()
        this.getdefaultsite()
        this.lianbiaoquery()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        var that = this
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
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const s_id = wx.getStorageSync('s_id')
        console.log(s_id)
        if (s_id) {
            this.setData({
                site_end: s_id,
                search_end: 0
            })
            wx.clearStorageSync()
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        console.log("PullDownRefresh")
        this.setData({
            isfirst: true
        })
        this.onLoad()
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

    lianbiaoquery() {
        db.collection('category')
            .get()
            .then(res => {
                console.log('success', res)
                this.setData({
                    category_list: res.data
                })
            })
            .catch(err => {
                console.log('fail', err)
            })
        wx.cloud.callFunction({
                name: 'lianbiaoquery',
            })
            .then(res => {
                this.setData({
                    list: res.result
                })
                console.log('success', res)
            })
            .catch(err => {
                console.log('fail', err)
            })
        this.getAllSiteList()
    },
    // 获取地图的图片链接
    get() {
        db.collection('resource')
            .where({
                name: "地图"
            })
            .get()
            .then(res => {
                console.log('success', res.data[0].img)
                this.setData({
                    map_bottom: res.data[0].img,
                })
                this.map()
            })
            .catch(err => {
                console.log('fail', err)
            })
    },
    // 渲染地图
    map() {
        this.mapCtx = wx.createMapContext('map')
        this.mapCtx.addGroundOverlay({
            id: 0,
            src: this.data.map_bottom,
            bounds: {
                southwest: { //西南角
                    latitude: 25.088910,
                    longitude: 110.273850,
                },
                northeast: { //东北角
                    latitude: 25.098995,
                    longitude: 110.281229,
                }
            },
            opacity: 0.7, //图层透明度 0-1
            success(res) {
                console.log('wp', res)
            },
            fail(err) {
                console.log('wperr', err)
            },
            complete(res) {
                console.log('complete', res)
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
    // 获取默认地点的相关id
    getdefaultsite() {
        db.collection('site')
            .where({
                name: "东门"
            })
            .field({
                s_id: true,
                c_id: true,
            })
            .get()
            .then(res => {
                this.setData({
                    default_category: res.data[0].c_id,
                    default_site: res.data[0].s_id,
                })
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    location() {
        let site_all_list = this.data.site_all_list
        var that = this
        //判断所在位置是否在校区内
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                console.log(res)
                var nowlatitude = res.latitude
                var nowlongitude = res.longitude
                if (nowlatitude > 25.089701 && nowlatitude < 25.09839 && nowlongitude > 110.2733 && nowlongitude < 120.280699) {
                    that.setData({
                        mylocationmarkers: {
                            id: 0,
                            name: "当前位置",
                            iconPath: that.data.red_location,
                            desc: "当前位置",
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
                        site_begin: site_all_list.length,
                    })
                    if (!that.data.isfirst) {
                        site_all_list.pop()
                    } else {
                        that.setData({
                            isfirst: false,
                            site_begin: site_all_list.length + 1
                        })
                    }
                    site_all_list.push(that.data.mylocationmarkers)
                    console.log("abc", site_all_list.length + 1)
                    console.log("abc", site_all_list)
                    console.log("abc", that.data.site_begin)
                    that.setData({
                        site_all_list: site_all_list
                    })
                    that.getSiteList()
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
                        is_at_school: false,
                        site_begin: that.data.default_site,
                    })
                    that.getSiteList()
                    wx.showToast({
                        title: '当前位置不在校区内\n默认位置设为东门',
                        icon: 'none',
                        duration: 2000
                    })
                }
            }
        });
    },

    markertap: function (e) {
        console.log(e.detail.markerId)
        console.log(this.data.site_list[0].id)
        console.log(this.data.site_list)
        if (e.detail.markerId != 0) {
            this.setData({
                fullscreen: true,
                site: e.detail.markerId,
                move: e.detail.markerId - 1
            })
        } else {
            if (!this.data.is_at_school) {
                this.setData({
                    fullscreen: true,
                    category: this.data.default_category,
                    site: 1, // 默认地点是那个类别的第几个
                    move: 0
                })
                this.getSiteList()
            } else {
                this.setData({
                    site_begin: this.data.site_all_list.length,
                })
            }
        }
    },

    clickButton: function (e) {
        this.setData({
            fullscreen: !this.data.fullscreen
        })
    },

    changeCategory(e) {
        this.setData({
            category: e.target.dataset.c_id,
            ishow: true,
            site: 0,
        })
        this.getSiteList()
        console.log(this.data.markers)
    },

    includepoints() {
        console.log(this.data.markers)
        var mapCtx = wx.createMapContext("map");
        mapCtx.includePoints({
            padding: [60, 20, 40, 40],
            points: this.data.markers
        })
    },

    getAllSiteList() {
        wx.cloud.callFunction({
                name: 'queryallsite',
            })
            .then(res => {
                console.log('success', res.result.data)
                wx.stopPullDownRefresh()
                this.setData({
                    site_all_list: res.result.data,
                })
                this.location()
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    getSiteList() {
        let category = this.data.category
        console.log(this.data.category)

        let site_list = this.data.list.list[category - 1].site_list
        let marker = []
        for (let i = 0; i < site_list.length; i++) {
            let la = site_list[i].latitude
            let lo = site_list[i].longitude
            let name = site_list[i].name
            let m = {
                id: i + 1,
                latitude: la,
                longitude: lo,
                title: name,
                iconPath: "https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker1_Activated@3x.png",
                width: 30,
                height: 30,
                callout: {
                    content: " " + name + " ",
                    display: 'ALWAYS',
                    padding: 1,
                    borderRadius: 4
                }
            }
            marker.push(m)
        }
        marker.push(this.data.mylocationmarkers)
        console.log(marker)
        this.setData({
            site_list: site_list,
            markers: marker
        })
        if (this.data.ishow) {
            this.includepoints()
        }

    },

    click(e) {
        console.log(e.currentTarget.dataset.s_id)
        let id = e.currentTarget.dataset.s_id
        console.log(this.data.site_all_list)
        let site_list = this.data.site_all_list[id - 1]
        console.log(site_list)
        var that = this
        // 浏览次数加1
        wx.cloud.callFunction({
            name: 'browse',
            data: {
                id: id,
            }
        })
        wx.showModal({
            title: site_list.name,
            content: site_list.desc,
            confirmText: "设为终点",
            cancelText: "设为起点",
            complete: (res) => {
                if (res.cancel) {
                    that.setData({
                        site_begin: id,
                        search_begin: 0
                    })
                }
                if (res.confirm) {
                    that.setData({
                        site_end: id,
                        search_end: 0
                    })
                }
            }
        })
    },

    taptosearch(e) {
        console.log(e.currentTarget.dataset.search_id)
        wx.navigateTo({
            url: '../map/search/search?id=' + e.currentTarget.dataset.search_id,
        })
    },
    //路线规划
    routePlan() {
        console.log(this.data.site_end)
        if (this.data.site_end != -1) {
            let key = this.data.subKey //使用在腾讯位置服务申请的key
            let referer = this.data.miniprogram_name; //调用插件的app的名称
            let mode = 'walking'; //出行规划方式-步行

            let begin = ""
            if (this.data.search_begin == 0) {
                begin = this.data.site_all_list[this.data.site_begin - 1]
            } else if (this.data.search_begin == 1) {
                begin = this.data.site_all_list[this.data.search_site_id - 1]
            }
            let beginPoint = JSON.stringify({ //起点
                name: begin.name,
                latitude: begin.latitude,
                longitude: begin.longitude
            });

            let end = ""
            if (this.data.search_end == 0) {
                end = this.data.site_all_list[this.data.site_end - 1]
            } else if (this.data.search_end == 1) {
                end = this.data.site_all_list[this.data.search_site_id - 1]
            }
            let endPoint = JSON.stringify({ //终点
                name: end.name,
                latitude: end.latitude,
                longitude: end.longitude
            });

            if (beginPoint == endPoint) {
                wx.showToast({
                    title: '起点和终点不能相同哦！',
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

    toinstruction() {
        wx.navigateTo({
            url: '../../pages/map/instruction/instruction',
        })
    }
})
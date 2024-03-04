// pages/admin/getpoint/getpoint.js
var media = require('../../../../utils/media');
var map = require('../../../../utils/map');
let db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        circle: media.circle,
        map_bottom: null,

        subKey: map.mapKey,
        scale: map.scale,
        enable_poi: map.enablepoi,
        location: {
            latitude: map.latitude,
            longitude: map.longitude,
        },
        groundoverlay: map.groundoverlay,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        if (options.lo && options.la) {
            this.setData({
                location: {
                    longitude: options.lo,
                    latitude: options.la
                },
            })
        }
        this.addMarkers()
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
        this.mapCtx = wx.createMapContext('map', this)
    },

    // 获取自定义图层
    get() {
        db.collection('media')
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

    // 初始化map组件
    map() {
        var map_bottom = this.data.map_bottom
        var groundoverlay = this.data.groundoverlay
        this.mapCtx = wx.createMapContext('map')
        this.mapCtx.addGroundOverlay({
            id: 0,
            src: map_bottom,
            bounds: {
                southwest: { //西南角
                    latitude: groundoverlay.southwest_latitude,
                    longitude: groundoverlay.southwest_longitude,
                },
                northeast: { //东北角
                    latitude: groundoverlay.northeast_latitude,
                    longitude: groundoverlay.northeast_longitude,
                }
            },
            opacity: groundoverlay.opacity,
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
    },

    // 地图视野变化
    bindregionchange: function (e) {
        // console.log(e.type, e.causedBy)
        if (e.type == 'end' && (e.causedBy == "scale" || e.causedBy == "drag")) {
            this.getCenterLocation()
        }
    },

    // 获取中心点坐标
    getCenterLocation: function () {
        var that = this
        this.mapCtx = wx.createMapContext('map')
        this.mapCtx.getCenterLocation({
            success: function (res) {
                // console.log(res)
                // console.log("longitude:" + res.longitude + ", latitude:" + res.latitude)

                that.changeCenterLocation(res.latitude, res.longitude)
            }
        })
    },

    // 改变中心点坐标
    changeCenterLocation(latitude, longitude) {
        console.log(latitude, longitude)
        this.setData({
            location: {
                longitude: longitude.toFixed(6),
                latitude: latitude.toFixed(6),
            },
        })
        this.addMarkers()
    },

    // 添加标记点
    addMarkers: function () {
        var location = this.data.location
        this.mapCtx = wx.createMapContext('map')
        this.mapCtx.addMarkers({
            markers: [{
                id: 0,
                iconPath: `https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker3_Activated@3x.png`,
                latitude: location.latitude,
                longitude: location.longitude,
                width: 30,
                height: 30,
                callout: {
                    content: " " + location.latitude + "  " + location.longitude + " ",
                    display: 'ALWAYS',
                    padding: 1
                }
            }],
            clear: true,
        })
    },

    // 获取地点经纬度并返回
    getPoint() {
        console.log(this.data.location)
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; // 上一个页面
        // 直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
            la: this.data.location.latitude,
            lo: this.data.location.longitude
        });
        wx.navigateBack({})
    }
})
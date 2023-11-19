// pages/getpoint/getpoint.js
var utils = require('../../../utils/utils.js');
let db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        circle: "../" + utils.circle,
        map_bottom: null,

        subKey: utils.mapKey,
        scale: utils.scale,
        enable_poi: utils.enablepoi,
        location: {
            latitude: utils.latitude,
            longitude: utils.longitude,
        },
        groundoverlay: utils.groundoverlay,
        markers: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        if (options.lo != "" && options.la != "") {
            this.setData({
                location: {
                    longitude: options.lo,
                    latitude: options.la
                },
            })
        }
        this.setData({
            markers: [{
                id: 0,
                iconPath: `https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker3_Activated@3x.png`,
                latitude: this.data.location.latitude,
                longitude: this.data.location.longitude,
                width: 30,
                height: 30,
                callout: {
                    content: " " + this.data.location.latitude + " " + this.data.location.longitude + " ",
                    display: 'ALWAYS',
                    padding: 1
                }
            }],
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
        this.mapCtx = wx.createMapContext('map', this)
    },

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

    map() {
        this.mapCtx = wx.createMapContext('map')
        this.mapCtx.addGroundOverlay({
            id: 0,
            src: this.data.map_bottom,
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
            opacity: this.data.groundoverlay.opacity,
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
    // 改变中心点坐标
    changeCenterLocation: function () {
        var that = this
        this.mapCtx.getCenterLocation({
            success: function (res) {
                console.log("longitude:" + res.longitude + ", latitude:" + res.latitude)
                that.setData({
                    location: {
                        longitude: res.longitude.toFixed(6),
                        latitude: res.latitude.toFixed(6),
                    },
                })
                that.addMarkers()
            }
        })
    },
    // 添加标记点
    addMarkers: function () {
        this.mapCtx.addMarkers({
            markers: [{
                id: 0,
                iconPath: `https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker3_Activated@3x.png`,
                latitude: this.data.location.latitude,
                longitude: this.data.location.longitude,
                width: 30,
                height: 30,
                callout: {
                    content: " " + this.data.location.latitude + "  " + this.data.location.longitude + " ",
                    display: 'ALWAYS',
                    padding: 1
                }
            }],
            clear: true,
        })
        console.log(this.data.markers)
    },
    // 获取地点经纬度
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
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
        scale: 16,
        enable_poi: false,
        location: {
            latitude: '25.093968',
            longitude: '110.277715',
        },
        markers: [{
            id: 0,
            iconPath: `https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker3_Activated@3x.png`,
            latitude: '25.093968',
            longitude: '110.277715',
            width: 30,
            height: 30,
        }],

        lo: '110.277715',
        la: '25.093968',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (options.lo != null && options.la != null) {
            this.setData({
                location: {
                    longitude: options.lo,
                    latitude: options.la
                },
                markers: [{
                    id: 0,
                    iconPath: `https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker3_Activated@3x.png`,
                    latitude: options.la,
                    longitude: options.lo,
                    width: 30,
                    height: 30,
                    callout: {
                        content: " "+options.la+" "+options.lo+" ",
                        display: 'ALWAYS',
                        padding: 1
                    }
                }],
                lo: options.lo,
                la: options.la
            })
        }
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
                console.log(res.longitude)
                console.log(res.latitude)
                that.setData({
                    lo: res.longitude.toFixed(6),
                    la: res.latitude.toFixed(6),
                })
                that.addMarkers()
            }
        })
    },

    addMarkers: function () {
        this.mapCtx.addMarkers({
            markers: [{
                id: 0,
                latitude: this.data.la,
                longitude: this.data.lo,
                iconPath: `https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker3_Activated@3x.png`,
                width: 30,
                height: 30,
                callout: {
                    content: " " + this.data.la + "  " + this.data.lo + " ",
                    display: 'ALWAYS',
                }
            }],
            clear: true,
        })
        console.log(this.data.markers)
    },
    // 获取地点经纬度
    getPoint() {
        console.log(this.data.la)
        console.log(this.data.lo)

        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; // 上一个页面
        // 直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
            la: this.data.la,
            lo: this.data.lo
        });
        wx.navigateBack({})
    }
})
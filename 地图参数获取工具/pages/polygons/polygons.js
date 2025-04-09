// pages/polygons/polygons.js
var map_data = require('../../data/map_data')
Page({
  data: {

    // 学校精确坐标（用于地图定位和获取天气数据）
    longitude: map_data.longitude,
    latitude: map_data.latitude,

    // 缩放级别
    scale: map_data.scale,

    markers: [],
    // 多边形
    polygons: [{
      points: [], // 给个空数组在页面刚开始渲染的时候会报错，但是不影响使用
      fillColor: "#d5dff233", // 填充颜色：淡蓝色，7-8位为十六进制透明度00-FF
      strokeColor: "#789cff", // 描边颜色：淡蓝色
      strokeWidth: 2, // 描边宽度
      zIndex: 1 // 多边形 Z 轴数值
    }],
    points: map_data.points,
    gonsArr: [],

    dialogShow: false,
    button: [{
      text: '复制'
    }],

    isShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log('options', options)
    let points = this.data.points
    if (points.length > 0) {
      let range = points
      range.map(item => {
        item.latitude = Number(item.latitude)
        item.longitude = Number(item.longitude)
      })
      // console.log('range', range);
      let markers = []
      range.map(item => {
        // console.log('item', item);
        let latitude = item.latitude
        let longitude = item.longitude
        markers.push({
          latitude: latitude,
          longitude: longitude,
          iconPath: "https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker3_Activated@3x.png",
          id: latitude,
          width: '50rpx',
          height: '50rpx'
        })
      })
      // console.log('markers', markers);
      this.setData({
        markers: markers,
        'polygons[0].points': range,
        gonsArr: range,
        longitude: options.lo,
        latitude: options.la
      })
      this.includePoints(range)
    }
  },

  // 缩放视野以包含所有给定的坐标点
  includePoints(markers) {
    // console.log('markers', markers);
    this.mapCtx = wx.createMapContext('map')
    this.mapCtx.includePoints({
      padding: [10, 10, 10, 10],
      points: markers,
    })
  },

  // 点击地图的时候
  bindMap(e) {
    let arr = this.data.gonsArr // 不直接使用polygons[0].points是因为如果不够三个点会报错
    let arr1 = this.data.markers // 点击地图添加一个标记点
    let latitude = e.detail.latitude.toFixed(6)
    let longitude = e.detail.longitude.toFixed(6)
    arr.push({
      latitude,
      longitude
    })
    arr1.push({
      latitude,
      longitude,
      iconPath: "https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker3_Activated@3x.png",
      id: latitude,
      width: '50rpx',
      height: '50rpx'
    })
    // 判断如果标记的点数大于等于3就给polygons[0].points赋值，如果小于3只添加点并且给gonsArr push一下
    if (arr.length > 2) {
      this.data.polygons[0].points = arr
      this.setData({
        polygons: this.data.polygons,
        markers: arr1,
        gonsArr: arr
      })
    } else {
      this.setData({
        markers: arr1,
        gonsArr: arr
      })
    }
  },

  // 清除上一个标记点
  clearPrevious() {
    let arr = this.data.polygons
    let markers = this.data.markers
    let gonsArr = this.data.gonsArr

    if (markers.length < 3) {
      arr[0].points = []
      gonsArr = []
    } else {
      gonsArr.pop()
    }
    markers.pop()

    this.setData({
      polygons: arr,
      markers: markers,
      gonsArr: gonsArr
    })
  },

  // 清除标记点和面
  clearGon() {
    let arr = this.data.polygons
    arr[0].points = []

    this.setData({
      polygons: arr,
      markers: [],
      gonsArr: []
    })
  },

  // 生成按钮
  generate() {
    let markers = this.data.markers

    if (markers.length >= 3) {
      let points = this.data.polygons[0].points
      var points_data = "points: " + JSON.stringify(points)
      this.setData({
        dialogShow: true,
        points_data: points_data
      })
    } else {
      wx.showToast({
        title: '不能少于三个点',
        icon: 'error'
      })
    }
  },

  // 对话框按钮
  dialogButton() {
    this.setData({
      dialogShow: false,
    })
    this.copy()
  },

  // 复制参数信息
  copy() {
    var result = this.data.points_data
    wx.setClipboardData({
      data: result,
      success(res) {
        wx.getClipboardData({
          success(res) {
            // console.log(res.data) // data
          }
        })
      }
    })
  },

  show() {
    let isShow = this.data.isShow
    let markers = this.data.markers
    markers.map(item => {
      // 标注的透明度	范围 0 ~ 1
      item.alpha = isShow ? 0 : 1
    })
    this.setData({
      isShow: !isShow,
      markers: markers
    })
    wx.showToast({
      title: !isShow ? '显示标记点' : '隐藏标记点',
      icon: 'none'
    })
  }
})
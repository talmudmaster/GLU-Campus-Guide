// pages/polygons/polygons.js
import map_data from '@data/map_data'
import img_data from '@data/img_data'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Marker2_Activated: img_data.Marker2_Activated,
    Marker3_Activated: img_data.Marker3_Activated,

    // 地图中心点坐标
    longitude: map_data.longitude,
    latitude: map_data.latitude,
    // 缩放级别
    scale: map_data.scale,
    // 标记点
    markers: [],
    // 多边形
    polygons: null,
    // 经纬度数组
    points: map_data.points ?? [],
    // 经纬度数据
    points_data: null,

    // 显示/隐藏 标记点
    isShow: true,
    // 显示/隐藏 对话框
    dialogShow: false,
    // 对话框按钮组
    buttons: [{
      text: '关闭'
    }, {
      text: '复制'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let points = this.data.points
    if (points.length > 0) {
      points.forEach(item => {
        item.latitude = Number(item.latitude)
        item.longitude = Number(item.longitude)
      })
      let markers = points.map((item, index) => ({
        id: index,
        latitude: item.latitude,
        longitude: item.longitude,
        iconPath: this.data.Marker3_Activated,
        width: 25,
        height: 25
      }));
      this.setData({
        markers,
        points,
      })

      // 判断如果标记的点数大于2就给polygons赋值
      if (points.length > 2) {
        let polygons = [{
          points,
          fillColor: "#d5dff233", // 填充颜色：淡蓝色，7-8位为十六进制透明度00-FF
          strokeColor: "#789cff", // 描边颜色：较深的淡蓝色
          strokeWidth: 2, // 描边宽度
        }]
        this.setData({
          polygons,
        })
      }
      this.includePoints()
    }
  },

  /**
   * 缩放视野以包含所有给定的坐标点
   */
  includePoints() {
    let points = this.data.points
    this.mapCtx = wx.createMapContext('map')
    this.mapCtx.includePoints({
      padding: [10, 10, 10, 10],
      points,
    })
  },

  /**
   * 绑定地图点击事件
   */
  bindMap(e) {
    let points = this.data.points // 不直接使用polygons[0].points是因为如果不够三个点会报错
    let markers = this.data.markers // 点击地图添加一个标记点
    let latitude = e.detail.latitude.toFixed(6)
    let longitude = e.detail.longitude.toFixed(6)

    points.push({
      latitude,
      longitude
    })
    let length = markers.length
    markers.push({
      id: length,
      latitude,
      longitude,
      iconPath: this.data.Marker3_Activated,
      width: 25,
      height: 25
    })

    this.setData({
      markers,
      points
    })

    // 判断如果标记的点数大于2就给polygons赋值
    if (points.length > 2) {
      let polygons = [{
        points,
        fillColor: "#d5dff233", // 填充颜色：淡蓝色，7-8位为十六进制透明度00-FF
        strokeColor: "#789cff", // 描边颜色：较深的淡蓝色
        strokeWidth: 2, // 描边宽度
      }]
      this.setData({
        polygons,
      })
    }
  },

  /**
   * 清除 上一个标记点
   */
  clearPrevious() {
    let polygons = this.data.polygons
    let markers = this.data.markers
    let points = this.data.points

    markers.pop()
    points.pop()
    if (markers.length < 3) {
      polygons = null
    } else {
      polygons[0].points = points
    }

    this.setData({
      polygons,
      markers,
      points
    })
  },

  /**
   * 清除 标记点和多边形
   */
  clearGon() {
    this.setData({
      polygons: null,
      markers: [],
      points: []
    })
  },

  /**
   * 生成数据 按钮
   */
  generate() {
    let points = this.data.points
    if (points.length > 2) {
      let points_data = "points: " + JSON.stringify(points)
      this.setData({
        dialogShow: true,
        points_data
      })
    } else {
      wx.showToast({
        title: '不能少于三个点',
        icon: 'error'
      })
    }
  },

  /**
   * 对话框 按钮
   */
  dialogButton(e) {
    this.setData({
      dialogShow: false,
    })

    let choose = e.detail.item.text
    if (choose == "复制") {
      this.copy()
    }
  },

  /**
   * 复制 参数信息
   */
  copy() {
    wx.setClipboardData({
      data: this.data.points_data,
      success() {
        wx.getClipboardData({
          success() {
            wx.showToast({
              title: '复制成功',
              icon: 'success'
            })
          }
        })
      }
    })
  },

  /**
   * 显示/隐藏标记点 按钮
   */
  show() {
    let isShow = this.data.isShow
    let markers = this.data.markers
    markers.forEach(item => {
      // 标注的透明度	范围 0 ~ 1，对应 0% ~ 100%
      item.alpha = isShow ? 0 : 1
    })
    this.setData({
      isShow: !isShow,
      markers
    })
    wx.showToast({
      title: !isShow ? '显示标记点' : '隐藏标记点',
      icon: 'none'
    })
  },

  /**
   * 跳转到 点与多边形 页面
   */
  torange() {
    let points = JSON.stringify(this.data.points)
    wx.navigateTo({
      url: './range/range?points=' + points,
    })
  },
})
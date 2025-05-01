// pages/admin/range/range.js
import map from '@data/map'
import media from '@data/media'

const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      Marker2_Activated: media.Marker2_Activated,
      Marker3_Activated: media.Marker3_Activated,

      // 地图中心点坐标
      longitude: map.longitude,
      latitude: map.latitude,
      // 缩放级别
      scale: map.scale,
      // 标记点
      markers: [],
      // 多边形
      polygons: null,
      // 经纬度数组
      points: [],
      // 显示/隐藏标记点
      isShow: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.get()
    },
    
    get() {
      db.collection('media')
        .where({
          name: "学校范围"
        })
        .get()
        .then(res => {
          console.log('success', res)
          if (res.data[0]?.range) {
            this.setData({
              points: res.data[0].range
            })
            this.map()
          }
        })
        .catch(err => {
          console.log('fail', err)
        })
    },

    map() {
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
            strokeColor: "#789cff", // 描边颜色：淡蓝色
          }]
          this.setData({
            polygons: polygons,
          })
        }
        this.includePoints()
      }
    },

    /**
     * 缩放视野以包含所有给定的坐标点
     */
    includePoints() {
      let points= this.data.points
      this.mapCtx = wx.createMapContext('map')
      this.mapCtx.includePoints({
        padding: [10, 10, 10, 10],
        points: points,
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
      
      // 判断如果标记的点数大于2就给polygons赋值
      if (points.length > 2) {
        let polygons = [{
          points,
          fillColor: "#d5dff233", // 填充颜色：淡蓝色，7-8位为十六进制透明度00-FF
          strokeColor: "#789cff", // 描边颜色：淡蓝色
        }]
        this.setData({
          polygons: polygons,
        })
      }

      this.setData({
        markers,
        points,
      })
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
        polygons: polygons,
        markers: markers,
        points: points
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
     * 获取范围 按钮
     */
    generate() {
      let points = this.data.points
      if (points.length >= 3) {
        this.update()
      } else {
        wx.showToast({
          title: '不能少于三个点',
          icon: 'error'
        })
      }
    },

    /**
     * 更新数据
     */
    update() {
      var that = this
      wx.cloud.callFunction({
        name: 'update_range',
        data: {
          range: this.data.points,
        }
      })
      .then(res => {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          that.back()
        }, 1000)
      })
      .catch(err => {
        console.log('fail', err)
      })
    },

    /**
     * 返回
     */
    back() {
      wx.navigateBack()
    },

    /**
     * 显示/隐藏标记点 按钮
     */
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
    },

    /**
     * 跳转到 点与多边形 页面
     */
    topolygons() {
      let points = JSON.stringify(this.data.points)
      wx.navigateTo({
        url: './polygons/polygons?points=' + points,
      })
    },
})
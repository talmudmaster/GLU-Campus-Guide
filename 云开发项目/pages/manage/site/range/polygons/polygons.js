// pages/manage/site/range/polygons/polygons.js
import map from '@data/map'

Page({
    /**
     * 页面的初始数据
     */
    data: {
      // 学校精确坐标（用于地图定位和获取天气数据）
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
      // 是否在多边形内部
      isAtPolygons: false
    },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let points = JSON.parse(options.points)
    let polygons = [{
      points,
      fillColor: "#d5dff233", // 填充颜色：淡蓝色，7-8位为十六进制透明度00-FF
      strokeColor: "#789cff", // 描边颜色：较深的淡蓝色
      strokeWidth: 2, // 描边宽度
    }]
    this.setData({
      polygons,
      points,
    })
    this.includePoints()
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
    let latitude = e.detail.latitude.toFixed(6)
    let longitude = e.detail.longitude.toFixed(6)
    let markers= [{
      id: 1,
      latitude,
      longitude,
      width: 25, // 默认图标的宽度
      height: 34 // 默认图标的高度
    }]
    this.setData({
      markers: markers,
    })

    let testPoint = {
      latitude: latitude,
      longitude: longitude
    }
    let polygon = this.data.points
    let bool = this.isPointInPolygon(testPoint, polygon)

    this.setData({
      isAtPolygons: bool
    })
  },

  /**
   * 判断点是否在多边形内部
   * @param {{longitude: number, latitude: number}} point - 待检测点
   * @param {{longitude: number, latitude: number}[]} polygon - 多边形顶点数组
   */
  isPointInPolygon(point, polygon) {
    // 预处理：全部转为数值
    const toNum = ({ longitude, latitude }) => ({
      longitude: +longitude,
      latitude: +latitude
    });
    point = toNum(point);
    polygon = polygon.map(v => toNum(v));

    // 检查顶点
    for (const v of polygon) {
      if (Math.abs(v.longitude - point.longitude) < 1e-9 
      && Math.abs(v.latitude - point.latitude) < 1e-9) {
        return true;
      }
    }

    // 检查边
    const n = polygon.length;
    for (let i = 0; i < n; i++) {
      const a = polygon[i];
      const b = polygon[(i + 1) % n];
      if (this.isPointOnSegment(point, a, b)) return true;
    }

    // 射线法核心逻辑
    let crossings = 0;
    for (let i = 0; i < n; i++) {
      const a = polygon[i];
      const b = polygon[(i + 1) % n];
      const [aLat, bLat] = [a.latitude, b.latitude];
      const pLat = point.latitude;

      // 边跨越射线时才处理
      if ((aLat >= pLat) === (bLat >= pLat)) continue;

      // 排除水平边
      if (aLat === bLat) continue;

      // 计算交点经度
      const t = (pLat - aLat) / (bLat - aLat);
      const intersectLon = a.longitude + t * (b.longitude - a.longitude);

      // 交点在射线右侧（经度更大）
      if (intersectLon > point.longitude + 1e-9) {
        crossings++;
      }
    }

    return crossings % 2 === 1;
  },

  /**
   * 判断点是否在多边形边上
   * @param {{longitude: number, latitude: number}} p - 待检测点
   * @param {{longitude: number, latitude: number}} a - 线段起点
   * @param {{longitude: number, latitude: number}} b - 线段终点
   */
  isPointOnSegment(p, a, b) {
    // 强制转换为数值
    const toNum = obj => ({
      longitude: +obj.longitude,
      latitude: +obj.latitude
    });
    p = toNum(p);
    a = toNum(a);
    b = toNum(b);

    // 叉积判共线
    const cross = (p.longitude - a.longitude) * (b.latitude - a.latitude) 
              - (p.latitude - a.latitude) * (b.longitude - a.longitude);
    if (Math.abs(cross) > 1e-9) return false;

    // 包围盒检查
    const minLon = Math.min(a.longitude, b.longitude);
    const maxLon = Math.max(a.longitude, b.longitude);
    const minLat = Math.min(a.latitude, b.latitude);
    const maxLat = Math.max(a.latitude, b.latitude);

    return p.longitude >= minLon - 1e-9 
        && p.longitude <= maxLon + 1e-9 
        && p.latitude >= minLat - 1e-9 
        && p.latitude <= maxLat + 1e-9;
  },
})
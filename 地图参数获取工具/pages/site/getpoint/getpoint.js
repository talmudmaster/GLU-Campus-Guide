// pages/admin/getpoint/getpoint.js
import map_data from '@data/map_data';
import img_data from '@data/img_data';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    circle: img_data.circle,
    map_bottom: map_data.map_bottom,
    Marker3_Activated: img_data.Marker3_Activated,

    scale: map_data.scale,
    enable_poi: map_data.enablepoi,
    location: {
      latitude: map_data.latitude,
      longitude: map_data.longitude,
    },
    groundoverlay: map_data.groundoverlay,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.lo && options.la) {
      this.setData({
        location: {
          longitude: options.lo,
          latitude: options.la,
        },
      });
    }
    this.addMarkers();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.mapCtx = wx.createMapContext('map', this);
  },

  // 初始化map组件
  map() {
    var map_bottom = this.data.map_bottom;
    var groundoverlay = this.data.groundoverlay;
    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.addGroundOverlay({
      id: 0,
      src: map_bottom,
      bounds: {
        southwest: {
          // 西南角
          latitude: groundoverlay.southwest_latitude,
          longitude: groundoverlay.southwest_longitude,
        },
        northeast: {
          // 东北角
          latitude: groundoverlay.northeast_latitude,
          longitude: groundoverlay.northeast_longitude,
        },
      },
      opacity: groundoverlay.opacity,
    });
  },

  // 地图视野变化
  bindregionchange(e) {
    if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
      this.getCenterLocation();
    }
  },

  // 获取中心点坐标
  getCenterLocation() {
    var _this = this;
    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.getCenterLocation({
      success(res) {
        _this.changeCenterLocation(res.latitude, res.longitude);
      },
    });
  },

  // 改变中心点坐标
  changeCenterLocation(latitude, longitude) {
    this.setData({
      location: {
        longitude: longitude.toFixed(6),
        latitude: latitude.toFixed(6),
      },
    });
    this.addMarkers();
  },

  // 添加标记点
  addMarkers() {
    var location = this.data.location;
    var Marker3_Activated = this.data.Marker3_Activated;
    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.addMarkers({
      markers: [
        {
          id: 0,
          iconPath: Marker3_Activated,
          latitude: location.latitude,
          longitude: location.longitude,
          width: 30,
          height: 30,
          callout: {
            content: ' ' + location.latitude + '  ' + location.longitude + ' ',
            display: 'ALWAYS',
            padding: 1,
          },
        },
      ],
      clear: true,
    });
  },

  // 获取地点经纬度并返回
  getPoint() {
    console.log(this.data.location);
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一个页面
    // 直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      ['formData.la']: this.data.location.latitude,
      ['formData.lo']: this.data.location.longitude,
      ['formData.location']: 1,
    });
    wx.navigateBack({});
  },
});

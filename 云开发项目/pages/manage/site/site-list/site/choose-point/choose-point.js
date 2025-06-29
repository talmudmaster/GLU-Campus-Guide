// pages/manage/site/site-list/site/choose-point/choose-point.js
import map from '@data/map';
import media from '@data/media';

const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    circle: media.circle,
    Marker3_Activated: media.Marker3_Activated,
    map_bottom: null,

    scale: map.scale,
    enable_poi: map.enablepoi,
    location: {
      latitude: null,
      longitude: null,
    },
    polygons: null,
    groundoverlay: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let isUseMapImg = options.isUseMapImg === 'true' ? true : false;
    let range = [];
    if (options.range) {
      range = JSON.parse(options.range);
    }

    if (options.lo && options.la) {
      this.setData({
        location: {
          longitude: options.lo,
          latitude: options.la,
        },
      });
    } else if (options.campus_la && options.campus_lo) {
      this.setData({
        location: {
          longitude: options.campus_lo,
          latitude: options.campus_la,
        },
      });
    }

    if (options.img && isUseMapImg) {
      let bounds = JSON.parse(options.bounds);
      let groundoverlay = {
        src: options.img,
        bounds: {
          southwest: {
            longitude: Number(bounds.west),
            latitude: Number(bounds.south),
          },
          northeast: {
            longitude: Number(bounds.east),
            latitude: Number(bounds.north),
          },
        },
      };
      this.setData({
        groundoverlay,
      });
      this.map();
    } else if (range.length) {
      let polygons = [
        {
          points: range,
          fillColor: '#d5dff233',
          strokeColor: '#789cff',
          strokeWidth: 2,
          zIndex: 1,
        },
      ];
      this.setData({
        polygons,
      });
    }

    this.addMarkers();
  },

  // 获取自定义图层
  get() {
    db.collection('media')
      .where({
        name: '地图',
      })
      .get()
      .then(res => {
        this.setData({
          map_bottom: res.data[0].img,
        });
        this.map();
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  // 初始化map组件
  map() {
    var groundoverlay = this.data.groundoverlay;

    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.addGroundOverlay({
      id: 0,
      src: groundoverlay.src,
      bounds: groundoverlay.bounds,
      success(res) {
        console.log('success', res);
      },
      fail(err) {
        console.log('fail', err);
      },
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
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一个页面
    // 直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      la: this.data.location.latitude,
      lo: this.data.location.longitude,
    });
    wx.navigateBack();
  },
});

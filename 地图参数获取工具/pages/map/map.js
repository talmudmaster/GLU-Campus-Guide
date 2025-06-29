// pages/map/map.js
import map_data from '@data/map_data';
import img_data from '@data/img_data';

// 引入SDK核心类
const QQMapWX = require('@libs/qqmap-wx-jssdk.min');

// 实例化API核心类
const qqmapsdk = new QQMapWX({
  key: map_data.mapKey,
});

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 图片

    plus: img_data.plus,
    minus: img_data.minus,
    startImg: img_data.start,
    endImg: img_data.end,
    car: img_data.car,
    Marker3_Activated: img_data.Marker3_Activated,

    // 地图相关数据

    // 学校精确坐标（用于地图定位和获取天气数据）
    longitude: map_data.longitude,
    latitude: map_data.latitude,

    // 是否展示 POI 点
    enablepoi: map_data.enablepoi,
    // 是否显示带有方向的当前定位点
    showLocation: map_data.showLocation,
    // 缩放级别
    scale: map_data.scale,
    // 最小缩放级别，比缩放级别小0.2-0.3为宜
    minscale: map_data.minscale,

    // 自定义图层
    boundary: map_data.boundary,
    bounds: map_data.bounds,

    // 自定义地图
    map_bottom: map_data.img,

    // 闭合多边形（学校边界范围）
    polygons: null,

    // 经纬度数组
    points: map_data.range ?? [],

    // 是否使用地图
    isUseMapImg: map_data.isUseMapImg,

    // 起点、终点的坐标
    start: {
      latitude: '',
      longitude: '',
    },
    end: {
      latitude: '',
      longitude: '',
    },
    temp: {
      latitude: '',
      longitude: '',
    },

    markers: [],
    polyline: [],

    dialogShow: false,
    button: [
      {
        text: '关闭',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let points = this.data.points;
    let isUseMapImg = this.data.isUseMapImg;
    this.mapCtx = wx.createMapContext('map');
    if (!isUseMapImg && points.length > 2) {
      let polygons = [
        {
          points,
          fillColor: '#d5dff233', // 填充颜色：淡蓝色，7-8位为十六进制透明度00-FF
          strokeColor: '#789cff', // 描边颜色：较深的淡蓝色
          strokeWidth: 2, // 描边宽度
        },
      ];
      this.setData({
        polygons,
      });
      this.includePoints();
    } else if (isUseMapImg) {
      var bounds = this.data.bounds;
      var map_bottom = this.data.map_bottom;
      this.mapCtx.addGroundOverlay({
        id: 0,
        src: map_bottom,
        opacity: bounds.opacity, // 图层透明度
        bounds: {
          // 西南角
          southwest: {
            latitude: bounds.south,
            longitude: bounds.west,
          },
          // 东北角
          northeast: {
            latitude: bounds.east,
            longitude: bounds.north,
          },
        },
      });
    }

    // var boundary = this.data.boundary
    // this.mapCtx.setBoundary({
    //   southwest: { // 西南角
    //     latitude: boundary.southwest_latitude,
    //     longitude: boundary.southwest_longitude,
    //   },
    //   northeast: { // 东北角
    //     latitude: boundary.northeast_latitude,
    //     longitude: boundary.northeast_longitude,
    //   }
    // })
  },

  // 监听视野变化
  bindregionchange(e) {
    // 视野变化结束
    if (e.type == 'end') {
      // 拖动或者缩放
      if (e.causedBy == 'scale' || e.causedBy == 'drag') {
        // this.map()
      }
    }
  },

  // 监听地图缩放级别（放大）
  onIncreaseScale() {
    var scale = this.data.scale;
    if (scale === 20) {
      return;
    }
    // 地图缩放级别放大1
    scale += 1;
    scale = parseFloat(scale.toFixed(1));
    this.setData({
      scale,
    });
  },

  // 监听地图缩放级别（缩小）
  onDecreaseScale() {
    var scale = this.data.scale;
    if (scale === 3) {
      return;
    }
    // 地图缩放级别减小1
    scale -= 1;
    scale = parseFloat(scale.toFixed(1));
    this.setData({
      scale,
    });
  },

  // 设定起点
  start() {
    var temp = this.data.temp;
    if (temp.latitude == '' || temp.longitude == '') {
      wx.showToast({
        title: '请选择起点',
        icon: 'error',
      });
    } else {
      this.setData({
        start: temp,
      });
    }
  },

  // 设定终点
  end() {
    var temp = this.data.temp;
    if (temp.latitude == '' || temp.longitude == '') {
      wx.showToast({
        title: '请选择终点',
        icon: 'error',
      });
    } else {
      this.setData({
        end: temp,
      });
    }
  },

  // 路线规划前的判断
  route() {
    var start = this.data.start;
    var end = this.data.end;
    if (
      start.latitude == '' ||
      start.longitude == '' ||
      end.latitude == '' ||
      end.longitude == ''
    ) {
      wx.showToast({
        title: '请选择起点和终点',
        icon: 'error',
      });
    } else if (start == end) {
      wx.showToast({
        title: '起点和终点不能相同',
        icon: 'error',
      });
    } else {
      this.formSubmit();
    }
  },

  //触发表单提交事件，调用接口
  formSubmit() {
    var start = this.data.start;
    var end = this.data.end;
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'walking', // 可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving'，可不填
      from: start, // from参数不填默认当前地址
      to: end,
      success(res) {
        var ret = res;
        // 获取各个步骤的polyline
        var coors = ret.result.routes[0].polyline;
        // 点串数组，第一格为起点
        var pl = [
          {
            latitude: start.latitude,
            longitude: start.longitude,
          },
        ];
        // 坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        // 将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1],
          });
        }
        // 点串数组，最后一格为起点
        pl.push({
          latitude: end.latitude,
          longitude: end.longitude,
        });
        // 设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          polyline: [
            {
              points: pl,
              color: '#58c16c',
              width: 10,
              borderColor: '#2f693c',
              borderWidth: 2,
              arrowLine: true,
            },
          ],
        });
        _this.includePoints();
      },
      fail(error) {
        console.error(error);
      },
    });
    let startImg = this.data.startImg;
    let endImg = this.data.endImg;
    let car = this.data.car;
    // 添加标记点
    this.mapCtx.addMarkers({
      markers: [
        {
          id: 0,
          latitude: start.latitude,
          longitude: start.longitude,
          iconPath: startImg,
          width: 25,
          height: 37,
          callout: {
            content: ' ' + '我的位置' + ' ',
            fontSize: 20,
            display: 'ALWAYS',
            padding: 10,
          },
        },
        {
          id: 1,
          latitude: end.latitude,
          longitude: end.longitude,
          iconPath: endImg,
          width: 25,
          height: 37,
          callout: {
            content: ' ' + '终点' + ' ',
            fontSize: 20,
            display: 'ALWAYS',
            padding: 10,
          },
        },
      ],
      clear: true,
    });
  },

  // 缩放视野展示所有标注点
  includePoints() {
    let points = this.data.points;
    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.includePoints({
      padding: [20, 20, 20, 20],
      points,
    });
  },

  // 清空路线
  clean() {
    this.setData({
      polyline: [],
    });
    this.mapCtx.removeMarkers({
      markerIds: [0, 1],
    });
  },

  // 生成当前地图全部参数
  generate() {
    this.setData({
      dialogShow: true,
    });
    this.map();
  },

  // 点击地图事件
  onTapMap(e) {
    var la = e.detail.latitude;
    var lo = e.detail.longitude;

    var latitude = la.toFixed(6);
    var longitude = lo.toFixed(6);
    var Marker3_Activated = this.data.Marker3_Activated;

    this.setData({
      mapCallbackTxt: latitude + ',' + longitude,
      markers: [
        {
          id: 0,
          iconPath: Marker3_Activated,
          latitude,
          longitude,
          width: 30,
          height: 30,
        },
      ],
      temp: {
        latitude,
        longitude,
      },
    });

    this.mapCtx.addMarkers({
      markers: [
        {
          id: 0,
          iconPath: Marker3_Activated,
          latitude,
          longitude,
          width: 30,
          height: 30,
          callout: {
            content: ' ' + latitude + '  ' + longitude + ' ',
            display: 'ALWAYS',
            padding: 1,
          },
        },
      ],
      clear: true,
    });
  },

  // 设置当前地图各项参数
  map() {
    var _this = this;

    // 获取当前地图中心的经纬度
    this.mapCtx.getCenterLocation({
      success(res) {
        var latitude = res.latitude.toFixed(6);
        var longitude = res.longitude.toFixed(6);

        var centerLocation_data =
          'longitude: ' + longitude + ',' + '\n' + 'latitude: ' + latitude + ',';

        _this.setData({
          centerLocation_data: centerLocation_data,
        });
      },
    });

    // 获取当前地图的视野范围
    this.mapCtx.getRegion({
      success(res) {
        var boundary_data =
          '// 南' +
          '\n' +
          'south: ' +
          res.southwest.latitude.toFixed(6) +
          ',' +
          '\n' +
          '// 西' +
          '\n' +
          'west: ' +
          res.southwest.longitude.toFixed(6) +
          ',' +
          '\n' +
          '// 北' +
          '\n' +
          'north: ' +
          res.northeast.latitude.toFixed(6) +
          ',' +
          '\n' +
          '// 东' +
          '\n' +
          'east: ' +
          res.northeast.longitude.toFixed(6) +
          ',';

        _this.setData({
          boundary_data: boundary_data,
        });
      },
    });

    // 获取当前地图的缩放级别
    this.mapCtx.getScale({
      success(res) {
        var scale_data = 'scale: ' + res.scale.toFixed(1) + ',';

        _this.setData({
          scale_data,
        });
      },
    });
  },

  // 对话框按钮
  dialogButton() {
    this.setData({
      dialogShow: false,
    });
  },

  // 复制参数信息
  getInfo(e) {
    let id = e.currentTarget.dataset.id;
    var result = '';

    if (id == 1) {
      result = this.data.scale_data;
    } else if (id == 2) {
      result = this.data.boundary_data;
    } else if (id == 3) {
      result = this.data.centerLocation_data;
    }

    wx.setClipboardData({
      data: result,
    });
  },
});

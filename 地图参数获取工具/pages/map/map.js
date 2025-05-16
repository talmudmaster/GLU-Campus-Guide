// pages/map/map.js
import map_data from '@data/map_data'
import img_data from '@data/img_data'

// 引入SDK核心类
const QQMapWX = require('@libs/qqmap-wx-jssdk.min')

// 实例化API核心类
const qqmapsdk = new QQMapWX({
  key: map_data.mapKey
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

    // 地图边界
    boundary: map_data.boundary,

    // 学校边界
    school_boundary: map_data.school_boundary,

    // 自定义图层
    groundoverlay: map_data.groundoverlay,

    // 自定义地图
    map_bottom: map_data.map_bottom,

    // 闭合多边形
    polygons: null,

    // 经纬度数组
    points: map_data.points ?? [],

    // 起点、终点的坐标
    start: {
      latitude: "",
      longitude: "",
    },
    end: {
      latitude: "",
      longitude: "",
    },
    temp: {
      latitude: "",
      longitude: "",
    },

    markers: [],
    polyline: [],

    dialogShow: false,
    button: [{
      text: '关闭'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let points = this.data.points
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

    this.mapCtx = wx.createMapContext('map')
    
    var boundary = this.data.boundary
    // this.mapCtx.setBoundary({
    //   southwest: { //西南角
    //     latitude: boundary.southwest_latitude,
    //     longitude: boundary.southwest_longitude,
    //   },
    //   northeast: { //东北角
    //     latitude: boundary.northeast_latitude,
    //     longitude: boundary.northeast_longitude,
    //   }
    // })

    var groundoverlay = this.data.groundoverlay
    var map_bottom = this.data.map_bottom
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
      opacity: groundoverlay.opacity, //图层透明度
    })
  },

  // 监听视野变化
  bindregionchange(e) {
    if (e.type == 'end') {
      if (e.causedBy == "scale" || e.causedBy == "drag") {
        console.log("地图进行了缩放或拖动")
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
    scale += 0.1;
    console.log("地图缩放级别放大了0.1，现在是", scale.toFixed(2))
    this.setData({
      scale: scale
    });
  },

  // 监听地图缩放级别（缩小）
  onDecreaseScale() {
    var scale = this.data.scale;
    if (scale === 3) {
      return;
    }
    scale -= 0.1;
    console.log("地图缩放级别减小了0.1，现在是", scale.toFixed(2))
    this.setData({
      scale: scale
    });
  },

  // 设定起点
  start() {
    var temp = this.data.temp
    console.log("设为起点", temp)
    if (temp.latitude == "" || temp.longitude == "") {
      wx.showToast({
        title: '请选择起点',
        icon: 'error'
      })
    } else {
      this.setData({
        start: temp
      })
    }
  },

  // 设定终点
  end() {
    var temp = this.data.temp
    console.log("设为终点", temp)
    if (temp.latitude == "" || temp.longitude == "") {
      wx.showToast({
        title: '请选择终点',
        icon: 'error'
      })
    } else {
      this.setData({
        end: temp
      })
    }
  },

  // 路线规划前的判断
  route() {
    var start = this.data.start
    var end = this.data.end
    if (start.latitude == "" || start.longitude == "" || end.latitude == "" || end.longitude == "") {
      wx.showToast({
        title: '请选择起点和终点',
        icon: 'error'
      })
    } else if (start == end) {
      wx.showToast({
        title: '起点和终点不能相同',
        icon: 'error'
      })
    } else {
      this.formSubmit()
    }
  },

  //触发表单提交事件，调用接口
  formSubmit() {
    var start = this.data.start
    var end = this.data.end
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'walking', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving'，可不填
      from: start, //from参数不填默认当前地址
      to: end,
      success(res) {
        console.log("接口返回数据", res.result.routes[0]);
        var ret = res;
        //获取各个步骤的polyline
        var coors = ret.result.routes[0].polyline
        // 点串数组，第一格为起点
        var pl = [{
          latitude: start.latitude,
          longitude: start.longitude
        }];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        // 点串数组，最后一格为起点
        pl.push({
          latitude: end.latitude,
          longitude: end.longitude
        })
        console.log("点串数组", pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          polyline: [{
            points: pl,
            color: '#58c16c',
            width: 10,
            borderColor: '#2f693c',
            borderWidth: 2,
            arrowLine: true
          }]
        })
        _this.includePoints()
      },
      fail(error) {
        console.error(error);
      },
    });
    let startImg = this.data.startImg
    let endImg = this.data.endImg
    let car = this.data.car
    // 添加标记点
    this.mapCtx.addMarkers({
      markers: [{
          id: 0,
          latitude: start.latitude,
          longitude: start.longitude,
          iconPath: startImg,
          width: 25,
          height: 37,
          callout: {
            content: " " + "我的位置" + " ",
            fontSize: 20,
            display: 'ALWAYS',
            padding: 10
          }
        },
        {
          id: 1,
          latitude: end.latitude,
          longitude: end.longitude,
          iconPath: endImg,
          width: 25,
          height: 37,
          callout: {
            content: " " + "终点" + " ",
            fontSize: 20,
            display: 'ALWAYS',
            padding: 10
          },
        }
      ],
      clear: true,
    })
  },

  // 缩放视野展示所有标注点
  includePoints() {
    var points = Array.from(this.data.polyline[0].points)
    this.mapCtx.includePoints({
      padding: [100, 40, 20, 40],
      points: points,
    })
  },

  // 清空路线
  clean() {
    console.log("已清空路线")
    this.setData({
      polyline: []
    })
    this.mapCtx.removeMarkers({
      markerIds: [0, 1]
    })
  },

  // 生成当前地图全部参数
  generate() {
    this.setData({
      dialogShow: true
    })
    // console.log("当前地图全部参数")
    this.map()
  },

  // 点击地图事件
  onTapMap(e) {
    var la = e.detail.latitude
    var lo = e.detail.longitude

    var latitude = la.toFixed(6)
    var longitude = lo.toFixed(6)
    var Marker3_Activated = this.data.Marker3_Activated

    // var location_data = "longitude: " + longitude + "," + '\n' + "latitude: " + latitude + ","
    // console.log("地点坐标：" + '\n' + location_data)
    // console.log("可用于学校区域经纬度的选取" + '\n' + "东(右) / 西(左) 经度： " + longitude + '\n' + "北(上) / 南(下) 纬度： " + latitude)
    // console.log("")
    this.setData({
      mapCallbackTxt: latitude + ',' + longitude,
      markers: [{
        id: 0,
        iconPath: Marker3_Activated,
        latitude: latitude,
        longitude: longitude,
        width: 30,
        height: 30
      }],
      temp: {
        latitude: latitude,
        longitude: longitude,
      },
    })

    this.mapCtx.addMarkers({
      markers: [{
        id: 0,
        iconPath: Marker3_Activated,
        latitude: latitude,
        longitude: longitude,
        width: 30,
        height: 30,
        callout: {
          content: " " + latitude + "  " + longitude + " ",
          display: 'ALWAYS',
          padding: 1
        }
      }],
      clear: true,
    })
  },

  // 打印当前地图各项参数
  map() {
    var that = this
    
    // 获取当前地图中心的经纬度
    this.mapCtx.getCenterLocation({
      success(res) {
        var latitude = res.latitude.toFixed(6)
        var longitude = res.longitude.toFixed(6)

        var centerLocation_data = "longitude: " + longitude + "," + '\n' + "latitude: " + latitude + ","

        // console.log("当前地图的中心点坐标" + '\n' + centerLocation_data)

        that.setData({
          centerLocation_data: centerLocation_data
        })
      }
    })

    // 获取当前地图的视野范围
    this.mapCtx.getRegion({
      success(res) {
        var boundary_data = "//西南角" + '\n' + "southwest_latitude: " + res.southwest.latitude.toFixed(6) + "," + '\n' + "southwest_longitude: " + res.southwest.longitude.toFixed(6) + "," + '\n' + "//东北角" + '\n' + "northeast_latitude: " + res.northeast.latitude.toFixed(6) + "," + '\n' + "northeast_longitude: " + res.northeast.longitude.toFixed(6) + ","

        // console.log("当前地图的边界" + '\n' + boundary_data)

        that.setData({
          boundary_data: boundary_data
        })
      }
    })

    // 获取当前地图的缩放级别
    this.mapCtx.getScale({
      success(res) {
        var scale_data = "scale: " + res.scale + ","
        // console.log("当前地图的缩放级别" + '\n' + scale_data)
        // console.log("\n")

        that.setData({
          scale: res.scale,
          scale_data: scale_data
        });
      }
    })
  },

  // 对话框按钮
  dialogButton() {
    this.setData({
      dialogShow: false,
    })
  },

  // 复制参数信息
  getInfo(e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    var result = ""

    if (id == 1) {
      result = this.data.scale_data
    } else if (id == 2) {
      result = this.data.boundary_data
    } else if (id == 3) {
      result = this.data.centerLocation_data
    }

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
  }
})
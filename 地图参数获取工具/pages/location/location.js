// pages/location/location.js
var map_data = require('../../data/map_data')

// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: map_data.mapKey // 必填
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 学校精确坐标（用于地图定位和获取天气数据）
    longitude: map_data.longitude,
    latitude: map_data.latitude,

    // 缩放级别
    scale: map_data.scale,
    
    markers: [],
    polyline: [],
  },

  //在Page({})中使用下列代码
  //触发表单提交事件，调用接口
  formSubmit(e) {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'walking', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from: e.detail.value.start,
      to: e.detail.value.dest,
      success: function (res) {
        var ret = res;
        var coors = ret.result.routes[0].polyline,
          pl = [{
            latitude: e.detail.value.start.split(",")[0],
            longitude: e.detail.value.start.split(",")[1]
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
        pl.push({
          latitude: e.detail.value.dest.split(",")[0],
          longitude: e.detail.value.dest.split(",")[1]
        })
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
      fail: function (error) {
        // console.error(error);
      },
      complete: function (res) {
        // console.log(res);
      }
    });

    this.setData({
      markers: [{
          id: 0,
          latitude: e.detail.value.start.split(",")[0],
          longitude: e.detail.value.start.split(",")[1],
          iconPath: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png",
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
          latitude: e.detail.value.dest.split(",")[0],
          longitude: e.detail.value.dest.split(",")[1],
          iconPath: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png",
          width: 25,
          height: 37,
          callout: {
            content: " " + "终点" + " ",
            fontSize: 20,
            display: 'ALWAYS',
            padding: 10
          },
        }
      ]
    })
  },

  includePoints() {
    var points = Array.from(this.data.polyline[0].points)
    this.mapCtx = wx.createMapContext('map')
    this.mapCtx.includePoints({
      padding: [100, 40, 20, 40],
      points: points,
    })
  }
})
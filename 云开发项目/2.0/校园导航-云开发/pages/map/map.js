// pages/map/map.js
var map = require("../../utils/map");
var media = require("../../utils/media");
var db = wx.cloud.database();

// 引入SDK核心类
var QQMapWX = require("../../libs/qqmap-wx-jssdk.min");

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: map.mapKey, // 必填
});

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 屏幕宽高
    windowHeight: 400,
    windowWidth: 400,

    scrollLeft: 0,

    category: 1,
    site: 0,

    // 图片
    location: media.location,
    use: media.use,
    restore: media.restore,

    exchange: media.exchange,
    map_bottom: media.map_bottom,

    // 自定义图层、地图、学校 边界
    groundoverlay: map.groundoverlay,
    boundary: map.boundary,
    school_boundary: map.school_boundary,

    // 默认地点
    default_point: "",
    s_id: "",

    // 地点数据
    site_data: [],

    // 地图相关属性
    subKey: map.mapKey,
    latitude: map.latitude,
    longitude: map.longitude,
    scale: map.scale,
    minscale: map.minscale,
    showLocation: map.showLocation,
    enablepoi: map.enablepoi,
    markers: [],
    polyline: [],

    mylocationmarker: "",

    duration: 0,
    distance: 0,
    steps: [],

    card: "",

    // 起点、终点的坐标和名称
    start: {
      name: "",
      latitude: "",
      longitude: "",
    },
    end: {
      name: "",
      latitude: "",
      longitude: "",
    },

    // dialog会话框属性
    dialogShow_site: false,
    dialogShow_category: false,
    dialogShow_road: false,
    buttons: [
      {
        text: "设为起点",
      },
      {
        text: "设为终点",
      },
    ],
    button: [
      {
        text: "关闭",
      },
    ],

    static: {
      currentTarget: {
        id: 0,
      },
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.get();
    // this.getdefaultsite()
    // this.lianbiaoquery()
    // this.map()
    // this.location()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const get_start = wx.getStorageSync("start");
    const get_end = wx.getStorageSync("end");
    console.log("get_start", get_start);
    console.log("get_end", get_end);
    if (get_start) {
      var start = {
        name: get_start.name,
        latitude: get_start.latitude,
        longitude: get_start.longitude,
      };
      this.setData({
        start: start,
      });
      wx.clearStorageSync();
    }
    if (get_end) {
      var end = {
        name: get_end.name,
        latitude: get_end.latitude,
        longitude: get_end.longitude,
      };
      this.setData({
        end: end,
      });
      wx.clearStorageSync();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    console.log("PullDownRefresh");
    this.onLoad();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline() {},

  // 获取地图的图片链接 和 默认地点
  get() {
    db.collection("media")
      .where({
        name: "地图",
      })
      .get()
      .then((res) => {
        console.log("success", res.data[0].img);
        this.setData({
          map_bottom: res.data[0].img,
        });
        this.map();
      })
      .catch((err) => {
        console.log("fail", err);
      });

    db.collection("media")
      .where({
        name: "默认地点",
      })
      .get()
      .then((res) => {
        console.log("success", res.data[0]);
        this.setData({
          s_id: res.data[0].s_id,
        });
        this.getDefaultSite();
      })
      .catch((err) => {
        console.log("fail", err);
      });
  },

  getDefaultSite() {
    db.collection("site")
      .doc(this.data.s_id)
      .get()
      .then((res) => {
        console.log("success", res.data);
        this.setData({
          default_point: res.data,
        });
        this.lianbiaoquery();
      })
      .catch((err) => {
        console.log("fail", err);
      });
  },

  // 联表查询
  lianbiaoquery() {
    wx.cloud
      .callFunction({
        name: "lianbiao_query",
      })
      .then((res) => {
        wx.stopPullDownRefresh();
        console.log(res.result.list);
        this.setData({
          site_data: res.result.list,
        });
        this.location();
      })
      .catch((err) => {
        console.log("fail", err);
      });
  },

  // 初始化地图
  map() {
    var that = this;
    this.mapCtx = wx.createMapContext("map");
    this.mapCtx.addGroundOverlay({
      id: 0,
      src: that.data.map_bottom,
      bounds: {
        southwest: {
          //西南角
          latitude: that.data.groundoverlay.southwest_latitude,
          longitude: that.data.groundoverlay.southwest_longitude,
        },
        northeast: {
          //东北角
          latitude: that.data.groundoverlay.northeast_latitude,
          longitude: that.data.groundoverlay.northeast_longitude,
        },
      },
      opacity: that.data.groundoverlay.opacity, //图层透明度
      success(res) {
        // console.log('wp', res)
      },
      fail(err) {
        // console.log('err', err)
      },
    });
    this.mapCtx.setBoundary({
      southwest: {
        //西南角
        latitude: that.data.boundary.southwest_latitude,
        longitude: that.data.boundary.southwest_longitude,
      },
      northeast: {
        //东北角
        latitude: that.data.boundary.northeast_latitude,
        longitude: that.data.boundary.northeast_longitude,
      },
    });
    this.mapCtx.initMarkerCluster({
      enableDefaultStyle: true, //启用默认的聚合样式
      zoomOnClick: false, //点击已经聚合的标记点时是否实现聚合分离，点击后，标记点出现在屏幕边缘
      gridSize: 30, //聚合算法的可聚合距离
      complete(res) {
        // console.log('initMarkerCluster', res)
      },
    });
  },

  // 定位
  location() {
    var that = this;
    var school_boundary = this.data.school_boundary;
    var default_point = this.data.default_point;
    var static_category = this.data.static;
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        var nowlatitude = res.latitude;
        var nowlongitude = res.longitude;
        console.log("当前位置坐标", nowlatitude, nowlongitude);
        if (
          nowlatitude > school_boundary.south &&
          nowlatitude < school_boundary.north &&
          nowlongitude > school_boundary.west &&
          nowlongitude < school_boundary.east
        ) {
          that.setData({
            mylocationmarker: {
              id: 0,
              // iconPath: "",
              latitude: nowlatitude,
              longitude: nowlongitude,
              width: 25,
              height: 37,
              callout: {
                content: " 当前位置 ",
                display: "ALWAYS",
                padding: 5,
                borderRadius: 10,
              },
              joinCluster: true,
            },
            start: {
              name: "当前位置",
              latitude: nowlatitude,
              longitude: nowlongitude,
            },
          });
        } else {
          that.setData({
            mylocationmarker: {
              id: 0,
              // iconPath: "",
              latitude: default_point.latitude,
              longitude: default_point.longitude,
              width: 25,
              height: 37,
              callout: {
                content: " " + default_point.name + " ",
                display: "ALWAYS",
                padding: 5,
                borderRadius: 10,
              },
              joinCluster: true,
            },
            start: {
              name: default_point.name,
              latitude: default_point.latitude,
              longitude: default_point.longitude,
            },
          });

          wx.showToast({
            title:
              "当前位置不在校区内\n默认位置设为" + that.data.default_point.name,
            icon: "none",
            duration: 2000,
          });
        }
        that.changeCategory(static_category);
      },
      fail: function (err) {
        wx.showToast({
          title: "请不要频繁定位\n5秒后再试试吧",
          icon: "none",
          duration: 2000,
        });
        that.changeCategory(static_category);
      },
    });
  },

  // 交换起点与终点
  exchange() {
    if (this.data.end.name != "") {
      let start = this.data.start;
      let end = this.data.end;
      if (start.latitude == end.latitude && start.longitude == end.longitude) {
        wx.showToast({
          title: "起点和终点不能相同",
          icon: "none",
          duration: 2000,
        });
      } else {
        this.setData({
          end: start,
          start: end,
        });
        this.formSubmit();
      }
    } else {
      wx.showToast({
        title: "请选择终点！",
        icon: "none",
        duration: 2000,
      });
    }
  },

  // 点击地图标记点时触发事件
  markertap(e) {
    if (this.data.polyline.length == 0) {
      console.log(e.markerId);
      if (e.markerId == 0) {
        var site = this.data.default_point;
      } else {
        var site = this.data.site_data[this.data.category].list[e.markerId - 1];
      }
      this.setData({
        dialogShow_site: true,
        card: site,
      });

      var _id = site._id;
      console.log(_id);
      // 浏览次数加1
      wx.cloud.callFunction({
        name: "browse",
        data: {
          _id: _id,
        },
        success(res) {
          console.log("浏览量+1");
        },
      });
    }
  },

  // 底部按钮（路线详情和类别地点）
  clickButton() {
    if (this.data.polyline.length == 0) {
      this.setData({
        dialogShow_category: true,
      });
    } else {
      this.setData({
        dialogShow_road: true,
      });
    }
  },

  // mpdialog “关闭” 按钮点击事件
  mapmarker_close() {
    this.setData({
      dialogShow_category: false,
      dialogShow_road: false,
    });
  },

  // 预览图片
  lookPhoto(e) {
    console.log("点击了图片", e.target.dataset.src);
    var url = e.target.dataset.src;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url], // 需要预览的图片http链接列表
    });
  },

  // mpdialog “设为起点”和“设为终点” 按钮点击事件
  mapmarker_choose(e) {
    this.setData({
      dialogShow_site: false,
    });
    var choose = e.detail.item.text;
    var card = {
      name: this.data.card.name,
      latitude: this.data.card.latitude,
      longitude: this.data.card.longitude,
    };
    console.log("选择地点", card);
    if (choose == "设为起点") {
      this.setData({
        start: card,
      });
    } else {
      this.setData({
        end: card,
      });
    }
  },

  // 切换类别
  changeCategory(e) {
    console.log("类别", e.currentTarget.id);
    var category = e.currentTarget.id;
    var scrollLeft = (category - 1) * 60;
    this.setData({
      scrollLeft: scrollLeft,
      category: category,
      polyline: [],
      markers: [],
    });

    var site_list = this.data.site_data[this.data.category].list;
    console.log("当前类别", site_list);
    var markers = [];
    markers.push(this.data.mylocationmarker);
    for (let i = 0; i < site_list.length; i++) {
      let la = site_list[i].latitude;
      let lo = site_list[i].longitude;
      let name = site_list[i].name;
      let m = {
        id: i + 1,
        latitude: la,
        longitude: lo,
        iconPath:
          "https://3gimg.qq.com/lightmap/xcx/demoCenter/images/Marker3_Activated@3x.png",
        width: 30,
        height: 30,
        callout: {
          content: " " + name + " ",
          display: "ALWAYS",
          padding: 5,
          borderRadius: 10,
        },
        joinCluster: true,
      };
      markers.push(m);
    }
    console.log("当前marker点", markers);
    this.setData({
      markers: markers,
    });
    console.log("markers", this.data.markers);
    this.mapCtx = wx.createMapContext("map");
    this.mapCtx.includePoints({
      padding: [60, 20, 40, 40],
      points: markers,
      success(res) {
        console.log("success", res, markers);
      },
    });
  },

  // 缩放视野以包含所有给定的坐标点
  includePoints() {
    var points = Array.from(this.data.polyline[0].points);
    this.mapCtx = wx.createMapContext("map");
    this.mapCtx.includePoints({
      padding: [100, 60, 60, 60],
      points: points,
    });
  },

  // “还原” 按钮
  restore() {
    let e = {
      currentTarget: {
        id: this.data.category,
      },
    };
    this.changeCategory(e);
  },

  // 跳转至搜索页
  tosearch(e) {
    wx.navigateTo({
      url: "../map/search/search?id=" + e.currentTarget.dataset.search_id,
    });
  },

  // 跳转至使用说明页
  toinstruction() {
    wx.navigateTo({
      url: "../../pages/map/instruction/instruction",
    });
  },

  // 触发表单提交事件，调用接口
  formSubmit() {
    var _this = this;

    if (this.data.end.name != "") {
      let start = this.data.start;
      let end = this.data.end;
      if (start.latitude == end.latitude && start.longitude == end.longitude) {
        wx.showToast({
          title: "起点和终点不能相同",
          icon: "none",
          duration: 2000,
        });
      } else {
        //调用距离计算接口
        qqmapsdk.direction({
          mode: "walking", //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
          //from参数不填默认当前地址
          from: start.latitude + "," + start.longitude,
          to: end.latitude + "," + end.longitude,
          success: function (res) {
            // console.log(res.result.routes[0]);
            var ret = res;
            var duration = ret.result.routes[0].duration;
            var distance = ret.result.routes[0].distance;
            console.log("时间", duration, "距离", distance);
            var coors = ret.result.routes[0].polyline,
              pl = [
                {
                  latitude: start.latitude,
                  longitude: start.longitude,
                },
              ];
            //坐标解压（返回的点串坐标，通过前向差分进行压缩）
            var kr = 1000000;
            for (var i = 2; i < coors.length; i++) {
              coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
            }
            //将解压后的坐标放入点串数组pl中
            for (var i = 0; i < coors.length; i += 2) {
              pl.push({
                latitude: coors[i],
                longitude: coors[i + 1],
              });
            }
            pl.push({
              latitude: end.latitude,
              longitude: end.longitude,
            });
            console.log("路线", pl);
            //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
            _this.setData({
              polyline: [
                {
                  points: pl,
                  color: "#58c16c",
                  width: 10,
                  borderColor: "#2f693c",
                  borderWidth: 2,
                  arrowLine: true,
                },
              ],
              steps: ret.result.routes[0].steps,
              distance: distance,
              duration: duration,
            });
            _this.includePoints();
            _this.moveAlong();
          },
          fail: function (error) {
            // console.error(error);
          },
          complete: function (res) {
            // console.log(res);
          },
        });

        this.setData({
          markers: [
            {
              id: 0,
              latitude: start.latitude,
              longitude: start.longitude,
              iconPath:
                "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png",
              width: 25,
              height: 37,
              callout: {
                content: " " + start.name + " ",
                display: "ALWAYS",
                padding: 5,
                borderRadius: 10,
              },
            },
            {
              id: 1,
              latitude: end.latitude,
              longitude: end.longitude,
              iconPath:
                "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png",
              width: 25,
              height: 37,
              callout: {
                content: " " + end.name + " ",
                display: "ALWAYS",
                padding: 5,
                borderRadius: 10,
              },
            },
            {
              id: 2,
              latitude: start.latitude,
              longitude: start.longitude,
              iconPath:
                "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/car.png",
              width: 30,
              height: 30,
              callout: {
                content: " 移动中 ",
                display: "ALWAYS",
                padding: 5,
                borderRadius: 10,
              },
            },
          ],
        });
      }
    } else {
      wx.showToast({
        title: "请选择终点！",
        icon: "none",
        duration: 2000,
      });
    }
  },

  // 轨迹回放
  moveAlong() {
    var that = this;
    var markers = this.data.markers;
    var points = this.data.polyline[0].points;
    this.mapCtx = wx.createMapContext("map");
    this.mapCtx.moveAlong({
      markerId: 2,
      path: points,
      duration: 4000,
      autoRotate: true,
      success: function (res) {
        markers.pop();
        that.setData({
          markers: markers,
        });
      },
    });
  },
});

// pages/map/map.js
import map from '@data/map';
import media from '@data/media';

// 引入SDK核心类
const QQMapWX = require('@libs/qqmap-wx-jssdk.min');

// 实例化API核心类
const qqmapsdk = new QQMapWX({
  key: map.mapKey, // 必填
});

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    mode: 'walking',

    scrollLeft: 0,

    category: 1,
    site: 0,

    // 图片
    location: media.location,
    use: media.use,
    restore: media.restore,

    exchange: media.exchange,
    map_bottom: media.map_bottom,
    Marker3_Activated: media.Marker3_Activated,
    startImg: media.start,
    endImg: media.end,
    car: media.car,

    // 自定义图层、地图
    groundoverlay: map.groundoverlay,
    boundary: map.boundary,

    // 默认地点
    default_point: map.default_point,

    // 地点数据
    all_site_data: map.site_data,
    site_data: [],

    // 地图相关属性
    latitude: map.latitude,
    longitude: map.longitude,
    scale: map.scale,
    minscale: map.minscale,
    showLocation: map.showLocation,
    enablepoi: map.enablepoi,
    markers: [],
    polyline: [],
    // 闭合多边形（学校边界范围）
    polygons: null,
    points: map.points ?? [],

    mylocationmarker: '',

    duration: 0,
    distance: 0,
    steps: [],

    card: '',

    // 起点、终点的坐标和名称
    start: {
      name: '',
      latitude: '',
      longitude: '',
    },
    end: {
      name: '',
      latitude: '',
      longitude: '',
    },

    // dialog会话框属性
    dialogShow_site: false,
    dialogShow_category: false,
    dialogShow_road: false,
    buttons: [
      {
        text: '设为起点',
      },
      {
        text: '设为终点',
      },
    ],
    button: [
      {
        text: '关闭',
      },
    ],

    static: {
      currentTarget: {
        id: 0,
      },
    },
    isAtSchool: false,

    campus_list: [],
    campus_name_list: [],
    campus_id: 0,
    choose: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const get_start = wx.getStorageSync('start');
    const get_end = wx.getStorageSync('end');
    if (get_start) {
      var start = {
        name: get_start.name,
        latitude: get_start.latitude,
        longitude: get_start.longitude,
      };
      this.setData({
        start,
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
        end,
      });
      wx.clearStorageSync();
    }
  },

  init() {
    const all_site_data = this.data.all_site_data;
    const campus_name_list = all_site_data.map(item => item.name);
    const campus_list = all_site_data.map(item => ({
      id: item.id,
      name: item.name,
    }));

    const choose = this.data.choose;
    const campus_id = campus_list[choose].id;
    const campus = all_site_data.find(item => item.id === campus_id);
    const site_data = campus?.category_list || [];

    const s_id = all_site_data[choose].site_id;

    const points = all_site_data[choose].range;
    const isUseMap = all_site_data[choose].isUseMapImg;
    const img = all_site_data[choose].img;
    const bounds = all_site_data[choose].bounds;
    const groundoverlay = isUseMap
      ? {
          src: img,
          opacity: bounds.opacity,
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
        }
      : null;

    this.setData({
      campus_list,
      campus_name_list,
      site_data,
      s_id,
      points,
      groundoverlay,
    });

    if (!isUseMap) {
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
    } else {
      this.map();
    }

    this.getDefaultSite();
  },

  // 初始化地图
  map() {
    let groundoverlay = this.data.groundoverlay;
    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.addGroundOverlay({
      id: 0,
      src: groundoverlay.src,
      bounds: groundoverlay.bounds,
      opacity: groundoverlay.opacity, // 图层透明度
    });
    // this.mapCtx.setBoundary({
    //   southwest: { // 西南角
    //     latitude: _this.data.boundary.southwest_latitude,
    //     longitude: _this.data.boundary.southwest_longitude,
    //   },
    //   northeast: { // 东北角
    //     latitude: _this.data.boundary.northeast_latitude,
    //     longitude: _this.data.boundary.northeast_longitude,
    //   }
    // })
    this.mapCtx.initMarkerCluster({
      enableDefaultStyle: true, // 启用默认的聚合样式
      zoomOnClick: false, // 点击已经聚合的标记点时是否实现聚合分离，点击后，标记点出现在屏幕边缘
      gridSize: 30, // 聚合算法的可聚合距离
    });
  },

  getDefaultSite() {
    const s_id = this.data.s_id;
    const site_data = this.data.site_data;

    const category = site_data.find(item => item.id === s_id[0]);
    const site = category.list.find(item => item.id === s_id[1]);
    const default_point = site;

    this.setData({
      default_point,
    });
    this.location();
  },

  // 定位
  location() {
    var _this = this;
    var default_point = _this.data.default_point;
    var static_category = this.data.static;
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success(res) {
        var nowlatitude = res.latitude;
        var nowlongitude = res.longitude;
        let testPoint = {
          latitude: nowlatitude,
          longitude: nowlongitude,
        };
        let polygon = _this.data.points;
        let result = _this.isPointInPolygon(testPoint, polygon);
        if (result) {
          _this.setData({
            isAtSchool: true,
          });

          let point = {
            name: '当前位置',
            latitude: nowlatitude,
            longitude: nowlongitude,
          };
          _this.set_default_point(point);
        } else {
          _this.setData({
            isAtSchool: false,
          });

          _this.set_default_point(default_point);
          wx.showToast({
            title: '当前位置不在校区内\n默认位置设为' + _this.data.default_point.name,
            icon: 'none',
            duration: 2000,
          });
        }
      },
      fail(err) {
        _this.setData({
          isAtSchool: false,
        });

        _this.set_default_point(default_point);
        wx.showToast({
          title: '请不要频繁定位\n5秒后再试试吧',
          icon: 'none',
          duration: 2000,
        });
      },
      complete(err) {
        _this.changeCategory(static_category);
      },
    });
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
      latitude: +latitude,
    });
    point = toNum(point);
    polygon = polygon.map(v => toNum(v));

    // 检查顶点
    for (const v of polygon) {
      if (
        Math.abs(v.longitude - point.longitude) < 1e-9 &&
        Math.abs(v.latitude - point.latitude) < 1e-9
      ) {
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
      if (aLat >= pLat === bLat >= pLat) continue;

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
      latitude: +obj.latitude,
    });
    p = toNum(p);
    a = toNum(a);
    b = toNum(b);

    // 叉积判共线
    const cross =
      (p.longitude - a.longitude) * (b.latitude - a.latitude) -
      (p.latitude - a.latitude) * (b.longitude - a.longitude);
    if (Math.abs(cross) > 1e-9) return false;

    // 包围盒检查
    const minLon = Math.min(a.longitude, b.longitude);
    const maxLon = Math.max(a.longitude, b.longitude);
    const minLat = Math.min(a.latitude, b.latitude);
    const maxLat = Math.max(a.latitude, b.latitude);

    return (
      p.longitude >= minLon - 1e-9 &&
      p.longitude <= maxLon + 1e-9 &&
      p.latitude >= minLat - 1e-9 &&
      p.latitude <= maxLat + 1e-9
    );
  },

  set_default_point(default_point) {
    this.setData({
      mylocationmarker: {
        id: 0,
        // iconPath: "",
        latitude: default_point.latitude,
        longitude: default_point.longitude,
        width: 25,
        height: 37,
        callout: {
          content: ' ' + default_point.name + ' ',
          display: 'ALWAYS',
          padding: 5,
          borderRadius: 10,
        },
        joinCluster: true,
      },
    });
    if (this.data.start.name == '') {
      this.setData({
        start: {
          name: default_point.name,
          latitude: default_point.latitude,
          longitude: default_point.longitude,
        },
      });
    }
  },

  // 交换起点与终点
  exchange() {
    if (this.data.end.name != '') {
      let start = this.data.start;
      let end = this.data.end;
      if (start == end) {
        wx.showToast({
          title: '起点和终点不能相同',
          icon: 'none',
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
        title: '请选择终点！',
        icon: 'none',
        duration: 2000,
      });
    }
  },

  // 点击地图标记点时触发事件
  markertap(e) {
    if (this.data.polyline.length == 0) {
      if (e.markerId == 0) {
        var site = this.data.default_point;
      } else {
        var site = this.data.site_data[this.data.category].list[e.markerId - 1];
      }
      this.setData({
        dialogShow_site: true,
        card: site,
      });
    }
  },

  // 底部按钮（路线详情和地点类型）
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
    if (choose == '设为起点') {
      this.setData({
        start: card,
      });
    } else {
      this.setData({
        end: card,
      });
    }
  },

  // 切换校区
  changeCampus(e) {
    const choose = e.detail.value;
    this.setData({
      choose,
      category: 0,
    });

    this.init();
    this.restore();
  },

  // 切换地点类型
  changeCategory(e) {
    var category = e.currentTarget.id;
    let scrollLeft = (category - 1) * 60;
    this.setData({
      scrollLeft: scrollLeft,
      category: e.currentTarget.id,
      polyline: [],
    });

    let site_list = this.data.site_data[this.data.category].list;
    let markers = [];
    // 检查地点列表中是否包含默认地点（用于判断是否在校外且有默认地点）
    let judge = site_list.some(item => item == this.data.default_point);
    let index = site_list.findIndex(item => item == this.data.default_point);
    // 在校时，添加当前位置标记
    // 不在校时，仅当前地点类型下不存在默认地点,，添加当前位置标记
    if (!judge || this.data.isAtSchool) {
      markers.push(this.data.mylocationmarker);
    }

    for (let i = 0; i < site_list.length; i++) {
      let la = site_list[i].latitude;
      let lo = site_list[i].longitude;
      let name = site_list[i].name;
      let m = {
        id: i + 1,
        latitude: la,
        longitude: lo,
        iconPath: this.data.Marker3_Activated,
        width: 30,
        height: 30,
        callout: {
          content: ' ' + name + ' ',
          display: 'ALWAYS',
          padding: 5,
          borderRadius: 10,
        },
        joinCluster: true,
      };
      markers.push(m);
    }

    if (index >= 0) {
      markers[index] = this.data.mylocationmarker;
    }

    this.setData({
      markers,
    });
    this.includePoints(markers);
  },

  // 缩放视野以包含所有给定的坐标点
  includePoints(markers) {
    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.includePoints({
      padding: [100, 60, 60, 60],
      points: markers,
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
      url: './search/search?id=' + e.currentTarget.dataset.search_id,
    });
  },

  // 跳转至使用说明页
  toinstruction() {
    let name = this.data.default_point.name;
    wx.navigateTo({
      url: './instruction/instruction?name=' + name,
    });
  },

  modechoose(e) {
    let choose = e.target.dataset.choose;
    if (choose != this.data.mode) {
      this.setData({
        mode: choose,
      });
      this.formSubmit();
    }
  },

  // 触发表单提交事件，调用接口
  formSubmit() {
    var _this = this;

    if (this.data.end.name != '') {
      let start = this.data.start;
      let end = this.data.end;
      if (start.latitude == end.latitude && start.longitude == end.longitude) {
        wx.showToast({
          title: '起点和终点不能相同',
          icon: 'none',
          duration: 2000,
        });
      } else {
        // 调用距离计算接口
        qqmapsdk.direction({
          mode: _this.data.mode, // 可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
          // from参数不填默认当前地址
          from: start.latitude + ',' + start.longitude,
          to: end.latitude + ',' + end.longitude,
          success(res) {
            var ret = res;
            var duration = ret.result.routes[0].duration;
            var distance = ret.result.routes[0].distance;
            var coors = ret.result.routes[0].polyline,
              pl = [
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
              steps: ret.result.routes[0].steps,
              distance: distance,
              duration: duration,
            });
            _this.includePoints(pl);
            _this.moveAlong();
          },
        });
        let startImg = this.data.startImg;
        let endImg = this.data.endImg;
        let car = this.data.car;
        this.setData({
          markers: [
            {
              id: 0,
              latitude: start.latitude,
              longitude: start.longitude,
              iconPath: startImg,
              width: 25,
              height: 37,
              callout: {
                content: ' ' + start.name + ' ',
                display: 'ALWAYS',
                padding: 5,
                borderRadius: 10,
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
                content: ' ' + end.name + ' ',
                display: 'ALWAYS',
                padding: 5,
                borderRadius: 10,
              },
            },
            {
              id: 2,
              latitude: start.latitude,
              longitude: start.longitude,
              iconPath: car,
              width: 30,
              height: 30,
              callout: {
                content: ' 移动中 ',
                display: 'ALWAYS',
                padding: 5,
                borderRadius: 10,
              },
            },
          ],
        });
      }
    } else {
      wx.showToast({
        title: '请选择终点！',
        icon: 'none',
        duration: 2000,
      });
    }
  },

  // 轨迹回放
  moveAlong() {
    var _this = this;
    var markers = this.data.markers;
    var points = this.data.polyline[0].points;
    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.moveAlong({
      markerId: 2,
      path: points,
      duration: 4000,
      autoRotate: true,
      success(res) {
        markers.pop();
        _this.setData({
          markers: markers,
        });
      },
    });
  },
});

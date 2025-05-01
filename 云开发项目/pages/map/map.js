// pages/map/map.js
import map from '@data/map'
import media from '@data/media'

// 引入SDK核心类
const QQMapWX = require('@libs/qqmap-wx-jssdk.min')

// 实例化API核心类
const qqmapsdk = new QQMapWX({
  key: map.mapKey // 必填
})

const app = getApp()

const db = wx.cloud.database()

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

        // 自定义图层、地图、学校 边界
        groundoverlay: map.groundoverlay,
        boundary: map.boundary,
        // school_boundary: map.school_boundary,

        // 默认地点
        default_point: "",
        s_id: "",

        // 地点数据
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
        // 闭合多边形
        polygons: null,
        points: map.points??[],

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
        buttons: [{
            text: '设为起点'
        }, {
            text: '设为终点'
        }],
        button: [{
            text: '关闭'
        }],

        static: {
            currentTarget: {
                id: 0,
            }
        },
        isAtSchool: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.get()
        // this.getdefaultsite()
        // this.lianbiaoquery()
        // this.map()
        // this.location()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if (app.globalData.mapRefresh) {
            this.lianbiaoquery();
            app.globalData.mapRefresh = false; // 重置标记
        }
        
        const get_start = wx.getStorageSync('start')
        const get_end = wx.getStorageSync('end')
        console.log("get_start", get_start)
        console.log("get_end", get_end)
        if (get_start) {
            var start = {
                name: get_start.name,
                latitude: get_start.latitude,
                longitude: get_start.longitude,
            }
            this.setData({
                start: start
            })
            wx.clearStorageSync()
        }
        if (get_end) {
            var end = {
                name: get_end.name,
                latitude: get_end.latitude,
                longitude: get_end.longitude,
            }
            this.setData({
                end: end
            })
            wx.clearStorageSync()
        }
    },

    // 获取地图的图片链接 和 默认地点
    get() {
        db.collection('media')
            .where({
                name: "地图"
            })
            .get()
            .then(res => {
                console.log('success', res.data[0].img)
                this.setData({
                    map_bottom: res.data[0].img,
                })
                if(!(res.data[0].img)) {
                  let polygons = [{
                    points: this.data.points,
                    fillColor: "#d5dff233", // 填充颜色：淡蓝色，7-8位为十六进制透明度00-FF
                    strokeColor: "#789cff", // 描边颜色：较深的淡蓝色
                    strokeWidth: 2, // 描边宽度
                  }]
                  this.setData({
                    polygons: polygons,
                  })
                }
                this.getRange()
                this.map()
            })
            .catch(err => {
                console.log('fail', err)
            })

        db.collection('media')
            .where({
                name: "默认地点"
            })
            .get()
            .then(res => {
                console.log('success', res.data[0])
                this.setData({
                    s_id: res.data[0].s_id,
                })
                this.getDefaultSite()
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    getRange() {
      db.collection('media')
          .where({
            name: "学校范围"
          })
          .get()
          .then(res => {
            console.log('success', res)
            if (res.data[0]?.range) {
              let polygons = []
              console.log('this.data.map_bottom', this.data.map_bottom);
              if(!(this.data.map_bottom)) {
                polygons = [{
                  points: res.data[0].range,
                  fillColor: "#d5dff233", // 填充颜色：淡蓝色，7-8位为十六进制透明度00-FF
                  strokeColor: "#789cff", // 描边颜色：较深的淡蓝色
                  strokeWidth: 2, // 描边宽度
                }]
              }
              console.log('polygons', polygons);
              this.setData({
                points: res.data[0].range,
                polygons: polygons,
              })
            }
          })
          .catch(err => {
            console.log('fail', err)
          })
    },

    getDefaultSite() {
        db.collection('site')
            .doc(this.data.s_id)
            .get()
            .then(res => {
                console.log('success', res.data)
                this.setData({
                    default_point: res.data
                })
                this.lianbiaoquery()
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    // 联表查询
    lianbiaoquery() {
        wx.cloud.callFunction({
                name: 'lianbiao_query',
            })
            .then(res => {
                console.log(res.result.list)
                this.setData({
                    site_data: res.result.list
                })
                this.location()
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    // 初始化地图
    map() {
        var that = this
        this.mapCtx = wx.createMapContext('map')
        this.mapCtx.addGroundOverlay({
            id: 0,
            src: that.data.map_bottom,
            bounds: {
                southwest: { //西南角
                    latitude: that.data.groundoverlay.southwest_latitude,
                    longitude: that.data.groundoverlay.southwest_longitude,
                },
                northeast: { //东北角
                    latitude: that.data.groundoverlay.northeast_latitude,
                    longitude: that.data.groundoverlay.northeast_longitude,
                }
            },
            opacity: that.data.groundoverlay.opacity, //图层透明度
            success(res) {
                // console.log('wp', res)
            },
            fail(err) {
                // console.log('err', err)
            }
        })
        this.mapCtx.setBoundary({
            southwest: { //西南角
                latitude: that.data.boundary.southwest_latitude,
                longitude: that.data.boundary.southwest_longitude,
            },
            northeast: { //东北角
                latitude: that.data.boundary.northeast_latitude,
                longitude: that.data.boundary.northeast_longitude,
            }
        })
        this.mapCtx.initMarkerCluster({
            enableDefaultStyle: true, //启用默认的聚合样式
            zoomOnClick: false, //点击已经聚合的标记点时是否实现聚合分离，点击后，标记点出现在屏幕边缘
            gridSize: 30, //聚合算法的可聚合距离
            complete(res) {
                // console.log('initMarkerCluster', res)
            }
        })
    },

    // 定位
    location() {
        var that = this
        // var school_boundary = this.data.school_boundary
        var default_point = this.data.default_point
        var static_category = this.data.static
        wx.getLocation({
            type: 'gcj02',
            isHighAccuracy: true,
            success: function (res) {
                var nowlatitude = res.latitude
                var nowlongitude = res.longitude
                console.log("当前位置坐标", nowlatitude, nowlongitude)
                let testPoint = {
                  latitude: nowlatitude,
                  longitude: nowlongitude
                }
                let polygon = that.data.points
                let result = that.isPointInPolygon(testPoint, polygon)
                if (result) {
                    that.setData({
                        isAtSchool: true
                    })

                    let point = {
                        name: "当前位置",
                        latitude: nowlatitude,
                        longitude: nowlongitude,
                    }
                    that.set_default_point(point)
                } else {
                    that.setData({
                        isAtSchool: false
                    })

                    that.set_default_point(default_point)
                    wx.showToast({
                        title: '当前位置不在校区内\n默认位置设为' + that.data.default_point.name,
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: function (err) {
                that.setData({
                    isAtSchool: false
                })
                that.set_default_point(default_point)
                wx.showToast({
                    title: '请不要频繁定位\n5秒后再试试吧',
                    icon: 'none',
                    duration: 2000
                })
            },
            complete: function (err) {
                that.changeCategory(static_category)
            }
        })
    },

    /**
     * 判断点是否在多边形内部
     * @param {{longitude: number, latitude: number}} point - 待检测点
     * @param {{longitude: number, latitude: number}[]} polygon - 多边形顶点数组
     */
    isPointInPolygon(point, polygon) {
      // 预处理：全部转为数值
      const toNum = ({
        longitude,
        latitude
      }) => ({
        longitude: +longitude,
        latitude: +latitude
      })
      point = toNum(point)
      polygon = polygon.map(v => toNum(v))

      // 检查顶点
      for (const v of polygon) {
        if (
          Math.abs(v.longitude - point.longitude) < 1e-9 &&
          Math.abs(v.latitude - point.latitude) < 1e-9
        ) {
          return true
        }
      }

      // 检查边
      const n = polygon.length
      for (let i = 0; i < n; i++) {
        const a = polygon[i]
        const b = polygon[(i + 1) % n]
        if (this.isPointOnSegment(point, a, b)) return true
      }

      // 射线法核心逻辑
      let crossings = 0
      for (let i = 0; i < n; i++) {
        const a = polygon[i]
        const b = polygon[(i + 1) % n]
        const [aLat, bLat] = [a.latitude, b.latitude]
        const pLat = point.latitude

        // 边跨越射线时才处理
        if (aLat >= pLat === bLat >= pLat) continue

        // 排除水平边
        if (aLat === bLat) continue

        // 计算交点经度
        const t = (pLat - aLat) / (bLat - aLat)
        const intersectLon = a.longitude + t * (b.longitude - a.longitude)

        // 交点在射线右侧（经度更大）
        if (intersectLon > point.longitude + 1e-9) {
          crossings++
        }
      }

      return crossings % 2 === 1
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
      })
      p = toNum(p)
      a = toNum(a)
      b = toNum(b)

      // 叉积判共线
      const cross =
        (p.longitude - a.longitude) * (b.latitude - a.latitude) -
        (p.latitude - a.latitude) * (b.longitude - a.longitude)
      if (Math.abs(cross) > 1e-9) return false

      // 包围盒检查
      const minLon = Math.min(a.longitude, b.longitude)
      const maxLon = Math.max(a.longitude, b.longitude)
      const minLat = Math.min(a.latitude, b.latitude)
      const maxLat = Math.max(a.latitude, b.latitude)

      return (
        p.longitude >= minLon - 1e-9 &&
        p.longitude <= maxLon + 1e-9 &&
        p.latitude >= minLat - 1e-9 &&
        p.latitude <= maxLat + 1e-9
      )
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
                content: " " + default_point.name + " ",
                display: 'ALWAYS',
                padding: 5,
                borderRadius: 10
                },
                joinCluster: true,
            },
            start: {
                name: default_point.name,
                latitude: default_point.latitude,
                longitude: default_point.longitude,
            }
        })
    },

    // 交换起点与终点
    exchange() {
        if (this.data.end.name != "") {
            let start = this.data.start
            let end = this.data.end
            if (start.latitude == end.latitude && start.longitude == end.longitude) {
                wx.showToast({
                    title: '起点和终点不能相同',
                    icon: 'none',
                    duration: 2000
                })
            } else {
                this.setData({
                    end: start,
                    start: end
                })
                this.formSubmit()
            }
        } else {
            wx.showToast({
                title: '请选择终点！',
                icon: 'none',
                duration: 2000
            })
        }
    },

    // 点击地图标记点时触发事件
    markertap(e) {
		if(this.data.polyline.length == 0) {
			console.log(e.markerId)
			if (e.markerId == 0) {
				var site = this.data.default_point
			} else {
				var site = this.data.site_data[this.data.category].list[e.markerId - 1]
			}
			this.setData({
				dialogShow_site: true,
				card: site,
			})

			var _id = site._id
			console.log(_id)
			// 浏览次数加1
			wx.cloud.callFunction({
				name: 'browse',
				data: {
					_id: _id,
				},
				success(res) {
					console.log(res.result.stats)
					console.log("浏览量+1")
				},
				fail(err) {
					console.log(err);
				}
			})
		}
    },

    // 底部按钮（路线详情和地点类型）
    clickButton() {
        if (this.data.polyline.length == 0) {
            this.setData({
                dialogShow_category: true
            })
        } else {
            this.setData({
                dialogShow_road: true
            })
        }
    },

    // mpdialog “关闭” 按钮点击事件
    mapmarker_close() {
        this.setData({
            dialogShow_category: false,
            dialogShow_road: false,
        })
    },

    // 预览图片
    lookPhoto(e) {
        console.log("点击了图片", e.target.dataset.src)
        var url = e.target.dataset.src
        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: [url] // 需要预览的图片http链接列表
        })
    },

    // mpdialog “设为起点”和“设为终点” 按钮点击事件
    mapmarker_choose(e) {
        this.setData({
            dialogShow_site: false,
        })
        var choose = e.detail.item.text
        var card = {
            name: this.data.card.name,
            latitude: this.data.card.latitude,
            longitude: this.data.card.longitude,
        }
        console.log("选择地点", card)
        if (choose == "设为起点") {
            this.setData({
                start: card
            })
        } else {
            this.setData({
                end: card,
            })
        }
    },

    // 切换地点类型
    changeCategory(e) {
        console.log("地点类型", e.currentTarget.id)
        var category = e.currentTarget.id
        var scrollLeft = (category - 1) * 60
        this.setData({
            scrollLeft: scrollLeft,
            category: category,
            polyline: [],
            markers: []
        })

        var site_list = this.data.site_data[this.data.category].list
        console.log("当前地点类型", site_list)
        var markers = []
        // 不在学校且当前地点类型下存在默认地点
        let judege = site_list.some((item) => item._id == this.data.default_point._id)
        if (!this.data.isAtSchool && !judege) {
            markers.push(this.data.mylocationmarker)
        }
        for (let i = 0; i < site_list.length; i++) {
            let la = site_list[i].latitude
            let lo = site_list[i].longitude
            let name = site_list[i].name
            let m = {
                id: i + 1,
                latitude: la,
                longitude: lo,
                iconPath: this.data.Marker3_Activated,
                width: 30,
                height: 30,
                callout: {
                    content: " " + name + " ",
                    display: 'ALWAYS',
                    padding: 5,
                    borderRadius: 10
                },
                joinCluster: true,
            }
            markers.push(m)
        }
        console.log("当前marker点", markers)
        this.setData({
            markers: markers
        })
        if (markers.length > 1) {
			this.includePoints(markers)
		} else {
			this.setData({
				latitude: map.latitude,
				longitude: map.longitude,
				scale: map.minscale,
			})
		}
    },

    // 缩放视野以包含所有给定的坐标点
    includePoints(markers) {
        this.mapCtx = wx.createMapContext('map')
        this.mapCtx.includePoints({
            padding: [100, 60, 60, 60],
            points: markers,
        })
    },

    // “还原” 按钮
    restore() {
        let e = {
            currentTarget: {
                id: this.data.category
            }
        }
        this.changeCategory(e)
    },

    // 跳转至搜索页
    tosearch(e) {
        wx.navigateTo({
            url: '../map/search/search?id=' + e.currentTarget.dataset.search_id,
        })
    },

    // 跳转至使用说明页
    toinstruction() {
        let name = this.data.default_point.name
        wx.navigateTo({
            url: './instruction/instruction?name=' + name
        })
    },

    modechoose(e) {
        let choose = e.target.dataset.choose
        if (choose != this.data.mode) {
          this.setData({
            mode: choose
          })
          this.formSubmit()
        }
    },

    // 触发表单提交事件，调用接口
    formSubmit() {
        var _this = this;

        if (this.data.end.name != "") {
            let start = this.data.start
            let end = this.data.end
            if (start.latitude == end.latitude && start.longitude == end.longitude) {
                wx.showToast({
                    title: '起点和终点不能相同',
                    icon: 'none',
                    duration: 2000
                })
            } else {
                //调用距离计算接口
                qqmapsdk.direction({
                    mode: _this.data.mode, //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
                    //from参数不填默认当前地址
                    from: start.latitude + "," + start.longitude,
                    to: end.latitude + "," + end.longitude,
                    success: function (res) {
                        // console.log(res.result.routes[0]);
                        var ret = res;
                        var duration = ret.result.routes[0].duration;
                        var distance = ret.result.routes[0].distance;
                        console.log("时间", duration, "距离", distance)
                        var coors = ret.result.routes[0].polyline,
                            pl = [{
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
                        pl.push({
                            latitude: end.latitude,
                            longitude: end.longitude
                        })
                        console.log("路线", pl)
                        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
                        _this.setData({
                            polyline: [{
                                points: pl,
                                color: '#58c16c',
                                width: 10,
                                borderColor: '#2f693c',
                                borderWidth: 2,
                                arrowLine: true
                            }],
                            steps: ret.result.routes[0].steps,
                            distance: distance,
                            duration: duration
                        })
                        _this.includePoints(pl)
                        _this.moveAlong()

                    },
                    fail: function (error) {
                        // console.error(error);
                    },
                    complete: function (res) {
                        // console.log(res);
                    }
                });
                let startImg = this.data.startImg
                let endImg = this.data.endImg
                let car = this.data.car
                this.setData({
                    markers: [{
                            id: 0,
                            latitude: start.latitude,
                            longitude: start.longitude,
                            iconPath: startImg,
                            width: 25,
                            height: 37,
                            callout: {
                                content: " " + start.name + " ",
                                display: 'ALWAYS',
                                padding: 5,
                                borderRadius: 10
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
                                content: " " + end.name + " ",
                                display: 'ALWAYS',
                                padding: 5,
                                borderRadius: 10
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
                                content: " 移动中 ",
                                display: 'ALWAYS',
                                padding: 5,
                                borderRadius: 10
                            },
                        }
                    ],
                })
            }
        } else {
            wx.showToast({
                title: '请选择终点！',
                icon: 'none',
                duration: 2000
            })
        }
    },

    // 轨迹回放    
    moveAlong() {
        var that = this
        var markers = this.data.markers
        var points = this.data.polyline[0].points
        this.mapCtx = wx.createMapContext('map')
        this.mapCtx.moveAlong({
            markerId: 2,
            path: points,
            duration: 4000,
            autoRotate: true,
            success: function (res) {
                markers.pop()
                that.setData({
                    markers: markers
                })
            }
        })
    }
})
/* data/map_data.js */
// 地图相关
module.exports = {
  // 腾讯位置服务API
  mapKey: "ZQWBZ-NQBLV-W7CPF-U7QIR-5HBNQ-AOFUE", // 必填


  // 地图部分参数

  // 学校中心点坐标
  longitude: 110.276814,
  latitude: 25.093542,

  // 是否展示 POI 点
  enablepoi: true,
  // 是否显示带有方向的当前定位点
  showLocation: true,
  // 缩放级别
  scale: 15.9,
  // 最小缩放级别，比缩放级别小0.3-0.4为宜
  minscale: 15.7,

  // 地图边界
  boundary: {
    //西南角
    southwest_latitude: 25.081307,
    southwest_longitude: 110.279786,
    //东北角
    northeast_latitude: 25.107333,
    northeast_longitude: 110.299596,
  },

  // 学校边界
  school_boundary: {
    // 东（学校最东端点的 经度，地图最右端）
    east: 110.280699,
    // 西（学校最西端点的 经度，地图最左端）
    west: 110.2733,
    // 南（学校最南端点的 纬度，地图最下端）
    south: 25.089701,
    // 北（学校最北端点的 纬度，地图最上端）
    north: 25.09839,
  },

  // 自定义图层
  groundoverlay: {
    // 图层透明度 0-1，对应 0%-100%
    opacity: 0.9,
    // 西南角
    southwest_latitude: 25.086921,
    southwest_longitude: 110.279073,
    // 东北角
    northeast_latitude: 25.101649,
    northeast_longitude: 110.300436,
  },

  // 自定义地图
  map_bottom: "https://cdnjson.com/images/2024/03/13/GXNU9b2e3c77b9ff605a.jpg",

  // 闭合多边形
  points: [{
    "latitude": 25.098852,
    "longitude": 110.280247
  }, {
    "latitude": 25.098613,
    "longitude": 110.281067
  }, {
    "latitude": 25.098134,
    "longitude": 110.281202
  }, {
    "latitude": 25.097789,
    "longitude": 110.28124
  }, {
    "latitude": 25.097262,
    "longitude": 110.281238
  }, {
    "latitude": 25.096541,
    "longitude": 110.281147
  }, {
    "latitude": 25.095498,
    "longitude": 110.280837
  }, {
    "latitude": 25.094192,
    "longitude": 110.280425
  }, {
    "latitude": 25.092261,
    "longitude": 110.279772
  }, {
    "latitude": 25.090907,
    "longitude": 110.279116
  }, {
    "latitude": 25.088818,
    "longitude": 110.278
  }, {
    "latitude": 25.088894,
    "longitude": 110.277343
  }, {
    "latitude": 25.088626,
    "longitude": 110.277048
  }, {
    "latitude": 25.089121,
    "longitude": 110.27522
  }, {
    "latitude": 25.090366,
    "longitude": 110.2723
  }, {
    "latitude": 25.094765,
    "longitude": 110.274592
  }, {
    "latitude": 25.095409,
    "longitude": 110.275153
  }, {
    "latitude": 25.096183,
    "longitude": 110.275245
  }, {
    "latitude": 25.097429,
    "longitude": 110.277281
  }, {
    "latitude": 25.097552,
    "longitude": 110.277502
  }, {
    "latitude": 25.098047,
    "longitude": 110.278465
  }, {
    "latitude": 25.098449,
    "longitude": 110.279324
  }]
}
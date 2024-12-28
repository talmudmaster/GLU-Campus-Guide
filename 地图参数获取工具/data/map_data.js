/* data/map_data.js */
// 地图相关
module.exports = {
  // 腾讯位置服务API
  mapKey: "ZQWBZ-NQBLV-W7CPF-U7QIR-5HBNQ-AOFUE", // 必填


  // 地图部分参数

  // 学校中心点坐标
  longitude: 110.277269,
  latitude: 25.093542,

  // 是否展示 POI 点
  enablepoi: true,
  // 是否显示带有方向的当前定位点
  showLocation: true,
  // 缩放级别
  scale: 15.8,
  // 最小缩放级别，比缩放级别小0.3-0.4为宜
  minscale: 15.5,

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
    "latitude": "25.098661",
    "longitude": "110.281085"
  }, {
    "latitude": "25.098178",
    "longitude": "110.281189"
  }, {
    "latitude": "25.098033",
    "longitude": "110.281212"
  }, {
    "latitude": "25.097797",
    "longitude": "110.281240"
  }, {
    "latitude": "25.097287",
    "longitude": "110.281246"
  }, {
    "latitude": "25.096797",
    "longitude": "110.281191"
  }, {
    "latitude": "25.096598",
    "longitude": "110.281161"
  }, {
    "latitude": "25.095539",
    "longitude": "110.280851"
  }, {
    "latitude": "25.094663",
    "longitude": "110.280573"
  }, {
    "latitude": "25.092608",
    "longitude": "110.279896"
  }, {
    "latitude": "25.092254",
    "longitude": "110.279774"
  }, {
    "latitude": "25.088440",
    "longitude": "110.277864"
  }, {
    "latitude": "25.088595",
    "longitude": "110.276959"
  }, {
    "latitude": "25.090170",
    "longitude": "110.272859"
  }, {
    "latitude": "25.096446",
    "longitude": "110.275621"
  }, {
    "latitude": "25.097469",
    "longitude": "110.277284"
  }, {
    "latitude": "25.097880",
    "longitude": "110.278027"
  }, {
    "latitude": "25.098033",
    "longitude": "110.278332"
  }, {
    "latitude": "25.098576",
    "longitude": "110.279523"
  }, {
    "latitude": "25.098777",
    "longitude": "110.279984"
  }, {
    "latitude": "25.098935",
    "longitude": "110.280369"
  }]
}
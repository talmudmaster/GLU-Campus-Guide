/* data/map_data.js */
// 地图相关
module.exports = {
  // 腾讯位置服务API
  mapKey: 'ZQWBZ-NQBLV-W7CPF-U7QIR-5HBNQ-AOFUE', // 必填

  // 地图部分参数

  // 是否展示 POI 点
  enablepoi: true,
  // 是否显示带有方向的当前定位点
  showLocation: true,
  // 缩放级别
  scale: 15.9,
  // 最小缩放级别，比缩放级别小0.3-0.4为宜
  // minscale: 15.7,

  // 地图边界
  // boundary: {
  //   // 西南角
  //   southwest_latitude: 25.081307,
  //   southwest_longitude: 110.279786,
  //   // 东北角
  //   northeast_latitude: 25.107333,
  //   northeast_longitude: 110.299596,
  // },

  // 学校中心点坐标
  longitude: 110.276814,
  latitude: 25.093542,

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

  // 自定义图层
  bounds: {
    // 图层透明度 0-1，对应 0%-100%
    opacity: 0.9,
    // 南
    south: 25.086921,
    // 西
    west: 110.279073,
    // 北
    north: 25.101649,
    // 东
    east: 110.300436,
  },

  // 是否使用地图
  isUseMapImg: true,

  // 自定义地图
  img: 'https://cdnjson.com/images/2024/03/13/GXNU9b2e3c77b9ff605a.jpg',

  // 闭合多边形
  range: [
    {
      latitude: 25.098567,
      longitude: 110.280995,
    },
    {
      latitude: 25.097711,
      longitude: 110.281167,
    },
    {
      latitude: 25.096842,
      longitude: 110.281137,
    },
    {
      latitude: 25.095527,
      longitude: 110.280778,
    },
    {
      latitude: 25.092988,
      longitude: 110.279991,
    },
    {
      latitude: 25.090947,
      longitude: 110.279089,
    },
    {
      latitude: 25.088824,
      longitude: 110.277994,
    },
    {
      latitude: 25.088921,
      longitude: 110.277342,
    },
    {
      latitude: 25.088633,
      longitude: 110.277057,
    },
    {
      latitude: 25.089162,
      longitude: 110.27507,
    },
    {
      latitude: 25.090355,
      longitude: 110.272274,
    },
    {
      latitude: 25.094758,
      longitude: 110.274553,
    },
    {
      latitude: 25.095421,
      longitude: 110.275129,
    },
    {
      latitude: 25.096114,
      longitude: 110.275212,
    },
    {
      latitude: 25.097485,
      longitude: 110.277418,
    },
    {
      latitude: 25.098553,
      longitude: 110.279565,
    },
    {
      latitude: 25.098779,
      longitude: 110.280243,
    },
  ],
};

/* utils/map.js */
// 地图相关
module.exports = {
  // 地图部分参数

  // 腾讯位置服务API
  mapKey: "",

  // 学校精确坐标（用于地图定位和获取天气数据）
  longitude: '110.277685',
  latitude: '25.093668',

  // 是否展示 POI 点
  enablepoi: false,
  // 是否显示带有方向的当前定位点
  showLocation: true,
  // 缩放级别
  scale: 16.1,
  // 最小缩放级别，比缩放级别小0.1-0.2为宜
  minscale: 16,

  // 自定义图层
  groundoverlay: {
    // 图层透明度 0-1
    opacity: 0.8,
    // 西南角
    southwest_latitude: 25.088910,
    southwest_longitude: 110.273850,
    // 东北角
    northeast_latitude: 25.098995,
    northeast_longitude: 110.281229,
  },

  // 地图边界
  boundary: {
    // 西南角
    southwest_latitude: 25.088083,
    southwest_longitude: 110.272618,
    // 东北角
    northeast_latitude: 25.099580,
    northeast_longitude: 110.281911,
  },

  // 学校边界
  school_boundary: {
    // 东（学校最东端的 经度）
    east: 110.280699,
    // east: 121.98181,
    // 西（学校最东端的 经度）
    west: 110.2733,
    // 南（学校最东端的 纬度）
    south: 25.089701,
    // 北（学校最东端的 纬度）
    north: 25.09839,
    // north: 32.38475,
  },

  // 默认地点
  default_point: {
    name: "东门",
    aliases: "学校正大门",
    img: "https://cdnjson.com/images/2023/02/26/schoolgate_dongmen.jpg",
    desc: "学校正大门\n可以通行行人和车辆",
    latitude: '25.095321',
    longitude: '110.280392',
  },

}
// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
}); // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud
    .database()
    .collection('campus')
    .add({
      data: {
        name: event.name,
        site_id: event.site_id,
        latitude: event.latitude,
        longitude: event.longitude,
        range: event.range,
        img: event.img,
        isUseMapImg: event.isUseMapImg,
        bounds: event.bounds,
      },
    });
};

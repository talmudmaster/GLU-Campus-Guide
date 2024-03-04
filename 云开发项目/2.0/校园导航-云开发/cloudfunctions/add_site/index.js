// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    return cloud.database().collection('site')
        .add({
            data: {
                name: event.name,
                aliases: event.aliases,
                desc: event.desc,
                c_id: event.c_id,
                latitude: event.la,
                longitude: event.lo,
                img: event.img,
                browse: 0
            }
        })
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    return db.collection('media')
        .where({
          name: "学校范围"
        })
        .update({
            data: {
                range: event.range
            }
        })
}
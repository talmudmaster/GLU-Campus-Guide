// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()
const _ = db.command
const $ = _.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
    return await db.collection('category').aggregate()
        .lookup({
            from: 'site',
            localField: '_id',
            foreignField: 'c_id',
            as: 'list',
        })
        .end()
}
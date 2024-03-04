// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    const pagination = {
        current: event.current || 1, // 当前页面
        pageSize: event.pageSize || 20, // 分页条数
    }
    const wxContext = cloud.getWXContext()

    // 获取总数据条数
    const total = await db.collection('site').count();

    // 获取所有数据，orderBy排序，desc从大到小，skip跳过，limit限制
    const data = await db.collection('site')
        .orderBy('browse', 'desc')
        .skip((pagination.current - 1) * pagination.pageSize)
        .limit(pagination.pageSize)
        .get();

    pagination.total = total.total; // 总条数
    pagination.totalPage = Math.ceil(pagination.total / pagination.pageSize); // 总页数

    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
        data,
        pagination
    }
}
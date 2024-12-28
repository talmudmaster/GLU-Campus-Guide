// pages/map/instruction/instruction.js
var media = require('../../../data/media')
var db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map: "../" + media.map,

    // 默认地点
    default_point: "",
    s_id: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDefaultSite()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline: function (res) {

  },

  // 获取地图的默认地点
  getDefaultSite() {
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
        this.getDefaultSiteName()
      })
      .catch(err => {
        console.log('fail', err)
      })
  },

  getDefaultSiteName() {
    db.collection('site')
      .doc(this.data.s_id)
      .get()
      .then(res => {
        console.log('success', res.data)
        this.setData({
          default_point: res.data.name
        })
      })
      .catch(err => {
        console.log('fail', err)
      })
  },

  // 跳转至地点汇总页
  tosite() {
    wx.switchTab({
      url: '../../site/site',
    })
  },

  // 跳转至地图页
  tomap() {
    wx.switchTab({
      url: '../../map/map',
    })
  }
})
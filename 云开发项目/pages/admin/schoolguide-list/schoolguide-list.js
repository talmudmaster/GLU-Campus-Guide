// pages/manage/guide-list/guide-list.js
const app = getApp()
let db = wx.cloud.database()
let _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolguide_list: [],
    key: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.get()
  },

  get() {
    this.getschoolguide()
  },

  getschoolguide() {
    wx.cloud.database().collection('schoolguide')
      .get()
      .then(res => {
        console.log('success', res)
        this.setData({
          schoolguide_list: res.data
        })
      })
      .catch(err => {
        console.log('fail', err)
      })
  },

  getKey(e) {
    this.setData({
      key: e.detail.value
    })
  },

  addschoolguide() {
    wx.navigateTo({
      url: './schoolguide/schoolguide?sid=1',
    })
  },

  manageschoolguide(e) {
    console.log(e.target.dataset._id)
    console.log(e.target.dataset.id)
    wx.navigateTo({
      url: './schoolguide/schoolguide?sid=2&_id=' + e.target.dataset._id,
    })
  },
})
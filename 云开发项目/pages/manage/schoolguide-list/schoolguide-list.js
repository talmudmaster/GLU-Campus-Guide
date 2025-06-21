// pages/manage/guide-list/guide-list.js
const app = getApp();

const db = wx.cloud.database();
const _ = db.command;

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
    this.get();
  },

  get() {
    this.getschoolguide();
  },

  getschoolguide() {
    db.collection('schoolguide')
      .get()
      .then(res => {
        this.setData({
          schoolguide_list: res.data,
        });
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  getKey(e) {
    this.setData({
      key: e.detail.value,
    });
  },

  addschoolguide() {
    wx.navigateTo({
      url: './schoolguide/schoolguide?sid=1',
    });
  },

  manageschoolguide(e) {
    wx.navigateTo({
      url: './schoolguide/schoolguide?sid=2&_id=' + e.target.dataset._id,
    });
  },
});

// pages/manage/campus-list/campus-list.js
const app = getApp();

const db = wx.cloud.database();
const _ = db.command;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    campus_list: [],
    sid: 1,
    campus: 0,
    key: null,
    _id: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.get();
  },

  get() {
    this.getcampus();
  },

  getcampus() {
    db.collection('campus')
      .get()
      .then(res => {
        this.setData({
          campus_list: res.data,
        });
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  addcampus() {
    wx.navigateTo({
      url: './campus/campus?sid=1',
    });
  },

  managecampus(e) {
    wx.navigateTo({
      url:
        './campus/campus?sid=2&_id=' +
        e.target.dataset._id +
        '&id=' +
        e.target.dataset.id +
        '&name=' +
        e.target.dataset.name,
    });
  },
});

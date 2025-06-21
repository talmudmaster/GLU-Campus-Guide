// pages/manage/category-list/category-list.js
const app = getApp();

const db = wx.cloud.database();
const _ = db.command;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    category_list: [],
    key: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.get();
  },

  get() {
    this.getCategory();
  },

  getCategory() {
    db.collection('category')
      .get()
      .then(res => {
        this.setData({
          category_list: res.data,
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

  addcategory() {
    wx.navigateTo({
      url: './category/category?sid=1',
    });
  },

  managecategory(e) {
    wx.navigateTo({
      url:
        './category/category?sid=2&_id=' +
        e.target.dataset._id +
        '&id=' +
        e.target.dataset.id +
        '&name=' +
        e.target.dataset.name,
    });
  },
});

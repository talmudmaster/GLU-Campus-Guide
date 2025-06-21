// pages/admin/admin-list/admin-list.js
const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    admin_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAdmin();
  },

  getAdmin() {
    db.collection('admin')
      .get()
      .then(res => {
        this.setData({
          admin_list: res.data,
        });
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  addAdmin() {
    wx.navigateTo({
      url: './admin/admin?sid=1',
    });
  },

  manageAdmin(e) {
    wx.navigateTo({
      url:
        './admin/admin?sid=2&_id=' +
        e.target.dataset._id +
        '&name=' +
        e.target.dataset.name +
        '&openid=' +
        e.target.dataset.openid,
    });
  },
});

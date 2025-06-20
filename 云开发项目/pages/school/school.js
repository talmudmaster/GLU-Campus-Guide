// pages/school/school.js
import media from '@data/media';

const app = getApp();

const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    allWords: [],

    green_arrow: media.green_arrow,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.get();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (app.globalData.schoolguideRefresh) {
      this.get();
      app.globalData.schoolguideRefresh = false; // 重置标记
    }
  },

  get() {
    db.collection('schoolguide')
      .get()
      .then(res => {
        this.setData({
          allWords: res.data,
        });
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  /* 关于侧边栏，点击跳转 */
  jump(event) {
    let id = event.currentTarget.dataset.id;
    // 获取到跳转锚点id
    wx.navigateTo({
      url: './guidance/guidance?id=' + id, // 通过url传到跳转页面
    });
  },
});

// pages/map/instruction/instruction.js
import media from '@data/media';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    map: media.map,
    // 默认地点
    default_point: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      default_point: options.name,
    });
  },

  // 跳转至地点汇总页
  tosite() {
    wx.switchTab({
      url: '../../site/site',
    });
  },

  // 跳转至地图页
  tomap() {
    wx.switchTab({
      url: '../../map/map',
    });
  },
});

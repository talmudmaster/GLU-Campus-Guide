// pages/home/introduction/introduction.js
import media from '@data/media';
import school from '@data/school';

const app = getApp();

const db = wx.cloud.database();

Page({
  /**
   * 组件的初始数据
   */
  data: {
    school_information: school.school_information,

    navigation: media.navigation,

    carousel: [],
    video: '',

    indicatorDots: true,
    indicatorColor: 'white', // 指示点颜色
    activeColor: '#2adce2', // 当前选中的指示点颜色
    autoplay: true, // 是否自动切换
    circular: true, // 是否采用衔接滑动
    interval: 3500, // 间隔时间
    duration: 1500, // 滑动时间
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
    if (app.globalData.introductionRefresh) {
      this.get();
      app.globalData.introductionRefresh = false; // 重置标记
    }
  },

  // 图片比例
  imgHeight(e) {
    var winWid = wx.getWindowInfo().windowWidth; // 获取当前屏幕的宽度
    var imgh = e.detail.height; // 图片高度
    var imgw = e.detail.width; // 图片宽度
    var swiperH = (winWid * imgh) / imgw + 'px'; // 等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height: swiperH, // 设置高度
    });
  },

  // 获取轮播图
  get() {
    db.collection('media')
      .get()
      .then(res => {
        let data = res.data || [];
        let length = data.length;

        if (length) {
          this.setData({
            carousel: data[0].carousel,
            video: data[0].video,
          });
        }
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  tomap() {
    wx.switchTab({
      url: '../../map/map',
    });
  },

  // 点击图片可查看
  lookPhoto(e) {
    var url = e.target.dataset.src;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: this.data.carousel, // 需要预览的图片http链接列表
    });
  },
});

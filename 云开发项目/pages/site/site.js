// pages/site/site.js
import media from '@data/media';

const app = getApp();

const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tag: media.tag,
    little_location: media.little_location,
    site_data: [],

    category: 0,

    id: null,
    card: null,
    dialogShow: false,
    buttons: [
      {
        text: '设为起点',
      },
      {
        text: '设为终点',
      },
    ],

    campus_list: [],
    campus_name_list: [],
    campus_id: 0,
    choose: 0,
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
    if (app.globalData.siteRefresh) {
      this.get();
      app.globalData.siteRefresh = false; // 重置标记
    }
  },

  get() {
    db.collection('campus')
      .get()
      .then(res => {
        let campus_name_list = res.data.map(item => item.name);
        this.setData({
          campus_list: res.data,
          campus_name_list,
        });
        this.lianbiaoquery();
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  // 联表查询
  lianbiaoquery() {
    wx.cloud
      .callFunction({
        name: 'lianbiao_query',
      })
      .then(res => {
        let site_data = res.result.list;

        var choose = this.data.choose;
        var campus_id = this.data.campus_list[choose]._id;
        site_data = site_data
          .map(category => ({
            ...category,
            list: category.list.filter(item => item.campus_id === campus_id),
          }))
          .filter(category => category.list.length > 0);

        this.setData({
          site_data,
          all_site_data: res.result.list,
        });
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  changeCategory(e) {
    this.setData({
      category: e.currentTarget.id,
    });
  },

  // 切换校区
  changeCampus(e) {
    var choose = e.detail.value;
    var campus_id = this.data.campus_list[e.detail.value]._id;

    let site_data = this.data.all_site_data;
    site_data = site_data
      .map(category => ({
        ...category,
        list: category.list.filter(item => item.campus_id === campus_id),
      }))
      .filter(category => category.list.length > 0);

    this.setData({
      choose,
      campus_id,
      site_data,
      category: 0,
    });
  },

  click(e) {
    var card = e.currentTarget.dataset;
    let id = e.currentTarget.id;

    this.setData({
      dialogShow: true,
      card,
      id,
    });
  },

  //点击图片可查看
  lookPhoto(e) {
    var url = e.target.dataset.src;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url], // 需要预览的图片http链接列表
    });
  },

  mapmarker(e) {
    this.setData({
      dialogShow: false,
    });
    let choose = e.detail.item.text;
    var id = this.data.id;
    var category = this.data.category;

    if (choose == '设为终点') {
      var end = this.data.site_data[category].list[id];
      wx.setStorageSync('end', end);
      wx.switchTab({
        url: '../map/map',
      });
    } else {
      var start = this.data.site_data[category].list[id];
      wx.setStorageSync('start', start);
      wx.switchTab({
        url: '../map/map',
      });
    }
  },
});

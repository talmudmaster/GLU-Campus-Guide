// pages/site/site.js
import map from '@data/map';
import media from '@data/media';

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tag: media.tag,
    little_location: media.little_location,
    all_site_data: map.site_data,
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
    const all_site_data = this.data.all_site_data;
    const campus_name_list = all_site_data.map(item => item.name);
    const campus_list = all_site_data.map(item => ({
      id: item.id,
      name: item.name,
    }));

    const choose = this.data.choose;
    const campus_id = campus_list[choose].id;
    const campus = all_site_data.find(item => item.id === campus_id);
    const site_data = campus?.category_list || [];

    this.setData({
      campus_list,
      campus_name_list,
      site_data,
    });
  },

  // 切换校区
  changeCampus(e) {
    const choose = e.detail.value;
    const campus_id = this.data.campus_list[e.detail.value].id;
    const category = 0;

    const all_site_data = this.data.all_site_data;
    const campus = all_site_data.find(item => item.id === campus_id);
    const site_data = campus?.category_list || [];

    this.setData({
      choose,
      campus_id,
      category,
      site_data,
    });
  },

  // 切换地点类型
  changeCategory(e) {
    this.setData({
      category: e.currentTarget.id,
    });
  },

  // 点击地点 打开弹窗
  click(e) {
    var card = e.currentTarget.dataset;
    let id = e.currentTarget.id;

    this.setData({
      dialogShow: true,
      card: card,
      id: id,
    });
  },

  // 点击图片 全屏预览
  lookPhoto(e) {
    var url = e.target.dataset.src;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url], // 需要预览的图片http链接列表
    });
  },

  // 弹窗 按钮事件
  mapmarker(e) {
    this.setData({
      dialogShow: false,
    });

    const id = this.data.id;
    const category = this.data.category;
    const site_data = this.data.site_data;
    const site = site_data[category].list[id];

    const choose = e.detail.item.text;
    if (choose == '设为终点') {
      var end = site;
      wx.setStorageSync('end', end);
    } else {
      var start = site;
      wx.setStorageSync('start', start);
    }

    wx.switchTab({
      url: '../map/map',
    });
  },
});

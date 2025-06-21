// pages/manage/site-list/site-list.js
const app = getApp();

const db = wx.cloud.database();
const _ = db.command;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollLeft: 0,

    category_list: [],
    site_data: [],
    result_list: [],
    category: 0,
    key: null,

    la: '',
    lo: '',

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

  get() {
    this.getCampus();
    this.lianbiaoquery();
    this.getCategory();
  },

  getCampus() {
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
        this.changeCategory(this.data.choose);
      })
      .catch(err => {
        console.log('fail', err);
      });
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

  goSearch() {
    let key = this.data.key;
    if (this.data.key) {
      db.collection('site')
        .where(
          _.or([
            {
              name: db.RegExp({
                regexp: key, // 搜索的值
                options: 'i', // 不区分大小写
              }),
            },
            {
              aliases: db.RegExp({
                regexp: key, // 搜索的值
                options: 'i', // 不区分大小写
              }),
            },
          ]),
        )
        .get()
        .then(res => {
          this.setData({
            result_list: res.data,
            category: 0,
          });
        })
        .catch(err => {
          console.log('fail', err);
        });
    } else {
      wx.showToast({
        icon: 'error',
        title: '请输入内容',
      });
    }
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
    });

    this.changeCategory(this.data.choose);
  },

  changeCategory(e) {
    let choose = null;
    let category = null;
    if (typeof e === 'object') {
      choose = e.currentTarget.id;
      category = e.currentTarget.id;
    } else {
      choose = 0;
      category = 0;
    }
    let scrollLeft = (category - 1) * 60;
    let result_list = this.data.site_data.length == 0 ? [] : this.data.site_data[choose].list;
    this.setData({
      scrollLeft,
      category,
      result_list,
    });
  },

  addsite() {
    wx.navigateTo({
      url: './site/site?sid=1',
    });
  },

  managesite(e) {
    wx.navigateTo({
      url:
        './site/site?sid=2&_id=' +
        e.target.dataset._id +
        '&c_id=' +
        e.target.dataset.c_id +
        '&campus_id=' +
        e.target.dataset.campus_id,
    });
  },
});

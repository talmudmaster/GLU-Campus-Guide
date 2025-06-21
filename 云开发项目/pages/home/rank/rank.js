// pages/home/rank/rank.js
import media from '@data/media';

const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    arrow_first: media.arrow_first,
    arrow_first_no: media.arrow_first_no,
    arrow_last: media.arrow_last,
    arrow_last_no: media.arrow_last_no,
    arrow_left: media.arrow_left,
    arrow_left_no: media.arrow_left_no,
    arrow_right: media.arrow_right,
    arrow_right_no: media.arrow_right_no,

    list: [],
    current: 1, // 当前页数
    pagination: {},

    campus_list: [],
    campus_name_list: [],
    campus_id: 0,
    choose: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.get();
  },

  get() {
    db.collection('campus')
      .get()
      .then(res => {
        let campus_name_list = res.data.map(item => item.name);
        this.setData({
          campus_list: res.data,
          campus_name_list,
          campus_id: res.data[0]._id,
        });
        this.getList();
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  getList() {
    var that = this;
    wx.cloud
      .callFunction({
        name: 'rank',
        data: {
          current: that.data.current,
          campus_id: that.data.campus_id,
        },
      })
      .then(res => {
        that.setData({
          list: res.result.data.data,
          pagination: res.result.pagination,
        });
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  // 翻页
  page(e) {
    let type = e.currentTarget.dataset.type;
    let current = this.data.current;
    switch (type) {
      case 'first': // 首页
        current = 1;
        break;
      case 'previous': // 上一页
        current--;
        break;
      case 'next': // 下一页
        current++;
        break;
      case 'last': // 末页
        current = this.data.pagination.totalPage;
        break;
      default:
        break;
    }
    this.setData({
      current,
    });
    this.getList();
  },

  // 切换校区
  changeCampus(e) {
    var choose = e.detail.value;
    var campus_id = this.data.campus_list[e.detail.value]._id;

    this.setData({
      choose,
      campus_id,
    });

    this.getList();
  },
});

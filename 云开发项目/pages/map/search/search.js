// pages/map/search/search.js
import media from '@data/media';

const db = wx.cloud.database();
const _ = db.command;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: null,
    search_id: 0,
    site_data: [],
    historyStorage: [], // 历史搜索缓存
    hotSearch: [], // 热门搜索缓存

    historyStorageShow: false,
    current: 1,

    isShow: true,
    isShoweye: true,

    // 图标
    delete: media.delete,
    searchIcon: media.searchIcon,
    fire: media.fire,
    history: media.history,
    eyeshow: media.eyeshow,
    eyeclose: media.eyeclose,

    campus_name_list: [],
    campus_list: [],
    campus_id: null,
    choose: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      search_id: options.id,
    });
    // 历史搜索
    let _this = this;
    //_this.searchtype = options.searchtype;
    wx.getStorage({
      key: 'historyStorage',
      success(res) {
        _this.setData({
          historyStorageShow: true,
          historyStorage: res.data,
        });
      },
    });
    this.getCampus();
  },

  getCampus() {
    db.collection('campus')
      .get()
      .then(res => {
        let campus_name_list = res.data.map(item => item.name);
        let campus_id = res.data[0]._id;
        this.setData({
          campus_list: res.data,
          campus_name_list,
          campus_id,
        });
        // 调用热门搜索
        this.gethotSearch();
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  // 切换校区
  changeCampus(e) {
    var choose = e.detail.value;
    var campus_id = this.data.campus_list[e.detail.value]._id;

    this.setData({
      choose,
      campus_id,
    });
    // 调用热门搜索
    this.gethotSearch();
  },

  // 热门搜索的隐藏
  open_eye() {
    this.setData({
      isShoweye: false,
      isShow: !this.data.isShow,
    });
  },
  close_eye() {
    this.setData({
      isShoweye: true,
      isShow: !this.data.isShow,
    });
  },

  // 获取输入框的内容
  getContent(e) {
    this.setData({
      content: e.detail.value,
    });
  },

  // 保存历史搜索
  saveHistory() {
    var content = this.data.content;
    var historyStorage = this.data.historyStorage;
    // 判断历史记录是否超过10条
    if (historyStorage.length < 10) {
      // 判断历史记录中有没有搜索过的词条
      if (!historyStorage.includes(content)) {
        historyStorage.unshift(content); // 未存在
      } else {
        // 已存在
        let i = historyStorage.indexOf(content);
        historyStorage.splice(i, 1);
        historyStorage.unshift(content);
      }
    } else {
      // 判断历史记录中有没有搜索过的词条
      if (!historyStorage.includes(content)) {
        historyStorage.splice(9, 1); // 删除最早的一个元素
        historyStorage.unshift(content); // 未存在
      }
      // 有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
      else {
        // 已存在
        let i = historyStorage.indexOf(content);
        historyStorage.splice(i, 1);
        historyStorage.unshift(content);
      }
    }

    // 储存搜索记录
    wx.setStorage({
      key: 'historyStorage',
      data: historyStorage,
    });
  },

  // 热门搜索
  gethotSearch() {
    var _this = this;
    wx.cloud
      .callFunction({
        name: 'rank',
        data: {
          current: _this.data.current,
          campus_id: _this.data.campus_id,
        },
      })
      .then(res => {
        let data = res.result.data.data;
        data.splice(10, 10); // 删除后10个元素s
        _this.setData({
          hotSearch: data,
        });
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  // 搜索
  goSearch() {
    var content = this.data.content;
    var historyStorage = this.data.historyStorage;
    var site_data = this.data.site_data;
    var result = [];
    if (content != '' && content != null) {
      this.saveHistory();
    }

    // 加载搜索历史
    let _this = this;
    wx.getStorage({
      key: 'historyStorage',
      success(res) {
        _this.setData({
          historyStorageShow: true,
          historyStorage: res.data,
        });
      },
    });

    if (content) {
      db.collection('site')
        .where(
          _.and([
            _.or([
              {
                name: db.RegExp({
                  regexp: content, // 搜索的值
                  options: 'i', // 不区分大小写
                }),
              },
              {
                aliases: db.RegExp({
                  regexp: content, // 搜索的值
                  options: 'i', // 不区分大小写
                }),
              },
            ]),
            {
              campus_id: this.data.campus_id,
            },
          ]),
        )
        .get()
        .then(res => {
          this.setData({
            result: res.data,
          });
          if (this.data.result && this.data.result.length == 0) {
            wx.showToast({
              icon: 'none',
              title: '未找到结果',
            });
          }
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

  // 通过历史记录搜索
  goHistorySearch(e) {
    var content = e.currentTarget.dataset.postname;
    this.setData({
      content,
    });

    this.goSearch();
  },

  // 返回地图页并通过缓存传递参数
  tapback(e) {
    var data = e.currentTarget.dataset;
    let search_id = this.data.search_id;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一个页面
    if (search_id == 1) {
      // 直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        start: data,
      });
    } else {
      prevPage.setData({
        end: data,
      });
    }

    var id = e.currentTarget.id;
    var _id = this.data.result[id]._id;
    // 浏览次数加1
    wx.cloud.callFunction({
      name: 'browse',
      data: {
        _id,
      },
      success(res) {
        console.log('success', res);
      },
      fail(err) {
        console.log('fail', err);
      },
    });

    wx.navigateBack({});
  },

  // 清除搜索历史记录
  remove() {
    var _this = this;
    wx.showModal({
      content: '确认清除所有历史记录?',
      success(res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'historyStorage',
            success(res) {
              _this.setData({
                historyStorage: [],
              });
              wx.setStorageSync('historyStorage', []);
            },
          });
        }
      },
    });
  },
});

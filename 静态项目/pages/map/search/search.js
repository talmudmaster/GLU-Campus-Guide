// pages/map/search/search.js
import map from '@data/map';
import media from '@data/media';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: null,
    search_id: 0,
    all_site_data: map.site_data,
    site_data: [],
    historyStorage: [], // 历史搜索缓存

    historyStorageShow: false,

    campus_name_list: [],
    campus_list: [],
    campus_id: null,
    choose: 0,

    // 图标
    delete: media.delete,
    searchIcon: media.searchIcon,
    history: media.history,
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
    wx.getStorage({
      key: 'historyStorage',
      success(res) {
        _this.setData({
          historyStorageShow: true,
          historyStorage: res.data,
        });
      },
    });

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

    const all_site_data = this.data.all_site_data;
    const campus = all_site_data.find(item => item.id === campus_id);
    const site_data = campus?.category_list || [];

    this.setData({
      choose,
      campus_id,
      site_data,
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
      for (let i = 0; i < site_data.length; i++) {
        for (let j = 0; j < site_data[i].list.length; j++) {
          var data = site_data[i].list[j];
          if (data.name.match(content) || data.aliases.match(content)) {
            result.push(data);
          }
        }
      }
      this.setData({
        result,
      });
      if (result.length == 0) {
        wx.showToast({
          icon: 'none',
          title: '未找到结果',
        });
      }
    } else {
      wx.showToast({
        icon: 'error',
        title: '请输入内容',
      });
    }
  },

  // 通过历史记录搜素
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

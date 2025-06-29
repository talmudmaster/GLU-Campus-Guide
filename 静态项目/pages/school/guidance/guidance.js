// pages/school/guidance/guidance.js
import school from '@data/school';

Page({
  data: {
    allWords: school.school_guide,
    curWords: school.school_guide,

    height: 0,
    detail: 'id0',
  },

  onLoad(options) {
    this.setData({
      height: wx.getWindowInfo().windowHeight - 50, // 获取屏幕高度
      detail: 'id' + options.id, // 获取跳转过来的锚点id
    });
  },

  getRect() {
    var _this = this;
    wx.createSelectorQuery()
      .select('#search')
      .boundingClientRect((rect) => {
        rect.height; // 节点的高度
      })
      .exec(res => {
        _this.setData({
          top: res[0].height,
        });
      });
  },

  clickImg(e) {
    var currentUrl = e.currentTarget.dataset.url;
    var currentId = e.currentTarget.dataset.id;
    var imageList = this.data.curWords[currentId].imageList;
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: imageList, // 需要预览的图片http链接列表，注意是数组
    });
  },

  bindInput(e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },

  search() {
    let inputValue = this.data.inputValue || '';
    wx.showLoading({
      title: '搜索中',
    });
    var res = [];
    for (const i of this.data.allWords) {
      if (
        i.title.indexOf(inputValue) != -1 ||
        i.content.indexOf(inputValue) != -1 ||
        i.keywords.indexOf(inputValue) != -1
      ) {
        res.push(i);
      }
    }
    wx.hideLoading();
    if (res.length == 0) {
      wx.showToast({
        title: '无搜索结果',
        icon: 'none',
      });
    } else {
      this.setData({
        curWords: res,
      });
    }
  },
});

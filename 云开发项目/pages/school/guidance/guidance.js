// pages/school/guidance/guidance.js
const db = wx.cloud.database();

Page({
  data: {
    allWords: [],
    curWords: [],

    detail: 'id0',
  },

  onLoad(options) {
    db.collection('schoolguide')
      .get()
      .then(res => {
        res.data.forEach(item => {
          item.keywords = item.keywords || [];
        });
        this.setData({
          allWords: res.data,
          curWords: res.data,
          detail: 'id' + options.id, // 获取跳转过来的锚点id
        });
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  getRect() {
    var that = this;
    wx.createSelectorQuery()
      .select('#search')
      .boundingClientRect(function (rect) {
        rect.height; // 节点的高度
      })
      .exec(res => {
        that.setData({
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
      fail(err) {
        wx.showToast({
          title: '放大图片失败',
          icon: 'none',
        });
      },
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

// pages/school/guidance/guidance.js
var school = require("../../../utils/school");
Page({
  data: {
    allWords: school.shool_guide,
    curWords: school.shool_guide,

    height: 0,
    detail: "id0",
  },

  onLoad(options) {
    console.log(options.id);
    // this.getRect()
    this.setData({
      height: wx.getSystemInfoSync().windowHeight - 50, // 获取屏幕高度
      detail: "id" + options.id, // 获取跳转过来的锚点id
    });
  },

  getRect() {
    var that = this;
    wx.createSelectorQuery()
      .select("#search")
      .boundingClientRect(function (rect) {
        rect.height; // 节点的高度
      })
      .exec((res) => {
        console.log(res);
        that.setData({
          top: res[0].height,
        });
      });
  },

  clickImg: function (e) {
    console.log(e.currentTarget.dataset);
    var currentUrl = e.currentTarget.dataset.url;
    var currentId = e.currentTarget.dataset.id;
    var imageList = this.data.curWords[currentId].imageList;
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: imageList, // 需要预览的图片http链接列表，注意是数组
      fail: function (err) {
        console.log("放大图片失败", err);
        wx.showToast({
          title: "放大图片失败",
          icon: "none",
        });
      },
    });
  },

  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },

  search() {
    console.log("search", this.data.inputValue);
    wx.showLoading({
      title: "搜索中",
    });
    var res = [];
    for (const i of this.data.allWords) {
      if (
        i.title.indexOf(this.data.inputValue) != -1 ||
        i.content.indexOf(this.data.inputValue) != -1 ||
        i.keywords.indexOf(this.data.inputValue) != -1
      ) {
        res.push(i);
      }
    }
    console.log(this.data.allWords);
    console.log(res);
    wx.hideLoading();
    if (res.length == 0) {
      wx.showToast({
        title: "无搜索结果",
        icon: "none",
      });
    } else {
      this.setData({
        curWords: res,
      });
    }
  },
});

// pages/manage/manage.js
Page({
  taptocampus() {
    wx.navigateTo({
      url: './site/campus-list/campus-list',
    });
  },

  taptocategory(e) {
    wx.navigateTo({
      url: './site/category-list/category-list',
    });
  },

  taptosite(e) {
    wx.navigateTo({
      url: './site/site-list/site-list',
    });
  },

  taptocarousel(e) {
    wx.navigateTo({
      url: './media/carousel/carousel',
    });
  },

  taptovideo(e) {
    wx.navigateTo({
      url: './media/video/video',
    });
  },

  taptodefaultimg(e) {
    wx.navigateTo({
      url: './media/default-image/default-image',
    });
  },

  taptoguide() {
    wx.navigateTo({
      url: './schoolguide-list/schoolguide-list',
    });
  },

  taptoadmin() {
    wx.navigateTo({
      url: './admin-list/admin-list',
    });
  },
});

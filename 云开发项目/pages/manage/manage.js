// pages/manage/manage.js
Page({
    taptocategory(e) {
      wx.navigateTo({
        url: './site/category-list/category-list',
      })
    },
    
    taptosite(e) {
      wx.navigateTo({
        url: './site/site-list/site-list',
      })
    },

    taptodefaultsite() {
        wx.navigateTo({
            url: './site/default-site/default-site',
        })
    },

    taptorange() {
        wx.navigateTo({
            url: './site/range/range',
        })
    },

    taptomapimg(e) {
        wx.navigateTo({
            url: './media/map-img/map-img',
        })
    },

    taptocarousel(e) {
        wx.navigateTo({
            url: './media/carousel/carousel',
        })
    },

    taptovideo(e) {
        wx.navigateTo({
            url: './media/video/video',
        })
    },

    taptodefaultimg(e) {
        wx.navigateTo({
            url: './media/default-image/default-image',
        })
    },

    taptoguide() {
        wx.navigateTo({
            url: './schoolguide-list/schoolguide-list',
        })
    },

    taptoadmin() {
        wx.navigateTo({
            url: './admin-list/admin-list',
        })
    }
})
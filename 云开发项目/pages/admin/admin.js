// pages/admin/admin.js
Page({


    taptosite(e) {
        wx.navigateTo({
            url: './manage/manage?sid=' + e.target.dataset.id,
        })
    },

    taptorange() {
        wx.navigateTo({
            url: './range/range',
        })
    },

    taptomedia(e) {
        wx.navigateTo({
            url: './media/media?sid=' + e.target.dataset.id,
        })
    },

    taptoguide() {
        wx.navigateTo({
            url: './schoolguide-list/schoolguide-list',
        })
    },

    taptoadminmanage() {
        wx.navigateTo({
            url: './adminmanage/adminmanage',
        })
    }
})
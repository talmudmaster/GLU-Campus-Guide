// pages/admin/admin.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    taptosite(e) {
        wx.navigateTo({
            url: '../../pages/admin/manage/manage?sid=' + e.target.dataset.id,
        })
    },

    taptomedia(e) {
        wx.navigateTo({
            url: '../../pages/admin/media/media?sid=' + e.target.dataset.id,
        })
    },

    taptoguide() {
        wx.navigateTo({
            url: './schoolguide-list/schoolguide-list',
        })
    },

    taptoadminmanage() {
        wx.navigateTo({
            url: '../../pages/admin/adminmanage/adminmanage',
        })
    }
})
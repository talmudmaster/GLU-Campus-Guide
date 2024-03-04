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

    taptosite() {
        wx.navigateTo({
            url: '../../pages/admin/manage/manage',
        })
    },

    taptomedia() {
        wx.navigateTo({
            url: '../../pages/admin/media/media',
        })
    }
})
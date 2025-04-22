// pages/school/school.js
// var school = require('../../data/school')
var media = require('../../data/media')
const app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		allWords: [],

		green_arrow: media.green_arrow
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
    onLoad(options) {
			this.get()
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
			if (app.globalData.schoolguideRefresh) {
				this.get()
				app.globalData.schoolguideRefresh = false // 重置标记
			}
    },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
    onHide() {

    },

	/**
	 * 生命周期函数--监听页面卸载
	 */
    onUnload() {

    },

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
    onPullDownRefresh() {

    },

	/**
	 * 页面上拉触底事件的处理函数
	 */
    onReachBottom() {

    },

	/**
	 * 用户点击右上角分享
	 */
    onShareAppMessage() {

    },

		get() {
			wx.cloud.database().collection('schoolguide')
				.get()
				.then(res => {
					console.log('success', res)
					this.setData({
						allWords: res.data
					})
				})
				.catch(err => {
					console.log('fail', err)
				})
		},

		/* 关于侧边栏，点击跳转 */
		jump(event) {
					let id = event.currentTarget.dataset.id;
			// 获取到跳转锚点id
			wx.navigateTo({
							url: '/pages/school/guidance/guidance?id=' + id, // 通过url传到跳转页面
			})
    },

})
// app.js
App({
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLaunch() {
		// 在调用云开发各 API 前，需先调用初始化方法 init 一次
		wx.cloud.init({
			env: 'coder1-9gl7sd9c94ac3c80' // 云开发id
		})
	},

	globalData: {
		userInfo: null,
		mapRefresh: false,
		siteRefresh: false,
		schoolRefresh: false,
    schoolguideRefresh: false,
		introductionRefresh: false
	}
})
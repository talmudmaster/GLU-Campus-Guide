// pages/home/introduction/introduction.js
import media from '@data/media'
import school from '@data/school'

const app = getApp()

const db = wx.cloud.database()

Page({

	/**
	 * 组件的初始数据
	 */
	data: {
		school_information: school.school_information,

		navigation: media.navigation,

		background: [],
		videourl: '',

		indicatorDots: true,
        indicatorColor: "white", //指示点颜色
        activeColor: "#2adce2", //当前选中的指示点颜色
		autoplay: true, //是否自动切换
		circular: true, //是否采用衔接滑动
		interval: 3500, //间隔时间
        duration: 1500, //滑动时间
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.get()
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		if (app.globalData.introductionRefresh) {
            this.get();
            app.globalData.introductionRefresh = false; // 重置标记
		}
	},

	//图片比例
	imgHeight(){
        var winWid = wx.getWindowInfo().windowWidth; //获取当前屏幕的宽度
        var imgh = e.detail.height; //图片高度
        var imgw = e.detail.width; //图片宽度
        var swiperH = winWid * imgh / imgw + "px" //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
		this.setData({
			Height: swiperH //设置高度
		})
	},

	// 获取轮播图
	get() {
		db.collection('media')
			.where({
                name: "轮播图"
			})
			.get()
			.then(res => {
				console.log('success', res.data[0].img)
				this.setData({
                    background: res.data[0].img,
				})
			})
			.catch(err => {
				console.log('fail', err)
			})

		db.collection('media')
			.where({
                name: "视频"
			})
			.get()
			.then(res => {
				console.log('success', res.data[0].img)
				this.setData({
                    videourl: res.data[0].img,
				})
			})
			.catch(err => {
				console.log('fail', err)
			})
	},

	tomap() {
		wx.switchTab({
            url: '../../map/map',
		})
	},
	//点击图片可查看
	lookPhoto(e) {
        console.log("点击了图片", e.target.dataset.src)
		var url = e.target.dataset.src
		wx.previewImage({
			current: url, // 当前显示图片的http链接
			urls: this.data.background // 需要预览的图片http链接列表
		})
    },
})
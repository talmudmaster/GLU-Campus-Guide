// pages/school/school.js
import media from '@data/media'
import school from '@data/school'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		allWords: school.school_guide,

		green_arrow: media.green_arrow
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
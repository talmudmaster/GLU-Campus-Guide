// pages/site/site.js
import media from '@data/media'

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tag: media.tag,
        little_location: media.little_location,
        site_data: [],

        category: 0,

        id: null,
        card: null,
        dialogShow: false,
        buttons: [{
            text: '设为起点'
        }, {
            text: '设为终点'
        }],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.lianbiaoquery()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if (app.globalData.siteRefresh) {
            this.lianbiaoquery();
            app.globalData.siteRefresh = false; // 重置标记
        }
    },

    // 联表查询
    lianbiaoquery() {
        wx.cloud.callFunction({
                name: 'lianbiao_query',
            })
            .then(res => {
                console.log(res.result.list)
                this.setData({
                    site_data: res.result.list
                })
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    changeCategory(e) {
        console.log("地点类型", e.currentTarget.id)
        this.setData({
            category: e.currentTarget.id,
        })
    },

    click(e) {
        console.log(e)
        var card = e.currentTarget.dataset
        let id = e.currentTarget.id

        this.setData({
            dialogShow: true,
            card: card,
            id: id,
        })

    },

    //点击图片可查看
    lookPhoto(e) {
        console.log("点击了图片", e.target.dataset.src)
        var url = e.target.dataset.src
        wx.previewImage({
            current: url, // 当前显示图片的http链接
            urls: [url] // 需要预览的图片http链接列表
        })
    },

    mapmarker(e) {
        this.setData({
            dialogShow: false,
        })
        console.log(e.detail)
        let choose = e.detail.item.text
        var id = this.data.id
        var category = this.data.category
        console.log(this.data.site_data[category].list[id])

        if (choose == "设为终点") {
            var end = this.data.site_data[category].list[id]
            console.log(end)
            wx.setStorageSync('end', end)
            wx.switchTab({
                url: '../map/map',
            })
        } else {
            var start = this.data.site_data[category].list[id]
            console.log(start)
            wx.setStorageSync('start', start)
            wx.switchTab({
                url: '../map/map',
            })
        }
    }

})
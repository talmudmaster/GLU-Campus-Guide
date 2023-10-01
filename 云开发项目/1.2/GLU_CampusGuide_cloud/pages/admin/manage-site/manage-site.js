// pages/manage-site/manage-site.js
let db = wx.cloud.database()
let _ = db.command
Page({

    /**
     * 页面的初始数据
     */
    data: {
        category_list: [],
        site_list: [],
        list: [],
        windowHeight: 1,
        sid: 1,
        category: 1,
        key: null,
        _id: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.lianbiaoquery()
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
        this.lianbiaoquery()
        this.getCategory()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.getCategory()
    },

    lianbiaoquery(){
        wx.cloud.callFunction({
            name: 'lianbiaoquery',
        })
        .then(res => {
            console.log('success', res.result)
            this.setData({
                list: res.result
            })
            this.getCategory()
            this.getSiteList()
        })
        .catch(err => {
            console.log('fail', err)
        })
    },

    getCategory() {
        wx.cloud.database().collection('category')
            .get()
            .then(res => {
                console.log('success', res)
                this.setData({
                    category_list: res.data
                })
                wx.stopPullDownRefresh()
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    getKey(e) {
        this.setData({
            key: e.detail.value
        })
    },
    goSearch() {
        console.log(this.data.key)
        let key = this.data.key
        if (this.data.key) {
            db.collection('site')
                .where(_.or([{
                        name: db.RegExp({
                            regexp: key, // 搜索的值
                            options: 'i', // 不区分大小写
                        })
                    },
                    {
                        aliases: db.RegExp({
                            regexp: key, // 搜索的值
                            options: 'i', // 不区分大小写
                        })
                    }
                ]))
                .get()
                .then(res => {
                    console.log('success', res)
                    this.setData({
                        site_list: res.data,
                        category: 0
                    })
                    wx.stopPullDownRefresh()
                })
                .catch(err => {
                    console.log('fail', err)
                })
        } else {
            wx.showToast({
                icon: 'error',
                title: '请输入内容',
            })
        }
    },

    changeCategory(e) {
        this.setData({
            category: e.target.dataset.c_id,
        })
        this.getSiteList()
    },

    getSiteList() {
        let category = this.data.category
        console.log(category)
        let site_list = this.data.list.list[category - 1].site_list
        console.log(site_list)
        this.setData({
            site_list: site_list,
        })
    },

    addcategory() {
        wx.navigateTo({
            url: '../../admin/category-manage/category-manage?sid=1',
        })
    },

    managecategory(e) {
        console.log(e.target.dataset._id)
        console.log(e.target.dataset.id)
        wx.navigateTo({
            url: '../../admin/category-manage/category-manage?sid=2&_id=' + e.target.dataset._id + '&id=' + e.target.dataset.id + '&name=' + e.target.dataset.name,
        })
    },

    addsite() {
        wx.navigateTo({
            url: '../../admin/site-manage/site-manage?sid=1',
        })
    },

    managesite(e) {
        console.log(e.target.dataset._id)
        console.log(e.target.dataset.id)
        wx.navigateTo({
            url: '../../admin/site-manage/site-manage?sid=2&_id=' + e.target.dataset._id + '&id=' + e.target.dataset.id,
        })
    },



    click1: function (event) {
        this.setData({
            sid: 1,
        })
    },

    click2: function (event) {
        this.setData({
            sid: 2,
        })
    },
})
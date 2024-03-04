// pages/manage-site/manage-site.js
let db = wx.cloud.database()
let _ = db.command
Page({

    /**
     * 页面的初始数据
     */
    data: {
        category_list: [],
        site_data: [],
        result_list: [],
        windowHeight: 1,
        sid: 1,
        category: 0,
        key: null,
        _id: null,

        default_point: null,
        default_id: null,
        default_site_name: "",
        s_id: null,

        la: "",
        lo: "",

        static: {
            currentTarget: {
                id: 0,
            }
        }
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

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.get()
    },

    get() {
        this.lianbiaoquery()
        this.getCategory()
        this.getDefaultSite()
    },

    lianbiaoquery() {
        wx.cloud.callFunction({
                name: 'lianbiao_query',
            })
            .then(res => {
                console.log('success', res.result.list)
                this.setData({
                    site_data: res.result.list
                })
                this.changeCategory(this.data.static)
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

    getDefaultSite() {
        db.collection('media')
            .where({
                name: "默认地点"
            })
            .get()
            .then(res => {
                console.log('success', res.data[0])
                this.setData({
                    default_id: res.data[0]._id,
                    s_id: res.data[0].s_id,
                })
                this.getDefaultSiteName()
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    getDefaultSiteName() {
        db.collection('site')
            .doc(this.data.s_id)
            .get()
            .then(res => {
                console.log('success', res.data)
                this.setData({
                    default_site_name: res.data.name
                })
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
                        result_list: res.data,
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
        let category = e.currentTarget.id
        let result_list = this.data.site_data[e.currentTarget.id].list
        this.setData({
            category: category,
            result_list: result_list
        })
    },

    addcategory() {
        wx.navigateTo({
            url: '../../admin/manage-category/manage-category?sid=1',
        })
    },

    managecategory(e) {
        console.log(e.target.dataset._id)
        console.log(e.target.dataset.id)
        wx.navigateTo({
            url: '../../admin/manage-category/manage-category?sid=2&_id=' + e.target.dataset._id + '&id=' + e.target.dataset.id + '&name=' + e.target.dataset.name,
        })
    },

    addsite() {
        wx.navigateTo({
            url: '../../admin/manage-site/manage-site?sid=1',
        })
    },

    managesite(e) {
        console.log(e.target.dataset)
        wx.navigateTo({
            url: '../../admin/manage-site/manage-site?sid=2&_id=' + e.target.dataset._id + '&c_id=' + e.target.dataset.c_id,
        })
    },

    setdefaultsite(e) {
        console.log(e.target.dataset)
        var s_id = e.target.dataset._id
        var default_id = this.data.default_id
        wx.cloud.callFunction({
                name: 'set_default_site',
                data: {
                    s_id: s_id,
                    default_id: default_id,
                }
            })
            .then(res => {
                console.log('success', res)
                wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 2000
                })
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    click1: function (e) {
        this.setData({
            sid: 1,
        })
    },

    click2: function (e) {
        this.setData({
            sid: 2,
        })
    },

    click3: function (e) {
        this.setData({
            sid: 3,
        })
    },
})
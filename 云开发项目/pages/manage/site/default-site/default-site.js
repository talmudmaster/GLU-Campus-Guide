// pages/manage/site/default-site/default-site.js
const app = getApp()

const db = wx.cloud.database()
const _ = db.command

Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrollLeft: 0,
        
        category_list: [],
        site_data: [],
        result_list: [],
        category: 0,
        key: null,

        default_point: null,
        default_id: null,
        default_site_name: "",
        s_id: null,
        
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
        db.collection('category')
            .get()
            .then(res => {
                console.log('success', res)
                this.setData({
                    category_list: res.data
                })
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
                app.globalData.mapRefresh = true; // 标记 tab地图页 需刷新
                app.globalData.siteRefresh = true; // 标记 tab地点页 需刷新
                this.lianbiaoquery()
                this.getDefaultSite()
            })
            .catch(err => {
                console.log('fail', err)
            })
    },
})
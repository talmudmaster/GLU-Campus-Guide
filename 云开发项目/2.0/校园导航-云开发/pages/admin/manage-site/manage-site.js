// pages/site-manage/site-manage.js
let db = wx.cloud.database()
let _ = db.command
Page({

    /**
     * 页面的初始数据
     */
    data: {
        site_list: [],
        category_list: [],
        category_name_list: [],

        choose: 0,
        defaulturl: null,

        _id: null,
        name: null,
        aliases: "",
        desc: "",
        c_id: null,
        la: "",
        lo: "",
        img: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        var sid = options.sid
        var _id = options._id
        var c_id = options.c_id
        this.setData({
            sid: sid,
            _id: _id,
            c_id: c_id
        })

        if (_id != null) {
            db.collection('site')
                .doc(_id)
                .get()
                .then(res => {
                    let now_site = res.data
                    console.log(now_site)
                    this.setData({
                        name: now_site.name,
                        aliases: now_site.aliases,
                        desc: now_site.desc,
                        c_id: now_site.c_id,
                        la: now_site.latitude,
                        lo: now_site.longitude,
                        img: now_site.img
                    })
                })
                .catch(err => {
                    console.log('fail', err)
                })
        }

        db.collection('category')
            .get()
            .then(res => {
                let category_list = res.data
                let category_name_list = []
                for (let i = 0; i < category_list.length; i++) {
                    let m = category_list[i].name
                    category_name_list.push(m)

                    if (_id != null && c_id == category_list[i]._id) {
                        this.setData({
                            choose: i
                        })
                    }
                }
                this.setData({
                    category_list: category_list,
                    category_name_list: category_name_list,
                    c_id: category_list[0]._id
                })
            })
            .catch(err => {
                console.log('fail', err)
            })
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

    get() {
        db.collection('media')
            .where({
                name: "默认图片"
            })
            .get()
            .then(res => {
                console.log('success', res.data[0].img)
                this.setData({
                    defaulturl: res.data[0].img,
                })
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    addsite() {
        var that = this
        // 如果不上传图片就上传默认图片
        if (this.data.img == null || this.data.img == "") {
            this.setData({
                img: that.data.defaulturl
            })
        }

        if (this.data.name != null && this.data.name != "" && this.data.la != null && this.data.la != "" && this.data.lo != null && this.data.lo != "") {
            wx.cloud.callFunction({
                    name: 'add_site',
                    data: {
                        name: this.data.name,
                        aliases: this.data.aliases,
                        desc: this.data.desc,
                        c_id: this.data.c_id,
                        la: this.data.la,
                        lo: this.data.lo,
                        img: this.data.img,
                    }
                })
                .then(res => {
                    console.log('success', res)
                    wx.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 2000
                    })
                    setTimeout(() => {
                        wx.navigateBack()
                    }, 1500)
                })
                .catch(err => {
                    console.log('fail', err)
                })
        } else {
            wx.showToast({
                title: '地点名称和经纬度必填，请补充',
                icon: 'none',
                duration: 2000
            })
        }
    },

    updatesite() {
        var that = this
        // 如果不上传图片就上传默认图片
        if (this.data.img == null || this.data.img == "") {
            this.setData({
                img: that.data.defaulturl
            })
        }

        if (this.data.name != null && this.data.name != "" && this.data.la != null && this.data.name != "" && this.data.lo != null && this.data.lo != "") {
            wx.cloud.callFunction({
                    name: 'update_site',
                    data: {
                        _id: this.data._id,
                        name: this.data.name,
                        aliases: this.data.aliases,
                        desc: this.data.desc,
                        c_id: this.data.c_id,
                        la: this.data.la,
                        lo: this.data.lo,
                        img: this.data.img,
                    }
                })
                .then(res => {
                    console.log('success', res)
                    wx.showToast({
                        title: '修改成功',
                        icon: 'success',
                        duration: 2000
                    })
                    setTimeout(() => {
                        wx.navigateBack()
                    }, 1500)
                })
                .catch(err => {
                    console.log('fail', err)
                })
        } else {
            wx.showToast({
                title: '地点名称和经纬度必填，请补充',
                icon: 'none',
                duration: 2000
            })
        }
    },

    removesite() {
        var _id = this.data._id
        wx.showModal({
            title: '提示',
            content: '删除操作不可逆\n请谨慎操作！',
            success(res) {
                if (res.confirm) {
                    db.collection('media')
                        .where({
                            name: "默认地点"
                        })
                        .get()
                        .then(res => {
                            console.log('success', res.data[0].s_id)
                            var s_id = res.data[0].s_id
                            if (s_id != _id) {
                                wx.cloud.callFunction({
                                        name: 'remove_site',
                                        data: {
                                            id: _id,
                                        }
                                    })
                                    .then(res => {
                                        console.log('success', res)
                                        wx.showToast({
                                            title: '删除成功',
                                            icon: 'success',
                                            duration: 2000
                                        })
                                        setTimeout(() => {
                                            wx.navigateBack()
                                        }, 1000)
                                    })
                                    .catch(err => {
                                        console.log('fail', err)
                                    })
                            } else {
                                wx.showToast({
                                    title: '该地点为默认地点，无法删除！\n若想删除，请修改默认地点',
                                    icon: 'none',
                                    duration: 4000
                                })
                            }
                        })
                        .catch(err => {
                            console.log('fail', err)
                        })
                }
            }
        })
    },

    getName(e) {
        this.setData({
            name: e.detail.value
        })
    },

    getAliases(e) {
        this.setData({
            aliases: e.detail.value
        })
    },

    getDesc(e) {
        this.setData({
            desc: e.detail.value
        })
    },

    bindchange(e) {
        console.log(e.detail.value)
        var choose = e.detail.value
        var c_id = this.data.category_list[e.detail.value]._id
        this.setData({
            choose: choose,
            c_id: c_id
        })
        console.log(this.data.choose)
        console.log(this.data.category_name_list[this.data.choose])
        console.log(this.data.category_list[this.data.choose]._id)
    },

    getPoint() {
        wx.navigateTo({
            url: '../../admin/manage-site/getpoint/getpoint?lo=' + this.data.lo + '&la=' + this.data.la,
        })
    },

    getImg() {
        var that = this
        wx.chooseMedia({
            count: 1,
            success(res) {
                console.log(res.tempFiles)
                var po = res.tempFiles[0].tempFilePath.lastIndexOf(".")
                var ext = res.tempFiles[0].tempFilePath.slice(po)
                wx.cloud.uploadFile({
                    cloudPath: that.data.name + ext,
                    filePath: res.tempFiles[0].tempFilePath,
                    success(res) {
                        console.log(res.fileID)
                        that.setData({
                            img: res.fileID
                        })
                    }
                })
            }
        })
    }
})
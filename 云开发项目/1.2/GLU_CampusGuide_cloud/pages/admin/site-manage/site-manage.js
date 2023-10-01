// pages/site-manage/site-manage.js
let db = wx.cloud.database()
let _ = db.command
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sid: 1,
        name: null,
        aliases: "",
        desc: "",
        site_list: [],
        category_name_list: [],
        _id: null,
        choose: 0,
        la: "",
        lo: "",
        img: "",
        s_id: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.sid)
        console.log(options._id)
        this.setData({
            sid: options.sid,
            _id: options._id,
        })

        if (this.data._id != null) {
            db.collection('site')
                .doc(this.data._id)
                .get()
                .then(res => {
                    let now_site = res.data
                    console.log(now_site)
                    this.setData({
                        name: now_site.name,
                        aliases: now_site.aliases,
                        desc: now_site.desc,
                        choose: now_site.c_id - 1,
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
                }
                this.setData({
                    category_name_list: category_name_list
                })
            })
            .catch(err => {
                console.log('fail', err)
            })

        this.getAllSiteList()
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

    getAllSiteList() {
        wx.cloud.callFunction({
                name: 'queryallsite',
            })
            .then(res => {
                console.log(res.result.data)
                let site_list = res.result.data
                let s_id = site_list[site_list.length - 1].s_id + 1
                this.setData({
                    s_id: s_id
                })
                console.log(s_id)
            })
            .catch(err => {
                console.log('fail', err)
            })

    },

    addsite() {
        // 如果不上传图片就上传默认图片
        if (this.data.img == null || this.data.img == "") {
            this.setData({
                img: "cloud://gluguide-0g65cvsv649006da.676c-gluguide-0g65cvsv649006da-1316857255/学校/素材/schoolicon.png"
            })
        }

        if (this.data.name != null && this.data.name != "" && this.data.la != null && this.data.name != "" && this.data.lo != null && this.data.lo != "") {
            wx.cloud.callFunction({
                    name: 'addsite',
                    data: {
                        name: this.data.name,
                        aliases: this.data.aliases,
                        desc: this.data.desc,
                        c_id: this.data.choose + 1,
                        la: this.data.la,
                        lo: this.data.lo,
                        img: this.data.img,
                        s_id: this.data.s_id,
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
        // 如果不上传图片就上传默认图片
        if (this.data.img == null || this.data.img == "") {
            this.setData({
                img: "cloud://gluguide-0g65cvsv649006da.676c-gluguide-0g65cvsv649006da-1316857255/学校/素材/schoollog.png"
            })
        }

        if (this.data.name != null && this.data.name != "" && this.data.la != null && this.data.name != "" && this.data.lo != null && this.data.lo != "") {
            wx.cloud.callFunction({
                    name: 'updatesite',
                    data: {
                        _id: this.data._id,
                        name: this.data.name,
                        aliases: this.data.aliases,
                        desc: this.data.desc,
                        c_id: this.data.choose + 1,
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
        var that = this
        wx.showModal({
            title: '提示',
            content: '删除操作不可逆\n请谨慎操作！',
            success(res) {
                if (res.confirm) {
                    wx.cloud.callFunction({
                            name: 'removesite',
                            data: {
                                id: that.data._id,
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
        this.setData({
            choose: parseInt(e.detail.value)
        })
        console.log(this.data.choose)
        console.log(this.data.category_name_list[this.data.choosechoose])
    },

    getPoint() {
        wx.navigateTo({
            url: '../../admin/getpoint/getpoint?lo=' + this.data.lo + '&la=' + this.data.la,
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
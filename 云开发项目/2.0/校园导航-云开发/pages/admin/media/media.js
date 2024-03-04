// pages/media/media.js
let db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sid: 1,

        map: null,
        map_id: null,
        mapurl: null,

        indicatorDots: true,
        vertical: false,
        autoplay: true,
        circular: true,
        interval: 3500,
        duration: 1500,

        video: null,
        video_id: null,
        videourl: null,

        background: null,
        background_id: null,
        backgroundurl: [],

        default: null,
        default_id: null,
        defaulturl: null,
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

    get() {
        db.collection('media')
            .where({
                name: "地图"
            })
            .get()
            .then(res => {
                console.log('success', res.data[0].img)
                this.setData({
                    map: res.data[0].img,
                    map_id: res.data[0]._id
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
                console.log('success', res.data[0].video)
                this.setData({
                    video: res.data[0].img,
                    video_id: res.data[0]._id
                })
            })
            .catch(err => {
                console.log('fail', err)
            })

        db.collection('media')
            .where({
                name: "轮播图"
            })
            .get()
            .then(res => {
                console.log('success', res.data[0].list)
                this.setData({
                    background: res.data[0].img,
                    background_id: res.data[0]._id
                })
            })
            .catch(err => {
                console.log('fail', err)
            })

        db.collection('media')
            .where({
                name: "默认图片"
            })
            .get()
            .then(res => {
                console.log('success', res.data[0].img)
                this.setData({
                    default: res.data[0].img,
                    default_id: res.data[0]._id
                })
            })
            .catch(err => {
                console.log('fail', err)
            })
    },

    getMap() {
        var that = this
        wx.chooseMedia({
            count: 1,
            success(res) {
                console.log(res.tempFiles)
                var po = res.tempFiles[0].tempFilePath.lastIndexOf(".")
                var ext = res.tempFiles[0].tempFilePath.slice(po)
                wx.cloud.uploadFile({
                    cloudPath: new Date().getTime() + ext,
                    filePath: res.tempFiles[0].tempFilePath,
                    success(res) {
                        console.log(res.fileID)
                        that.getImagePath(res.fileID)
                    }
                })
            }
        })
    },

    // 获取图片上传后的https的url路径地址  参数是上传图片的 fileId
    getImagePath(fileId) {
        var that = this
        console.log(fileId)
        wx.cloud.getTempFileURL({
            fileList: [fileId],
            success(res) {
                console.log("获取url地址：", res.fileList[0].tempFileURL);
                that.setData({
                    mapurl: res.fileList[0].tempFileURL
                })
            },
        })
    },

    updateMap() {
        if (this.data.mapurl != null) {
            wx.cloud.callFunction({
                    name: 'update_media',
                    data: {
                        _id: this.data.map_id,
                        img: this.data.mapurl,
                    }
                })
                .then(res => {
                    console.log('success', res)
                    wx.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 2000
                    })
                    this.get()
                })
                .catch(err => {
                    console.log('fail', err)
                })
        } else {
            wx.showToast({
                title: '请选择图片',
                icon: 'none',
                duration: 2000
            })
        }
    },

    getImg() {
        var that = this
        var list = that.data.backgroundurl
        wx.chooseMedia({
            count: 6,
            success(res) {
                console.log(res.tempFiles)
                for (var i = 0; i < res.tempFiles.length; i++) {
                    var po = res.tempFiles[i].tempFilePath.lastIndexOf(".")
                    var ext = res.tempFiles[i].tempFilePath.slice(po)
                    wx.cloud.uploadFile({
                        cloudPath: new Date().getTime() + ext,
                        filePath: res.tempFiles[i].tempFilePath,
                        success(res) {
                            console.log(res.fileID)
                            list.push(res.fileID)
                            console.log(list)
                            that.setData({
                                backgroundurl: list
                            })
                        }
                    })
                }
            }
        })
    },

    getVideo() {
        var that = this
        wx.chooseMedia({
            count: 1,
            success(res) {
                console.log(res.tempFiles)
                var po = res.tempFiles[0].tempFilePath.lastIndexOf(".")
                var ext = res.tempFiles[0].tempFilePath.slice(po)
                wx.cloud.uploadFile({
                    cloudPath: new Date().getTime() + ext,
                    filePath: res.tempFiles[0].tempFilePath,
                    success(res) {
                        console.log(res.fileID)
                        that.setData({
                            videourl: res.fileID
                        })
                    }
                })
            }
        })
    },

    updateImg() {
        if (this.data.backgroundurl.length > 2) {
            wx.cloud.callFunction({
                    name: 'update_media',
                    data: {
                        _id: this.data.background_id,
                        img: this.data.backgroundurl,
                    }
                })
                .then(res => {
                    console.log('success', res)
                    wx.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 2000
                    })
                    this.get()
                })
                .catch(err => {
                    console.log('fail', err)
                })
        } else if (this.data.backgroundurl.length > 0) {
            wx.showToast({
                title: '请选择3-6张图片',
                icon: 'none',
                duration: 2000
            })
        } else {
            wx.showToast({
                title: '请选择图片',
                icon: 'none',
                duration: 2000
            })
        }
    },

    updateVideo() {
        if (this.data.videourl != null) {
            wx.cloud.callFunction({
                    name: 'update_media',
                    data: {
                        _id: this.data.video_id,
                        img: this.data.videourl,
                    }
                })
                .then(res => {
                    console.log('success', res)
                    wx.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 2000
                    })
                    this.get()
                })
                .catch(err => {
                    console.log('fail', err)
                })
        } else {
            wx.showToast({
                title: '请选择视频',
                icon: 'none',
                duration: 2000
            })
        }
    },

    getDefault() {
        var that = this
        wx.chooseMedia({
            count: 1,
            success(res) {
                console.log(res.tempFiles)
                var po = res.tempFiles[0].tempFilePath.lastIndexOf(".")
                var ext = res.tempFiles[0].tempFilePath.slice(po)
                wx.cloud.uploadFile({
                    cloudPath: new Date().getTime() + ext,
                    filePath: res.tempFiles[0].tempFilePath,
                    success(res) {
                        console.log(res.fileID)
                        that.setData({
                            defaulturl: res.fileID
                        })
                    }
                })
            }
        })
    },

    updateDefault() {
        if (this.data.defaulturl != null) {
            wx.cloud.callFunction({
                    name: 'update_media',
                    data: {
                        _id: this.data.default_id,
                        img: this.data.defaulturl,
                    }
                })
                .then(res => {
                    console.log('success', res)
                    wx.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 2000
                    })
                    this.get()
                })
                .catch(err => {
                    console.log('fail', err)
                })
        } else {
            wx.showToast({
                title: '请选择图片',
                icon: 'none',
                duration: 2000
            })
        }
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

    click4: function (e) {
        this.setData({
            sid: 4,
        })
    },
})
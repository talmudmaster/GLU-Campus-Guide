// pages/manage/media/map-img/map-img.js
const app = getApp()

const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        map: null,
        map_id: null,
        mapurl: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.get()
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
                    app.globalData.mapRefresh = true; // 标记 tab地图页 需刷新
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
})
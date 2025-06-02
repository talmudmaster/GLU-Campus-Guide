// pages/manage/media/video/video.js
const app = getApp()

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: null,
    video_id: null,
    videourl: null,
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
          app.globalData.introductionRefresh = true; // 标记 page介绍页 需刷新
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
})
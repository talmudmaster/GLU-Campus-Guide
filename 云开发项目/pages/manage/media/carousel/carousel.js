// pages/manage/media/carousel/carousel.js
const app = getApp()

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 3500,
    duration: 1500,

    background: null,
    background_id: null,
    backgroundurl: [],
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
          app.globalData.schoolRefresh = true; // 标记 tab首页 需刷新
          app.globalData.introductionRefresh = true; // 标记 page介绍页 需刷新
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
})
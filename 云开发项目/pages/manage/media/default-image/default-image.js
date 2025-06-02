// pages/manage/media/default-image/default-image.js
const app = getApp()

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  get() {
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
})
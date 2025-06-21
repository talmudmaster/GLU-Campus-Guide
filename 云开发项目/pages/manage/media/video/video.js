// pages/manage/media/video/video.js
const app = getApp();

const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    video: null,
    videoPreview: null,
    _id: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.get();
  },

  get() {
    var that = this;
    db.collection('media')
      .get()
      .then(res => {
        let data = res.data || [];
        let length = data.length;

        if (length) {
          this.setData({
            _id: data[0]._id,
            carousel: data[0].carousel,
            video: data[0].video,
            defaultImg: data[0].defaultImg,
          });
        } else {
          that.addMedia();
        }
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  addMedia() {
    wx.cloud
      .callFunction({
        name: 'add_media',
      })
      .then(res => {
        console.log('success', res);
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  getVideo() {
    var that = this;
    wx.chooseMedia({
      count: 1,
      success(res) {
        var po = res.tempFiles[0].tempFilePath.lastIndexOf('.');
        var ext = res.tempFiles[0].tempFilePath.slice(po);
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + ext,
          filePath: res.tempFiles[0].tempFilePath,
          success(res) {
            that.setData({
              videoPreview: res.fileID,
            });
          },
        });
      },
    });
  },

  updateVideo() {
    if (this.data.videoPreview != null) {
      wx.cloud
        .callFunction({
          name: 'update_media',
          data: {
            _id: this.data._id,
            carousel: this.data.carousel,
            video: this.data.videoPreview,
            defaultImg: this.data.defaultImg,
          },
        })
        .then(res => {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000,
          });
          app.globalData.introductionRefresh = true; // 标记 page介绍页 需刷新
          this.get();
        })
        .catch(err => {
          console.log('fail', err);
        });
    } else {
      wx.showToast({
        title: '请选择视频',
        icon: 'none',
        duration: 2000,
      });
    }
  },
});

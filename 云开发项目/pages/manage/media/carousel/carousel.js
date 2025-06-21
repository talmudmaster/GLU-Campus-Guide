// pages/manage/media/carousel/carousel.js
const app = getApp();

const db = wx.cloud.database();

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

    carousel: null,
    carouselPreview: [],
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

  getImg() {
    var that = this;
    var list = that.data.carouselPreview;
    wx.chooseMedia({
      count: 6,
      success(res) {
        for (var i = 0; i < res.tempFiles.length; i++) {
          var po = res.tempFiles[i].tempFilePath.lastIndexOf('.');
          var ext = res.tempFiles[i].tempFilePath.slice(po);
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + ext,
            filePath: res.tempFiles[i].tempFilePath,
            success(res) {
              list.push(res.fileID);
              that.setData({
                carouselPreview: list,
              });
            },
          });
        }
      },
    });
  },

  updateImg() {
    if (this.data.carouselPreview.length > 2) {
      wx.cloud
        .callFunction({
          name: 'update_media',
          data: {
            _id: this.data._id,
            carousel: this.data.carouselPreview,
            video: this.data.video,
            defaultImg: this.data.defaultImg,
          },
        })
        .then(res => {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000,
          });
          app.globalData.schoolRefresh = true; // 标记 tab首页 需刷新
          app.globalData.introductionRefresh = true; // 标记 page介绍页 需刷新
          this.get();
        })
        .catch(err => {
          console.log('fail', err);
        });
    } else if (this.data.carouselPreview.length > 0) {
      wx.showToast({
        title: '请选择3-6张图片',
        icon: 'none',
        duration: 2000,
      });
    } else {
      wx.showToast({
        title: '请选择图片',
        icon: 'none',
        duration: 2000,
      });
    }
  },
});

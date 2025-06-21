// pages/manage/site/site-list/site/admin.js
const app = getApp();

const db = wx.cloud.database();
const _ = db.command;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    site_list: [],
    category_list: [],
    category_name_list: [],
    choose: 0,

    campus_list: [],
    campus_name_list: [],
    choose_campus: 0,

    defaultImg: null,

    _id: null,
    name: null,
    aliases: '',
    desc: '',
    c_id: null,
    campus_id: null,
    la: '',
    lo: '',
    img: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var sid = options.sid;
    var _id = options._id;
    var c_id = options.c_id;
    var campus_id = options.campus_id;
    this.setData({
      sid,
      _id,
      c_id,
      campus_id,
    });

    if (_id != null) {
      db.collection('site')
        .doc(_id)
        .get()
        .then(res => {
          let now_site = res.data;
          this.setData({
            name: now_site.name,
            aliases: now_site.aliases,
            desc: now_site.desc,
            c_id: now_site.c_id,
            campus_id: now_site.campus_id,
            la: now_site.latitude,
            lo: now_site.longitude,
            img: now_site.img,
          });
        })
        .catch(err => {
          console.log('fail', err);
        });
    }

    db.collection('category')
      .get()
      .then(res => {
        let category_list = res.data;
        let category_name_list = category_list.map(item => item.name);
        let targetIndex = category_list.findIndex(item => _id != null && c_id === item._id);

        if (targetIndex !== -1) {
          this.setData({
            choose: targetIndex,
          });
        } else {
          this.setData({
            choose: 0,
            c_id: category_list[0]._id,
          });
        }

        this.setData({
          category_list,
          category_name_list,
        });
      })
      .catch(err => {
        console.log('fail', err);
      });
    db.collection('campus')
      .get()
      .then(res => {
        let campus_list = res.data;
        let campus_name_list = campus_list.map(item => item.name);
        let targetIndex = campus_list.findIndex(item => _id != null && campus_id === item._id);

        if (targetIndex !== -1) {
          this.setData({
            choose_campus: targetIndex,
          });
        } else {
          this.setData({
            choose_campus: 0,
            campus_id: campus_list[0]._id,
          });
        }

        this.setData({
          campus_list,
          campus_name_list,
        });
      })
      .catch(err => {
        console.log('fail', err);
      });
    this.get();
  },

  get() {
    db.collection('media')
      .get()
      .then(res => {
        let data = res.data || [];
        let length = data.length;

        if (length) {
          this.setData({
            defaultImg: data[0].defaultImg,
          });
        }
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  addsite() {
    var that = this;
    // 如果不上传图片就上传默认图片
    if (this.data.img == null || this.data.img == '') {
      this.setData({
        img: that.data.defaultImg,
      });
    }

    if (
      this.data.name != null &&
      this.data.name != '' &&
      this.data.la != null &&
      this.data.la != '' &&
      this.data.lo != null &&
      this.data.lo != ''
    ) {
      wx.cloud
        .callFunction({
          name: 'add_site',
          data: {
            name: this.data.name,
            aliases: this.data.aliases,
            desc: this.data.desc,
            c_id: this.data.c_id,
            campus_id: this.data.campus_id,
            la: Number(this.data.la),
            lo: Number(this.data.lo),
            img: this.data.img,
          },
        })
        .then(res => {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000,
          });
          setTimeout(() => {
            this.back();
          }, 1500);
        })
        .catch(err => {
          console.log('fail', err);
        });
    } else {
      wx.showToast({
        title: '地点名称和经纬度必填，请补充',
        icon: 'none',
        duration: 2000,
      });
    }
  },

  updatesite() {
    var that = this;
    // 如果不上传图片就上传默认图片
    if (this.data.img == null || this.data.img == '') {
      this.setData({
        img: that.data.defaultImg,
      });
    }

    if (
      this.data.name != null &&
      this.data.name != '' &&
      this.data.la != null &&
      this.data.la != '' &&
      this.data.lo != null &&
      this.data.lo != ''
    ) {
      wx.cloud
        .callFunction({
          name: 'update_site',
          data: {
            _id: this.data._id,
            name: this.data.name,
            aliases: this.data.aliases,
            desc: this.data.desc,
            c_id: this.data.c_id,
            campus_id: this.data.campus_id,
            la: Number(this.data.la),
            lo: Number(this.data.lo),
            img: this.data.img,
          },
        })
        .then(res => {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000,
          });
          setTimeout(() => {
            this.back();
          }, 1500);
        })
        .catch(err => {
          console.log('fail', err);
        });
    } else {
      wx.showToast({
        title: '地点名称和经纬度必填，请补充',
        icon: 'none',
        duration: 2000,
      });
    }
  },

  removesite() {
    var _id = this.data._id;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '删除操作不可逆\n请谨慎操作！',
      success(res) {
        if (res.confirm) {
          db.collection('campus')
            .get()
            .then(res => {
              var site_list = res.data.map(item => item.site_id);
              // 检查当前值是否在site_list中
              if (!site_list.includes(_id)) {
                wx.cloud
                  .callFunction({
                    name: 'remove_site',
                    data: {
                      id: _id,
                    },
                  })
                  .then(res => {
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 2000,
                    });
                    setTimeout(() => {
                      that.back();
                    }, 1000);
                  })
                  .catch(err => {
                    console.log('fail', err);
                  });
              } else {
                wx.showToast({
                  title: '该地点为默认地点，无法删除！\n若想删除，请修改默认地点',
                  icon: 'none',
                  duration: 4000,
                });
              }
            })
            .catch(err => {
              console.log('fail', err);
            });
        }
      },
    });
  },

  getName(e) {
    this.setData({
      name: e.detail.value,
    });
  },

  getAliases(e) {
    this.setData({
      aliases: e.detail.value,
    });
  },

  getDesc(e) {
    this.setData({
      desc: e.detail.value,
    });
  },

  bindchange(e) {
    var choose = e.detail.value;
    var c_id = this.data.category_list[e.detail.value]._id;
    this.setData({
      choose,
      c_id,
    });
  },

  bindchange_campus(e) {
    var choose_campus = e.detail.value;
    var campus_id = this.data.campus_list[e.detail.value]._id;
    this.setData({
      choose_campus,
      campus_id,
    });
  },

  getPoint() {
    let campus_la = null;
    let campus_lo = null;
    let bounds = null;
    let img = null;
    let range = null;
    let isUseMapImg = null;
    this.data.campus_list.map(item => {
      if (item._id == this.data.campus_id) {
        campus_la = item.latitude;
        campus_lo = item.longitude;
        bounds = item.bounds;
        img = item.img;
        range = item.range;
        isUseMapImg = item.isUseMapImg;
      }
    });
    bounds = JSON.stringify(bounds);
    isUseMapImg = String(isUseMapImg);
    range = JSON.stringify(range);

    wx.navigateTo({
      url:
        './choose-point/choose-point?lo=' +
        this.data.lo +
        '&la=' +
        this.data.la +
        '&campus_la=' +
        campus_la +
        '&campus_lo=' +
        campus_lo +
        '&bounds=' +
        bounds +
        '&img=' +
        img +
        '&isUseMapImg=' +
        isUseMapImg +
        '&range=' +
        range,
    });
  },

  getImg() {
    var that = this;
    wx.chooseMedia({
      count: 1,
      success(res) {
        var po = res.tempFiles[0].tempFilePath.lastIndexOf('.');
        var ext = res.tempFiles[0].tempFilePath.slice(po);
        wx.cloud.uploadFile({
          cloudPath: that.data.name + ext,
          filePath: res.tempFiles[0].tempFilePath,
          success(res) {
            that.setData({
              img: res.fileID,
            });
          },
        });
      },
    });
  },

  back() {
    app.globalData.mapRefresh = true; // 标记 tab地图页 需刷新
    app.globalData.siteRefresh = true; // 标记 tab地点页 需刷新
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一个页面
    // 调用上一个页面对象的方法，重新获取数据
    prevPage.get();
    wx.navigateBack();
  },
});

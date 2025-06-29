// pages/manage/admin-list/admin/admin.js
const db = wx.cloud.database();
const _ = db.command;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sid: 1,

    _id: null,
    name: null,
    openid: null,
    admin_list: [],
    a_id: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      sid: options.sid,
      _id: options._id,
      name: options.name,
      openid: options.openid,
    });
    db.collection('admin')
      .get()
      .then(res => {
        let admin_list = res.data;
        this.setData({
          admin_list,
          a_id: admin_list[admin_list.length - 1].a_id + 1,
        });
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  getName(e) {
    this.setData({
      name: e.detail.value,
    });
  },

  getOpenid(e) {
    this.setData({
      openid: e.detail.value,
    });
  },

  addAdmin() {
    if (
      this.data.name != null &&
      this.data.name != '' &&
      this.data.openid != null &&
      this.data.openid != ''
    ) {
      wx.cloud
        .callFunction({
          name: 'add_admin',
          data: {
            name: this.data.name,
            openid: this.data.openid,
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
        title: '请输入名字和openid！',
        icon: 'none',
        duration: 2000,
      });
    }
  },

  updateAdmin() {
    if (
      this.data.name != null &&
      this.data.name != '' &&
      this.data.openid != null &&
      this.data.openid != ''
    ) {
      wx.cloud
        .callFunction({
          name: 'update_admin',
          data: {
            _id: this.data._id,
            name: this.data.name,
            openid: this.data.openid,
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
          }, 1000);
        })
        .catch(err => {
          console.log('fail', err);
        });
    } else {
      wx.showToast({
        title: '请输入名字和openid！',
        icon: 'none',
        duration: 2000,
      });
    }
  },

  removeAdmin() {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '删除操作不可逆\n请谨慎操作！',
      success(res) {
        if (res.confirm) {
          wx.cloud
            .callFunction({
              name: 'remove_admin',
              data: {
                _id: _this.data._id,
              },
            })
            .then(res => {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000,
              });
              setTimeout(() => {
                this.back();
              }, 1000);
            })
            .catch(err => {
              console.log('fail', err);
            });
        }
      },
    });
  },

  back() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一个页面
    // 调用上一个页面对象的方法，重新获取数据
    prevPage.getAdmin();
    wx.navigateBack();
  },
});

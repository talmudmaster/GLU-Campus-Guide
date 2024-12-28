// pages/admin/manage-admin/manage-admin.js
let db = wx.cloud.database()
let _ = db.command
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
    console.log(options)
    this.setData({
      sid: options.sid,
      _id: options._id,
      name: options.name,
      openid: options.openid,
    })
    db.collection('admin')
      .get()
      .then(res => {
        console.log('success', res)
        this.setData({
          admin_list: res.data
        })
        let admin_list = this.data.admin_list
        this.setData({
          a_id: admin_list[admin_list.length - 1].a_id + 1
        })
      })
      .catch(err => {
        console.log('fail', err)
      })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },

  getOpenid(e) {
    this.setData({
      openid: e.detail.value
    })
  },

  addAdmin() {
    if (this.data.name != null && this.data.name != "" && this.data.openid != null && this.data.openid != "") {
      wx.cloud.callFunction({
          name: 'add_admin',
          data: {
            name: this.data.name,
            openid: this.data.openid
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
        title: '请输入名字和openid！',
        icon: 'none',
        duration: 2000
      })
    }
  },

  updateAdmin() {
    console.log(this.data.name)
    console.log(this.data._id)
    if (this.data.name != null && this.data.name != "" && this.data.openid != null && this.data.openid != "") {
      wx.cloud.callFunction({
          name: 'update_admin',
          data: {
            _id: this.data._id,
            name: this.data.name,
            openid: this.data.openid
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
          }, 1000)
        })
        .catch(err => {
          console.log('fail', err)
        })
    } else {
      wx.showToast({
        title: '请输入名字和openid！',
        icon: 'none',
        duration: 2000
      })
    }
  },

  removeAdmin() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '删除操作不可逆\n请谨慎操作！',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
              name: 'remove_admin',
              data: {
                _id: that.data._id,
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
  }
})
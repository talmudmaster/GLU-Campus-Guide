// pages/admin/adminmanage/adminmanage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAdmin()
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
    this.getAdmin()
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

  getAdmin() {
    wx.cloud.database().collection('admin')
      .get()
      .then(res => {
        console.log('success', res)
        this.setData({
          admin_list: res.data
        })
        wx.stopPullDownRefresh()
      })
      .catch(err => {
        console.log('fail', err)
      })
  },

  addAdmin() {
    wx.navigateTo({
      url: '../../admin/manage-admin/manage-admin?sid=1',
    })
  },

  manageAdmin(e) {
    console.log(e.target.dataset._id)
    console.log(e.target.dataset.name)
    wx.navigateTo({
      url: '../../admin/manage-admin/manage-admin?sid=2&_id=' + e.target.dataset._id + '&name=' + e.target.dataset.name + '&openid=' + e.target.dataset.openid,
    })
  },
})
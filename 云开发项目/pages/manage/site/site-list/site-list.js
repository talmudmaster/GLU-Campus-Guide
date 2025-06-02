// pages/manage/site-list/site-list.js
const app = getApp()

const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollLeft: 0,

    category_list: [],
    site_data: [],
    result_list: [],
    category: 0,
    key: null,

    la: "",
    lo: "",

    choose: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.get()
  },

  /**
   * 获取数据的方法
   * 执行获取列表数据和分类数据的操作
   */
  get() {
    this.lianbiaoquery()
    this.getCategory()
  },
  get() {
    this.lianbiaoquery()
    this.getCategory()
  },

  lianbiaoquery() {
    wx.cloud.callFunction({
        name: 'lianbiao_query',
      })
      .then(res => {
        console.log(res.result.list)
        let site_data = res.result.list
        // .filter(category => category.list.length > 0);

        this.setData({
          site_data: site_data,
          all_site_data: res.result.list
        })
        this.changeCategory(this.data.choose)
      })
      .catch(err => {
        console.log('fail', err)
      })
  },

  getCategory() {
    db.collection('category')
      .get()
      .then(res => {
        console.log('success', res)
        this.setData({
          category_list: res.data
        })
      })
      .catch(err => {
        console.log('fail', err)
      })
  },

  getKey(e) {
    this.setData({
      key: e.detail.value
    })
  },

  goSearch() {
    console.log(this.data.key)
    let key = this.data.key
    if (this.data.key) {
      db.collection('site')
        .where(_.or([{
            name: db.RegExp({
              regexp: key, // 搜索的值
              options: 'i', // 不区分大小写
            })
          },
          {
            aliases: db.RegExp({
              regexp: key, // 搜索的值
              options: 'i', // 不区分大小写
            })
          }
        ]))
        .get()
        .then(res => {
          console.log('success', res)
          this.setData({
            result_list: res.data,
            category: 0
          })
        })
        .catch(err => {
          console.log('fail', err)
        })
    } else {
      wx.showToast({
        icon: 'error',
        title: '请输入内容',
      })
    }
  },

  changeCategory(e) {
    console.log('e', e);
    let choose = null
    let category = null
    // console.log('typeof', typeof e === 'number');
    if (typeof e === 'object') {
      choose = e.currentTarget.id
      category = e.currentTarget.id
    } else {
      choose = this.data.choose
      category = this.data.choose
    }
    let scrollLeft = (category - 1) * 60
    let result_list = this.data.site_data[choose].list
    this.setData({
      scrollLeft: scrollLeft,
      category: category,
      result_list: result_list
    })
  },

  addsite() {
    wx.navigateTo({
      url: './site/site?sid=1',
    })
  },

  managesite(e) {
    console.log(e.target.dataset)
    wx.navigateTo({
      url: './site/site?sid=2&_id=' + e.target.dataset._id + '&c_id=' + e.target.dataset.c_id
    })
  },
})
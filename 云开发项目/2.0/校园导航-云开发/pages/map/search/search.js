// pages/search/search.js
let db = wx.cloud.database();
let _ = db.command;
var map = require("../../../utils/map");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: null,
    search_id: 0,
    site_data: map.site_data,
    // result: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id);
    this.setData({
      search_id: options.id,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  // 获取输入框的内容
  getContent(e) {
    this.setData({
      content: e.detail.value,
    });
  },

  // 搜索
  goSearch() {
    console.log(this.data.content);
    var content = this.data.content;
    var site_data = this.data.site_data;
    var result = [];
    if (content) {
      // for (let i = 0; i < site_data.length; i++) {
      //     for (let j = 0; j < site_data[i].list.length; j++) {
      //         var data = site_data[i].list[j]
      //         if (data.name.match(content) || data.aliases.match(content)) {
      //             result.push(data)
      //         }
      //     }
      // }
      // this.setData({
      //     result: result
      // })
      // if (result.length == 0) {
      //     wx.showToast({
      //         icon: 'none',
      //         title: '未找到结果',
      //     })
      // }

      db.collection("site")
        .where(
          _.or([
            {
              name: db.RegExp({
                regexp: content, // 搜索的值
                options: "i", // 不区分大小写
              }),
            },
            {
              aliases: db.RegExp({
                regexp: content, // 搜索的值
                options: "i", // 不区分大小写
              }),
            },
          ])
        )
        .get()
        .then((res) => {
          console.log("success", res);
          this.setData({
            result: res.data,
          });
          if (this.data.result && this.data.result.length == 0) {
            wx.showToast({
              icon: "none",
              title: "未找到结果",
            });
          }
        })
        .catch((err) => {
          console.log("fail", err);
        });
    } else {
      wx.showToast({
        icon: "error",
        title: "请输入内容",
      });
    }
  },

  // 返回地图页并通过缓存传递参数
  tapback(e) {
    console.log(e);
    var data = e.currentTarget.dataset;
    let search_id = this.data.search_id;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一个页面
    if (search_id == 1) {
      // 直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        start: data,
      });
    } else {
      prevPage.setData({
        end: data,
      });
    }
    var id = e.currentTarget.id;
    var _id = this.data.result[id]._id;
    // 浏览次数加1
    wx.cloud.callFunction({
      name: "browse",
      data: {
        _id: _id,
      },
      success(res) {
        console.log("浏览量+1");
      },
      fail(err) {
        console.log(err);
      },
    });
    wx.navigateBack({});
  },
});

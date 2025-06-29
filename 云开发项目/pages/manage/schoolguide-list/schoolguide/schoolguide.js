// pages/manage/guide-list/guide/guide.js
const app = getApp();

const db = wx.cloud.database();
const _ = db.command;

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

    title: null,
    keyword: null,
    keywords: [],
    content: null,
    imageList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _id = options._id;
    this.setData({
      _id: options._id,
      sid: options.sid,
    });
    if (_id) {
      db.collection('schoolguide')
        .doc(_id)
        .get()
        .then(res => {
          let keywords = res.data.keywords.map((item, index) => {
            return {
              id: index,
              name: item,
              animation: null,
            };
          });
          this.setData({
            title: res.data.title,
            keywords,
            content: res.data.content,
            imageList: res.data.imageList,
          });
          this.onEditorReady();
        })
        .catch(err => {
          console.log('fail', err);
        });
    }
  },

  getTitle(e) {
    this.setData({
      title: e.detail.value,
    });
  },

  getKeyword(e) {
    this.setData({
      keyword: e.detail.value,
    });
  },

  // 添加新标签（带动画）
  addKeyword() {
    let keyword = this.data.keyword;
    let keywords = this.data.keywords;
    let length = keywords.length;

    // 验证输入内容
    if (!keyword) {
      wx.showToast({
        title: '请输入标签内容',
        icon: 'none',
        duration: 1500,
      });
      return;
    }
    if (keyword.length > 10) {
      wx.showToast({
        title: '请不要输入过长的内容',
        icon: 'none',
        duration: 1500,
      });
      return;
    }

    // 生成新标签
    const newItem = {
      id: length,
      name: keyword,
      animation: null,
    };

    // 添加并清空输入框
    this.setData({
      keywords: [...this.data.keywords, newItem],
      keyword: null,
    });

    keywords.push({
      id: length,
      name: keyword,
      animation: null,
    });
  },

  // 关闭标签（带动画）
  handleClose(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    const index = this.data.keywords.findIndex(item => item.id === id);

    // 创建动画
    const animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    });
    animation.opacity(0).scale(0.8).step();

    // 先执行动画
    this.setData({
      [`keywords[${index}].animation`]: animation.export(),
    });

    // 动画完成后移除元素
    setTimeout(() => {
      const keywords = this.data.keywords.filter(item => item.id !== id);
      this.setData({
        keywords,
      });
    }, 400);
  },

  onEditorReady() {
    const _this = this;
    let content = _this.data.content;
    wx.createSelectorQuery()
      .select('#editor')
      .context((rect) => {
        _this.editorCtx = res.context;
        _this.editorCtx.setContents({
          html: content,
        });
      })
      .exec();
  },

  onInput(e) {
    this.setData({
      content: e.detail.html,
    });
  },

  getImg() {
    var list = this.data.imageList;
    var _this = this;
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
              _this.setData({
                imageList: list,
              });
            },
          });
        }
      },
    });
  },

  addschoolguide() {
    if (
      this.data.title != null &&
      this.data.title != '' &&
      this.data.content != null &&
      this.data.content != ''
    ) {
      let keywords = this.data.keywords.map(item => {
        return item.name;
      });
      wx.cloud
        .callFunction({
          name: 'add_schoolguide',
          data: {
            title: this.data.title,
            keywords,
            content: this.data.content,
            imageList: this.data.imageList,
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
        title: '请输入名称和内容！',
        icon: 'none',
        duration: 2000,
      });
    }
  },

  updateschoolguide() {
    if (
      this.data.title != null &&
      this.data.title != '' &&
      this.data.content != null &&
      this.data.content != ''
    ) {
      let keywords = this.data.keywords.map(item => {
        return item.name;
      });
      wx.cloud
        .callFunction({
          name: 'update_schoolguide',
          data: {
            _id: this.data._id,
            title: this.data.title,
            keywords,
            content: this.data.content,
            imageList: this.data.imageList,
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
        title: '请输入名称和内容！',
        icon: 'none',
        duration: 2000,
      });
    }
  },

  removeschoolguide() {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '删除操作不可逆\n请谨慎操作！',
      success(res) {
        if (res.confirm) {
          wx.cloud
            .callFunction({
              name: 'remove_schoolguide',
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
                _this.back();
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
    app.globalData.schoolguideRefresh = true; // 标记 school校园指南页 需刷新
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一个页面
    // 调用上一个页面对象的方法，重新获取数据
    prevPage.get();
    wx.navigateBack();
  },
});

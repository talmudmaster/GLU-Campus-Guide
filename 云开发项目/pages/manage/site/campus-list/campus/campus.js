// pages/manage/campus-list/campus/campus.js
const app = getApp();

const db = wx.cloud.database();
const _ = db.command;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    sid: 1,
    name: null,
    campus_list: [],
    _id: null,
    campus: 1,
    showname: null,

    site_list: [1, 2],
    site_name_list: [],
    choose_site: 0,
    site_id: null,
    campus_id: null,
    latitude: null,
    longitude: null,
    isUseMapImg: false,
    bounds: {
      north: null, // 北（上）
      south: null, // 南（下）
      west: null, // 西（左）
      east: null, // 东（右）
    },
    img: null,

    range: [],

    // 多列数据容器
    categoryColumns: [[], []],
    // 当前选中索引
    selectedIndex: [0, 0],
    // 当前显示名称
    selectedNames: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _id = options._id;
    this.setData({
      sid: options.sid,
      _id: options._id,
      campus: options.id,
      campus_id: options.id,
      showname: options.name,
      name: options.name,
      img: options.img,
    });
    if (_id) {
      db.collection('campus')
        .doc(_id)
        .get()
        .then(res => {
          let site_id = res.data.site_id;
          this.setData({
            name: res.data.name,
            site_id: res.data.site_id,
            longitude: res.data.longitude,
            latitude: res.data.latitude,
            range: res.data.range,
            img: res.data.img,
            isUseMapImg: res.data.isUseMapImg,
            bounds: res.data.bounds,
          });
          this.lianbiaoquery();
        })
        .catch(err => {
          console.log('fail', err);
        });
    }
  },

  getSite(site_id) {
    db.collection('site')
      .doc(site_id)
      .get()
      .then(res => {
        let name = res.data.name;
        let c_id = res.data.c_id;
        this.getCategory(name, c_id);
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  getCategory(name, c_id) {
    db.collection('category')
      .doc(c_id)
      .get()
      .then(res => {
        let c_name = res.data.name;
        let selectedNames = [c_name, name];
        this.setData({
          selectedNames,
        });
      })
      .catch(err => {
        console.log('fail', err);
      });
  },

  lianbiaoquery() {
    wx.cloud
      .callFunction({
        name: 'lianbiao_query',
      })
      .then(res => {
        let site_data = res.result.list;
        let site_list = site_data
          .map(category => ({
            ...category,
            list: category.list.filter(item => item.campus_id === this.data._id),
          }))
          .filter(category => category.list.length > 0);

        this.setData({
          site_data,
          site_list,
        });

        this.processCategoryData();
        if (!this.data.site_id) {
          this.setData({
            site_id: site_list[0].list[0]._id,
          });
        } else {
          this.getSite(this.data.site_id);
        }
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

  getLongitude(e) {
    this.setData({
      longitude: e.detail.value,
    });
  },

  getLatitude(e) {
    this.setData({
      latitude: e.detail.value,
    });
  },

  addcampus() {
    if (this.data.name != null && this.data.name != '') {
      wx.cloud
        .callFunction({
          name: 'add_campus',
          data: {
            name: this.data.name,
            site_id: this.data.site_id,
            longitude: this.data.longitude,
            latitude: this.data.latitude,
            range: this.data.range,
            img: this.data.img,
            isUseMapImg: this.data.isUseMapImg,
            bounds: this.data.bounds,
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
    } else if (this.data.name == null || this.data.name == '') {
      wx.showToast({
        title: '请输入校区名称！',
        icon: 'none',
        duration: 2000,
      });
    }
  },

  updatecampus() {
    if (this.data.name != null && this.data.name != '') {
      wx.cloud
        .callFunction({
          name: 'update_campus',
          data: {
            _id: this.data._id,
            name: this.data.name,
            site_id: this.data.site_id,
            longitude: this.data.longitude,
            latitude: this.data.latitude,
            range: this.data.range,
            img: this.data.img,
            isUseMapImg: this.data.isUseMapImg,
            bounds: this.data.bounds,
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
    } else if (this.data.name == null || this.data.name == '') {
      wx.showToast({
        title: '请输入校区名称！',
        icon: 'none',
        duration: 2000,
      });
    }
  },

  removecampus() {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '删除操作不可逆\n请谨慎操作！',
      success(res) {
        if (res.confirm) {
          // 是否有关联数据
          wx.cloud
            .callFunction({
              name: 'lianbiao_query',
            })
            .then(res => {
              let list = res.result.list;
              let campus_id = _this.data._id;
              let site_data = list
                .map(category => ({
                  ...category,
                  list: category.list.filter(item => item.campus_id === campus_id),
                }))
                .filter(category => category.list.length > 0);

              if (site_data.length == 0) {
                wx.cloud
                  .callFunction({
                    name: 'remove_campus',
                    data: {
                      _id: campus_id,
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
              } else {
                wx.showToast({
                  title: '该校区下存在地点，无法删除！\n请确保该校区下没有地点',
                  icon: 'none',
                  duration: 3000,
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

  getRange() {
    let lo = this.data.longitude;
    let la = this.data.latitude;
    if (lo && la) {
      let range = JSON.stringify(this.data.range);
      wx.navigateTo({
        url: './choose-range/choose-range?lo=' + lo + '&la=' + la + '&range=' + range,
      });
    } else {
      wx.showToast({
        title: '请填写经纬度',
        icon: 'error',
      });
    }
  },

  switchChange(e) {
    this.setData({
      isUseMapImg: e.detail.value,
    });
  },

  getBounds(e) {
    let direction = e.target.dataset.type;
    let value = e.detail.value;

    if (['north', 'south', 'west', 'east'].includes(direction)) {
      this.setData({
        [`bounds.${direction}`]: value,
      });
    }
  },

  getImg() {
    var _this = this;
    wx.chooseMedia({
      count: 1,
      success(res) {
        var po = res.tempFiles[0].tempFilePath.lastIndexOf('.');
        var ext = res.tempFiles[0].tempFilePath.slice(po);
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + ext,
          filePath: res.tempFiles[0].tempFilePath,
          success(res) {
            _this.getImagePath(res.fileID);
          },
        });
      },
    });
  },

  // 获取图片上传后的https的url路径地址  参数是上传图片的 fileId
  getImagePath(fileId) {
    var _this = this;
    wx.cloud.getTempFileURL({
      fileList: [fileId],
      success(res) {
        let img = res.fileList[0].tempFileURL;
        _this.setData({
          img: img,
        });
      },
    });
  },

  // 处理原始数据结构
  processCategoryData() {
    const mainCategories = this.data.site_list.map(item => item.name);
    const subCategories = this.data.site_list.map(item => item.list.map(sub => sub.name));

    this.setData({
      categoryColumns: [mainCategories, subCategories[0]],
      selectedNames: [mainCategories[0], subCategories[0][0]],
    });
  },

  // 列变化监听
  onColumnChange(e) {
    const { column, value } = e.detail;
    const newIndex = [...this.data.selectedIndex];

    newIndex[column] = value;

    // 联动更新第二列
    if (column === 0) {
      const subList = this.data.site_list[value].list;
      this.setData({
        ['categoryColumns[1]']: subList.map(item => item.name),
        selectedNames: [this.data.categoryColumns[0][value], subList[0].name],
      });
      newIndex[1] = 0;
    }

    this.setData({
      selectedIndex: newIndex,
    });
  },

  // 最终选择
  onCategoryChange(e) {
    const [mainIdx, subIdx] = e.detail.value;
    const selectedMain = this.data.site_list[mainIdx];
    const selectedSub = selectedMain.list[subIdx];

    this.setData({
      site_id: selectedSub._id,
    });
  },

  back() {
    app.globalData.mapRefresh = true; // 标记 tab地图页 需刷新
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一个页面
    // 调用上一个页面对象的方法，重新获取数据
    prevPage.get();
    wx.navigateBack();
  },
});

// pages/site/site.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // id: 1,
    // name: "",
    // aliases: "",
    // desc: "",
    // img: "",
    formData: {
      la: "",
      lo: "",
    },

    result: "",

    rules: [{
      name: 'id',
      rules: {
        required: true,
        message: '请输入id',
      }
    }, {
      name: 'name',
      rules: {
        required: true,
        message: '请输入地点名称'
      },
    }, {
      name: 'location',
      rules: {
        required: true,
        message: '地点必须要选择',
      },
    }],

    // 显示/隐藏 对话框
    dialogShow: false,
    // 对话框按钮组
    buttons: [{
      text: '关闭'
    }, {
      text: '复制'
    }],
  },

  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        wx.showToast({
          title: '校验通过'
        })
        console.log("校验通过")
        this.generate()
      }
    })
    // this.selectComponent('#form').validateField('mobile', (valid, errors) => {
    //     console.log('valid', valid, errors)
    // })
  },


  getPoint() {
    wx.navigateTo({
      url: './getpoint/getpoint?lo=' + this.data.formData.lo + '&la=' + this.data.formData.la,
    })
  },

  generate() {
    var id = this.data.formData.id
    var name = this.data.formData.name
    var aliases = this.data.formData.aliases || ""
    var desc = this.data.formData.desc || ""
    var latitude = this.data.formData.la || ""
    var longitude = this.data.formData.lo
    var img = this.data.formData.img || ""

    var result = "{" + '\n' + "  id: " + id + "," + '\n' + "  name: \"" + name + "\"," + '\n' + "  aliases: \"" + aliases + "\"," + '\n' + "  img: \"" + img + "\"," + '\n' + "  desc: \"" + desc + "\"," + '\n' + "  latitude: " + latitude + "," + '\n' + "  longitude: " + longitude + "," + '\n' + "},"
    this.setData({
      result: result,
      dialogShow: true
    })
  },

  copy() {
    var result = this.data.result
    wx.setClipboardData({
      data: result,
    })
  },

  // 对话框按钮
  dialogButton(e) {
    this.setData({
      dialogShow: false,
    })
    let choose = e.detail.item.text
    if (choose == "复制") {
      this.copy()
    }
  },

})
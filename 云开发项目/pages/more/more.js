// pages/more/more.js
import data from '@data/data';
import media from '@data/media';

Page({
  data: {
    miniprogram_name: data.miniprogram_name,

    avatarUrl: media.avatarUrl,

    green_arrow: media.green_arrow,

    statement: media.statement,
    note: media.note,

    users: media.users,
    contact: media.contact,

    chat: media.chat,
    feedback: media.feedback,

    share: media.share,
    miniprogramming_ma: media.miniprogramming_ma,

    admin: media.admin,
  },

  // 软件声明
  tostatement() {
    wx.navigateTo({
      url: './statement/statement',
    });
  },
  // 特别说明
  aboutus() {
    wx.showModal({
      title: '特别说明',
      content:
        '本项目同时应用于2023年中国大学生计算机设计大赛，未经允许，不得随意用于各类比赛项目\n\n作品名：云上高校导航\n作品编号：2023042719\n奖项：广西赛区 软件应用与开发 - 移动应用开发（非游戏类） 三等奖',
    });
  },
  // 联系作者
  contact() {
    wx.showModal({
      title: '联系作者',
      content: '如果遇到什么问题\n请点击确认与我联系',
      success: res => {
        if (res.confirm == true) {
          wx.previewImage({
            current: this.data.contact, // 当前显示图片的http链接
            urls: [this.data.contact], // 需要预览的图片http链接列表
          });
        }
      },
      fail(err) {
        console.log('fail', err);
      },
    });
  },

  // 分享
  share() {
    wx.showModal({
      title: '推荐给好友',
      content: '点击确认即可查看小程序码\n长按小程序码即可转发给好友',
      success: res => {
        if (res.confirm == true) {
          wx.previewImage({
            current: this.data.miniprogramming_ma, // 当前显示图片的http链接
            urls: [this.data.miniprogramming_ma], // 需要预览的图片http链接列表
          });
        }
      },
      fail(err) {
        console.log('fail', err);
      },
    });
  },

  // 管理界面
  toadmin() {
    var _this = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        if (res.result.data.length != 0) {
          var name = res.result.data[0].name;
          wx.showToast({
            title: '欢迎回来\n管理员：' + name,
            icon: 'none',
            duration: 1000,
          });
          setTimeout(() => {
            wx.navigateTo({
              url: '../manage/manage',
            });
          }, 1000);
        } else {
          _this.getopenid();
        }
      },
    });
  },

  // 获取openid
  getopenid() {
    wx.cloud.callFunction({
      name: 'get_openid',
      complete: res => {
        let openid = res.result.openid;
        wx.showModal({
          title: '抱歉，您还不是管理员\n可联系管理员并告知自己的openid，等待被添加为管理员',
          content: openid,
          confirmText: '点击复制',
          complete: res => {
            if (res.confirm) {
              wx.setClipboardData({
                data: openid,
              });
            }
          },
        });
      },
    });
  },
});

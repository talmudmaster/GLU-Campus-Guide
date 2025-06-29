// pages/home/pano/pano.js
import media from '@data/media';

const wxPano = requirePlugin('wxPano');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    more: media.more,
    judge: media.judge,
    text: media.text,
    show: true,
    name: 'sport_tianjing',
    panolist: [
      {
        name: 'sport_zhishan',
        src: 'https://s2.loli.net/2024/04/22/EpTcHMbmCiNGosP.jpg',
        infospots: [
          // 信息标记
          {
            type: 'modal',
            modal: {
              title: '至善广场',
              content: '这里有宽宽的大阶梯，是拍集体照的好地方',
            },
            position: {
              x: 0.092,
              y: 0.434,
            },
            size: 1,
          },
        ],
      },
      {
        name: 'sport_tianjing',
        src: 'https://s2.loli.net/2024/04/22/7wIgFSJb1tQYEv6.jpg',
        infospots: [
          {
            type: 'modal',
            modal: {
              title: '田径场',
              content: '学生运动的好去处',
            },
            position: {
              x: 0.092,
              y: 0.434,
            },
            size: 1,
          },
        ],
      },
    ],
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wxPano.onReady = () => {
      // wxPano初始化完成后会触发此事件
    };
    wxPano.config({
      panolist: this.data.panolist,
      request: wx.request,
      loader: 'GLLoader',
      entryname: 'sport_zhishan',
    });
  },

  covertap() {
    var panoId = wxPano.getPanoInfo().panoId;
    var panolist = this.data.panolist;
    var name = panolist[(panoId + 1) % panolist.length].name;

    wxPano.navigateMethod({
      type: 'pano',
      entryname: name,
    });
  },
  setCameraLookAt() {
    wxPano.setCameraLookAt({
      x: 0.5,
      y: 0.5,
    });
  },

  getPanoInfo() {
    var panoId = wxPano.getPanoInfo().panoId;
    var modal = this.data.panolist[panoId].infospots[0].modal;

    wx.showModal({
      title: modal.title,
      content: modal.content,
    });
  },
});

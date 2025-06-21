// pages/more/statement/statement.js
import data from '@data/data';
import media from '@data/media';
import school from '@data/school';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    school_name_full: school.school_information.school_name_full,

    miniprogram_name: data.miniprogram_name,
    information: data.information,

    message: media.message,
    statement: media.statement,
    zhixie: media.zhixie,

    zhixie_kaifazhe: media.zhixie_kaifazhe,
    zhixie_up: media.zhixie_up,
    zhixie_honghui: media.zhixie_honghui,

    notes: media.notes,
  },
});

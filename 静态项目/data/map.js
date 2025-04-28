/* data/map.js */
// 地图相关
module.exports = {
  // 地图部分参数

  // 腾讯位置服务API
  mapKey: "ZQWBZ-NQBLV-W7CPF-U7QIR-5HBNQ-AOFUE",

  // 学校精确坐标（用于地图定位和获取天气数据）
  longitude: 110.277685,
  latitude: 25.093668,

  // 是否展示 POI 点
  enablepoi: true,
  // 是否显示带有方向的当前定位点
  showLocation: true,
  // 缩放级别
  scale: 16.1,
  // 最小缩放级别，比缩放级别小0.3-0.4为宜
  minscale: 15.8,

  // 自定义图层
  groundoverlay: {
    // 图层透明度 0-1，对应 0%-100%
    opacity: 0.8,
    // 西南角
    southwest_latitude: 25.088910,
    southwest_longitude: 110.273850,
    // 东北角
    northeast_latitude: 25.098995,
    northeast_longitude: 110.281229
  },

  // 地图边界
  boundary: {
    // 西南角
    southwest_latitude: 25.088083,
    southwest_longitude: 110.272618,
    // 东北角
    northeast_latitude: 25.099580,
    northeast_longitude: 110.281911
  },

  // 学校边界
  // school_boundary: {
  //   // 东（学校最东端点的 经度）
  //   east: 110.280699,
  //   // 西（学校最西端点的 经度）
  //   west: 110.2733,
  //   // 南（学校最南端点的 纬度）
  //   south: 25.089701,
  //   // 北（学校最北端点的 纬度）
  //   north: 25.09839,
  // },

  // 闭合多边形
  points: [
    {
      "latitude": 25.098567,
      "longitude": 110.280995
    },
    {
      "latitude": 25.097711,
      "longitude": 110.281167
    },
    {
      "latitude": 25.096842,
      "longitude": 110.281137
    },
    {
      "latitude": 25.095527,
      "longitude": 110.280778
    },
    {
      "latitude": 25.092988,
      "longitude": 110.279991
    },
    {
      "latitude": 25.090947,
      "longitude": 110.279089
    },
    {
      "latitude": 25.088824,
      "longitude": 110.277994
    },
    {
      "latitude": 25.088921,
      "longitude": 110.277342
    },
    {
      "latitude": 25.088633,
      "longitude": 110.277057
    },
    {
      "latitude": 25.089162,
      "longitude": 110.275070
    },
    {
      "latitude": 25.090355,
      "longitude": 110.272274
    },
    {
      "latitude": 25.094758,
      "longitude": 110.274553
    },
    {
      "latitude": 25.095421,
      "longitude": 110.275129
    },
    {
      "latitude": 25.096114,
      "longitude": 110.275212
    },
    {
      "latitude": 25.097485,
      "longitude": 110.277418
    },
    {
      "latitude": 25.098553,
      "longitude": 110.279565
    },
    {
      "latitude": 25.098779,
      "longitude": 110.280243
    }
  ],
  
  // 默认地点
  default_point: {
    name: "东门",
    aliases: "学校正大门",
    img: "https://cdnjson.com/images/2023/02/26/schoolgate_dongmen.jpg",
    desc: "学校正大门\n可以通行行人和车辆",
    latitude: 25.095321,
    longitude: 110.280392
  },

  // 地点数据（使用嵌套列表存储）
  site_data: [{
      id: 1,
      name: "楼宇",
      list: [{
          id: 1,
          name: "至善楼",
          aliases: "1、2、3区 公共教学楼",
          img: "https://cdnjson.com/images/2023/02/26/building_zhishan.jpg",
          desc: "全校最大的教学楼，含有多媒体教室、电脑机房等教室",
          latitude: 25.095394,
          longitude: 110.279427
        },
        {
          id: 2,
          name: "嘉善楼",
          aliases: "6区 教音 | 设计 | 传媒",
          img: "https://cdnjson.com/images/2023/02/26/building_jiashan.jpg",
          desc: "听说有很多工作室、播音室、练琴房、陶艺室，不过这里的机房巨卡",
          latitude: 25.096617,
          longitude: 110.277466
        },
        {
          id: 3,
          name: "彰善楼",
          aliases: "4区 | 体育 活动中心",
          img: "https://cdnjson.com/images/2023/02/26/building_zhangshan.jpg",
          desc: "4区\n学生运动的好去处",
          latitude: 25.097451,
          longitude: 110.278425
        },
        {
          id: 4,
          name: "知善楼",
          aliases: "8区 行政楼",
          img: "https://cdnjson.com/images/2023/02/26/building_zhishanlou.jpg",
          desc: "学校众多机构所在地",
          latitude: 25.096446,
          longitude: 110.280709
        },
        {
          id: 5,
          name: "乐善楼",
          aliases: "后勤部",
          img: "https://cdnjson.com/images/2023/02/26/building_leshan.jpg",
          desc: "后勤部所在地",
          latitude: 25.093916,
          longitude: 110.278613
        }
      ]
    },
    {
      id: 2,
      name: "图书馆",
      list: [{
          id: 1,
          name: "图书馆A馆区",
          aliases: "一楼阅览室",
          img: "https://cdnjson.com/images/2023/02/26/library_A.jpg",
          desc: "距离宿舍最近的阅览室，不过电脑声音很吵就是了",
          latitude: 25.095037,
          longitude: 110.279283
        },
        {
          id: 2,
          name: "图书馆B馆区",
          aliases: "一楼藏书室",
          img: "https://cdnjson.com/images/2023/02/26/library_B.jpg",
          desc: "看书的好地方",
          latitude: 25.095637,
          longitude: 110.279283
        },
        {
          id: 3,
          name: "图书馆C馆区",
          aliases: "一二楼藏书三楼阅览室",
          img: "https://cdnjson.com/images/2023/02/26/library_C.jpg",
          desc: "一二三楼内部有楼梯连通",
          latitude: 25.09612,
          longitude: 110.279283
        }
      ]
    },
    {
      id: 3,
      name: "二级学院",
      list: [{
          id: 1,
          name: "人文学院",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/school_yuyan.jpg",
          desc: "至善楼2区西侧一楼",
          latitude: 25.094589,
          longitude: 110.279256
        },
        {
          id: 2,
          name: "金融与法律学院",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/school_shangfa.jpg",
          desc: "至善楼3区一、二楼",
          latitude: 25.096078,
          longitude: 110.279825
        },
        {
          id: 3,
          name: "管理工程学院",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/school_jingji.jpg",
          desc: "至善楼3区四、五楼",
          latitude: 25.096256,
          longitude: 110.279742
        },
        {
          id: 4,
          name: "教育学院",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/school_jiaoyin.jpg",
          desc: "嘉善楼东侧一楼",
          latitude: 25.096437,
          longitude: 110.27716
        },
        {
          id: 5,
          name: "理工学院",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/school_ligong.jpg",
          desc: "至善楼2区东侧一楼",
          latitude: 25.0944,
          longitude: 110.279763
        },
        {
          id: 6,
          name: "城市设计学院",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/school_sheji.jpg",
          desc: "嘉善楼西侧一楼",
          latitude: 25.096334,
          longitude: 110.276336
        },
        {
          id: 7,
          name: "体育与健康学院",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/school_tiyu.jpg",
          desc: "彰善楼东侧二楼",
          latitude: 25.097503,
          longitude: 110.278562
        },
        {
          id: 8,
          name: "传媒学院",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/school_chuanmei.jpg",
          desc: "嘉善楼最西侧一楼",
          latitude: 25.096205,
          longitude: 110.275699
        }
      ]
    },
    {
      id: 4,
      name: "校门",
      list: [{
          id: 1,
          name: "东门",
          aliases: "学校正大门",
          img: "https://cdnjson.com/images/2023/02/26/schoolgate_dongmen.jpg",
          desc: "学校正大门\n可以通行行人和车辆",
          latitude: 25.095321,
          longitude: 110.280392
        },
        {
          id: 2,
          name: "北门",
          aliases: "学校侧门",
          img: "https://cdnjson.com/images/2023/02/26/schoolgate_beimen.jpg",
          desc: "学校侧门（原大门）\n只能通行行人，不能通行车辆",
          latitude: 25.097448,
          longitude: 110.277449
        }
      ]
    },
    {
      id: 5,
      name: "会议厅",
      list: [{
          id: 1,
          name: "弘善讲堂",
          aliases: "大讲堂",
          img: "https://cdnjson.com/images/2023/02/26/meetingroom_hongshan.jpg",
          desc: "学校最大的会议厅",
          latitude: 25.096059,
          longitude: 110.276561
        },
        {
          id: 2,
          name: "至善讲堂",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/meetingroom_zhishan.jpg",
          desc: "至善楼中部西侧一楼\n小小会议厅，这里经常举办各种活动",
          latitude: 25.095393,
          longitude: 110.278823
        }
      ]
    },
    {
      id: 6,
      name: "体育场馆",
      list: [{
          id: 1,
          name: "田径场",
          aliases: "跑道",
          img: "https://cdnjson.com/images/2023/02/26/sport_tianjing.jpg",
          desc: "学生跑步的好去处",
          latitude: 25.097907,
          longitude: 110.28037
        },
        {
          id: 2,
          name: "篮球场",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/sport_basketball.jpg",
          desc: "学生打球的好去处",
          latitude: 25.097452,
          longitude: 110.279299
        },
        {
          id: 3,
          name: "排球场",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/sport_volleyball.jpg",
          desc: "学生打排球的好去处",
          latitude: 25.098094,
          longitude: 110.279472
        },
        {
          id: 4,
          name: "小足球场",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/sport_football2.jpg",
          desc: "学生踢球的好去处",
          latitude: 25.098094,
          longitude: 110.279202
        },
        {
          id: 5,
          name: "户外拓展基地",
          aliases: "攀岩设施",
          img: "https://cdnjson.com/images/2023/02/26/sport_climbing.jpg",
          desc: "学生攀岩的。。。上课场所",
          latitude: 25.097797,
          longitude: 110.278756
        },
        {
          id: 6,
          name: "室内场馆",
          aliases: "羽毛球场、篮球场",
          img: "https://cdnjson.com/images/2023/02/26/sport_indoor.jpg",
          desc: "学生打羽毛球的好去处\n就是老是抢不到场（恼）",
          latitude: 25.0975,
          longitude: 110.278287
        }
      ]
    },
    {
      id: 7,
      name: "广场",
      list: [{
          id: 1,
          name: "至善广场",
          aliases: "大阶梯",
          img: "https://cdnjson.com/images/2023/02/26/sport_zhishan.jpg",
          desc: "这里有宽宽的大阶梯，是拍集体照的好地方",
          latitude: 25.095328,
          longitude: 110.27991
        },
        {
          id: 2,
          name: "乐善广场",
          aliases: "食堂广场",
          img: "https://cdnjson.com/images/2023/02/26/sport_leshsan.jpg",
          desc: "这里经常举办各类社团活动、献血活动，以及早早的升旗",
          latitude: 25.093364,
          longitude: 110.278744
        },
        {
          id: 3,
          name: "弘善广场",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/sport_hongshan.jpg",
          desc: "每次弘善讲堂开会，这里都会排满密密麻麻的人",
          latitude: 25.096035,
          longitude: 110.276883
        },
        {
          id: 4,
          name: "聚善广场",
          aliases: "停车场",
          img: "https://cdnjson.com/images/2023/02/26/sport_jushan.jpg",
          desc: "学生们经常在这里练滑板",
          latitude: 25.096726,
          longitude: 110.279112
        }
      ]
    },
    {
      id: 8,
      name: "风景",
      list: [{
          id: 1,
          name: "蓄善池",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/scenery_xushan.jpg",
          desc: "小小池塘，一方天地",
          latitude: 25.095757,
          longitude: 110.280052
        },
        {
          id: 2,
          name: "育善林",
          aliases: "小树林",
          img: "https://cdnjson.com/images/2023/02/26/scenery_yushan.jpg",
          desc: "枝繁叶茂，清新秀丽，学生往来，小心有蛇",
          latitude: 25.095712,
          longitude: 110.277886
        },
        {
          id: 3,
          name: "假山石榭",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/scenery_jiashan.jpg",
          desc: "学生们经常在这里拍照或者录视频",
          latitude: 25.094892,
          longitude: 110.279911
        },
        {
          id: 4,
          name: "石砖长廊",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/scenery_shizhuan.jpg",
          desc: "红砖长椅，石板道路",
          latitude: 25.094066,
          longitude: 110.280193
        },
        {
          id: 5,
          name: "党建主题长廊",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/scenery_dangjian.jpg",
          desc: "红色精神永存",
          latitude: 25.096783,
          longitude: 110.277940
        },
        {
          id: 6,
          name: "校史大厅",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/scenery_xiaoshi.jpg",
          desc: "记载了数十载桂院历程",
          latitude: 25.095380,
          longitude: 110.279483
        },
        {
          id: 7,
          name: "生态文明教育园地",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/scenery_shengtai.jpg",
          desc: "小小园地，风景秀丽",
          latitude: 25.095100,
          longitude: 110.277053
        }
      ]
    },
    {
      id: 9,
      name: "美食",
      list: [{
          id: 1,
          name: "乐善食府",
          aliases: "食堂",
          img: "https://cdnjson.com/images/2023/02/26/delicious_leshan.jpg",
          desc: "冲呀！干饭呀！",
          latitude: 25.093691,
          longitude: 110.278181
        },
        {
          id: 2,
          name: "美食后街",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/delicious_houjie.jpg",
          desc: "学生们的美食天地",
          latitude: 25.093228,
          longitude: 110.278048
        },
        {
          id: 3,
          name: "蜜雪冰城",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/delicious_mixue.jpg",
          desc: "你爱我 我爱你 蜜雪冰城甜蜜蜜",
          latitude: 25.094037,
          longitude: 110.278461
        }
      ]
    },
    {
      id: 10,
      name: "学生服务",
      list: [{
          id: 1,
          name: "卫生所",
          aliases: "医务室",
          img: "https://cdnjson.com/images/2023/02/26/student_weisheng.jpg",
          desc: "记得戴口罩哦，如果去医院记得弄清报销材料和流程",
          latitude: 25.094901,
          longitude: 110.277143
        },
        {
          id: 2,
          name: "大学生心理健康与咨询中心",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/student_xinli.jpg",
          desc: "提供心理咨询等服务，需要提前预约",
          latitude: 25.094914,
          longitude: 110.276330
        },
        {
          id: 3,
          name: "大学生创新创业实践基地",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/student_chuangye.jpg",
          desc: "这里曾经非常热闹",
          latitude: 25.094640,
          longitude: 110.277248
        },
        {
          id: 4,
          name: "财务处充值中心",
          aliases: "水、电充值",
          img: "https://cdnjson.com/images/2023/02/26/student_chongzhi.jpg",
          desc: "乐善楼二楼\n直饮水、电卡充值处、电卡圈存机",
          latitude: 25.093913,
          longitude: 110.278747
        }
      ]
    },
    {
      id: 11,
      name: "生活服务",
      list: [{
          id: 1,
          name: "校内快递点",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/life_kuaidi.jpg",
          desc: "百世 | 圆通 | 申通 | 京东 | 中通 | 韵达 | 顺丰",
          latitude: 25.091247,
          longitude: 110.277722
        },
        {
          id: 2,
          name: "校外快递点",
          aliases: "邮政快递",
          img: "https://cdnjson.com/images/2023/02/26/life_youzheng.jpg",
          desc: "北门马路对面西侧加州旅馆旁，好远，建议快递走其他家",
          latitude: 25.09827,
          longitude: 110.278491
        },
        {
          id: 3,
          name: "宇家超市",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/27/life_yujia.jpg",
          desc: "食堂旁一家平凡的超市，学生一般都去那里买东西",
          latitude: 25.093817,
          longitude: 110.278485
        },
        {
          id: 4,
          name: "鑫源超市",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/27/life_xinyuan.jpg",
          desc: "一家平凡的超市，学生一般都去那里买东西",
          latitude: 25.093849,
          longitude: 110.278742
        },
        {
          id: 5,
          name: "理发店",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/27/life_lifa.jpg",
          desc: "一家平凡的理发店，我室友的头发在那被理废一次",
          latitude: 25.094065,
          longitude: 110.278362
        },
        {
          id: 6,
          name: "锁店",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/life_suo.jpg",
          desc: "一家平凡的锁店，学生配钥匙一般都去那里配",
          latitude: 25.094649,
          longitude: 110.276912
        },
        {
          id: 7,
          name: "康鑫大药房",
          aliases: "药店",
          img: "https://cdnjson.com/images/2023/02/26/life_yaodian.jpg",
          desc: "一家平凡的药店，学生经常去那里称称自己的体重",
          latitude: 25.093974,
          longitude: 110.278732
        }
      ]
    },
    {
      id: 12,
      name: "宿舍公寓",
      list: [{
          id: 1,
          name: "象山家苑",
          aliases: "东一女生宿舍楼",
          img: "https://cdnjson.com/images/2023/02/26/dormitory_xiangshan.jpg",
          desc: "食堂就在对面，干饭干饭",
          latitude: 25.093627,
          longitude: 110.279674
        },
        {
          id: 2,
          name: "叠彩家苑",
          aliases: "东二男生宿舍楼",
          img: "https://cdnjson.com/images/2023/02/26/dormitory_diecai.jpg",
          desc: "这栋曾经是男生宿舍楼，对面也是男生宿舍楼",
          latitude: 25.092706,
          longitude: 110.279423
        },
        {
          id: 3,
          name: "伏波家苑",
          aliases: "东三女生宿舍楼",
          img: "https://cdnjson.com/images/2023/02/26/dormitory_fubo.jpg",
          desc: "快递点就在斜对面",
          latitude: 25.091851,
          longitude: 110.279057
        },
        {
          id: 4,
          name: "独秀家苑",
          aliases: "东四女生宿舍楼",
          img: "https://cdnjson.com/images/2023/02/26/dormitory_duxiu.jpg",
          desc: "快递点就在对面",
          latitude: 25.091131,
          longitude: 110.278691
        },
        {
          id: 5,
          name: "七星家苑",
          aliases: "西一男生宿舍楼",
          img: "https://cdnjson.com/images/2023/02/26/dormitory_qixing.jpg",
          desc: "曾经的鸳鸯楼",
          latitude: 25.093044,
          longitude: 110.278562
        },
        {
          id: 6,
          name: "芦笛家苑",
          aliases: "西二女生宿舍楼",
          img: "https://cdnjson.com/images/2023/02/26/dormitory_ludi.jpg",
          desc: "快递点就在旁边",
          latitude: 25.092214,
          longitude: 110.278217
        },
        {
          id: 7,
          name: "榕湖家苑",
          aliases: "女生宿舍楼",
          img: "https://cdnjson.com/images/2023/02/26/dormitory_ronghu.jpg",
          desc: "听说是10人间的女生宿舍楼",
          latitude: 25.095623,
          longitude: 110.275874
        },
        {
          id: 8,
          name: "杉湖家苑",
          aliases: "女生宿舍楼",
          img: "https://cdnjson.com/images/2023/02/26/dormitory_shanhu.jpg",
          desc: "一栋高高的女生宿舍楼",
          latitude: 25.094923,
          longitude: 110.276556
        },
        {
          id: 9,
          name: "桂湖家苑",
          aliases: "教职工宿舍楼",
          img: "https://cdnjson.com/images/2023/02/26/dormitory_guihu.jpg",
          desc: "这里也住着一小部分的学生",
          latitude: 25.094591,
          longitude: 110.277058
        },
        {
          id: 10,
          name: "南溪家苑",
          aliases: "女生宿舍楼",
          img: "https://cdnjson.com/images/2023/02/26/dormitory_nanxi.jpg",
          desc: "新建学生宿舍楼\n听说有高贵的二人间和电梯",
          latitude: 25.090311,
          longitude: 110.277327
        },
        {
          id: 11,
          name: "木龙湖家苑",
          aliases: "男生宿舍楼",
          img: "https://cdnjson.com/images/2023/02/26/dormitory_mulong.jpg",
          desc: "新建学生宿舍楼\n听说有高贵的二人间和电梯",
          latitude: 25.093952,
          longitude: 110.274824
        }
      ]
    },
    {
      id: 13,
      name: "其他",
      list: [{
          id: 1,
          name: "考研教室",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/other_kaoyan.jpg",
          desc: "至善楼中部西侧二楼\n向考研学子致敬！",
          latitude: 25.095393,
          longitude: 110.278864
        },
        {
          id: 2,
          name: "风雨棚",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/other_fengyupeng.jpg",
          desc: "学生们经常在那里举办活动或者躲雨",
          latitude: 25.097778,
          longitude: 110.279699
        },
        {
          id: 3,
          name: "益世茶苑",
          aliases: "大益茶室",
          img: "https://cdnjson.com/images/2023/02/26/other_dayi.jpg",
          desc: "乐善楼二楼\n不妨静下心来，品一杯好茶",
          latitude: 25.093834,
          longitude: 110.278638
        },
        {
          id: 4,
          name: "独秀书房",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/other_duxiu.jpg",
          desc: "清幽淡雅，是个读书的好地方",
          latitude: 25.095045,
          longitude: 110.276931
        },
        {
          id: 5,
          name: "善学堂",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/other_shanxue.jpg",
          desc: "至善楼3区四楼\n一块学习小天地",
          latitude: 25.096446,
          longitude: 110.279758
        },
        {
          id: 6,
          name: "公交车站",
          aliases: "K96站台",
          img: "https://cdnjson.com/images/2024/02/19/busstation767a09d4b027eca8.png",
          desc: "东校门旁小小车站\n承载着学生们的大学生活",
          latitude: 25.094681,
          longitude: 110.280808
        },
        {
          id: 7,
          name: "教材领取处",
          aliases: "领书处",
          img: "https://cdnjson.com/images/2023/02/26/other_lingshu.jpg",
          desc: "榕湖家苑对面\n学期伊始，这里都挤满了学生、书本和高贵的小推车",
          latitude: 25.095193,
          longitude: 110.276211
        },
        {
          id: 8,
          name: "阿莲健身",
          aliases: "",
          img: "https://cdnjson.com/images/2023/02/26/other_alian.jpg",
          desc: "彰善楼一楼\n学生健身的好去处",
          latitude: 25.097218,
          longitude: 110.278263
        }
      ]
    }
  ]
}
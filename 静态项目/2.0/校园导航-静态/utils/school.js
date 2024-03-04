/* utils/school.js */
// 学校相关
module.exports = {
  // 学校官方小程序AppID
  AppID: "wx0a954435bd49aca4",

  // 学校信息
  school_information: {
    // 学校全称
    school_name_full: "桂林学院",
    // 学校英文名
    school_name_English_full: "Guilin University",
    // 校规校训
    motto: "向学·向善·自律·自强",
    // 学校荣誉
    honor: "广西优秀民办高等学校",
    // 建校时间
    build_time: 2001,
    // 办校类型
    school_type: "民办",
    // 院校类型
    institution_type: "综合类",
    // 学校所在地
    location: "广西桂林・雁山",
    // 学校简介
    text: "桂林学院（Guilin University 代码：13641）是一所经教育部批准设置的国有民办普通本科高校，由广西壮族自治区教育厅主管、桂林新城投资开发集团有限公司举办。学校前身系广西师范大学与社会投资方于2001年5月合作创办的广西师范大学漓江学院；2004年1月，经教育部确认取得“独立学院”办学资格；2021年5月，教育部致函广西壮族自治区人民政府，同意广西师范大学漓江学院转设并更名为桂林学院。",
  },

  // 校园指南
  shool_guide: [{
      title: '桂院校园导航',
      content: '因桂林学院二期工程仍在建设中，现有导航软件暂无该地区地图，故开发此小程序为同学们提供基础地图显示服务。\n\n因现有资料较少等原因，本小程序可能会存在许多问题，请以实际情况为准。',
      imageList: ['https://cdnjson.com/images/2024/02/19/erqi3dbb1a5741ffb0a2.png'],
      keywords: ['介绍'],
    }, {
      title: '作息时间表',
      content: '仅供参考，以实时文件为准',
      imageList: ['https://cdnjson.com/images/2024/02/19/timeed2d90dbe7844894.png'],
      keywords: ['上课时间表'],
    }, {
      title: '图书馆阅览室',
      content: 'A、B、C馆开放时间不同。\n门口有柜子可放物品，但请自备锁具。',
      imageList: ['https://cdnjson.com/images/2024/02/19/library06288b79afe77fb0.png'],
      keywords: [],
    },
    {
      title: '快递',
      content: '营业时间：8:30 - 19:00 \n收发地址：广西壮族自治区桂林市雁山区雁中路3号桂林学院\n\n校内快递点：百世 | 圆通 | 申通 | 京东 | 中通 | 韵达 | 顺丰\n快递站均在东四宿舍楼对面，位置醒目。\n\n校外快递点：邮政快递\n位于北门对面西侧加州旅馆旁，有点远，建议在其他家收发快递。',
      imageList: ['https://cdnjson.com/images/2024/02/19/express7984a70fc3d279c5.png'],
      keywords: ['菜鸟驿站'],
    },
    {
      title: '教务处',
      content: '地址：知善楼 2层 8206办公室\n服务时间：周一至周五（法定节假日除外）\n上午8:30 - 11:30\n下午14:30 - 16:30\n\n附近 8210文印室 有复打印机，可以复印文件。',
      imageList: [],
      keywords: ['行政'],
    },
    {
      title: '美食',
      content: '乐善食府\n食堂一共有三层，一层是面和粉，二层啥都有，三层是饭。\n\n美食后街\n后街有很多好吃的，还有一家水果店。\n\n蜜雪冰城\n你爱我，我爱你，蜜雪冰城甜蜜蜜。',
      imageList: ['https://cdnjson.com/images/2024/02/19/food5841dcc2fdf0b01e.jpg'],
      keywords: [],
    },
    {
      title: '交通出行',
      content: '①K96路公交车（东校门）\n可前往市区（万福广场、南溪山医院、高新万达城等地），非常便利，不过比较拥挤。支持微信、支付宝、桂林出行网（使用通付码9折优惠）等支付方式，票价2元。\n\n②会仙班车（北校门）\n可前往桂林汽车南站等地（不能进城），然后可以转乘公交车进城。支持现金、微信和支付宝支付，票价4元左右。\n\n③电动三轮车（校门口）\n只可前往大学城附近（不远，不急可以走过去）。支持现金、微信和支付宝支付，票价4元左右。\n\n④打车 or 租用电动车\n校门口有共享电动车可以使用，费用不定。\n\n⑤定制公交（开学和放假时）\n可从桂林站或桂林北站直达学校，自行前往桂林出行网公众号了解详情。',
      imageList: ['https://cdnjson.com/images/2024/02/19/busstation767a09d4b027eca8.png'],
      keywords: [],
    },
    {
      title: '警务与保卫',
      content: '电话：3696019\n地点：东一宿舍楼警务室',
      imageList: ['https://cdnjson.com/images/2024/02/19/police9bd428e44f8b1f07.png'],
      keywords: ['保卫处', '保安'],
    },
    {
      title: '就医',
      content: '电话：18078333667\n地点：大学生创新创业实践基地 卫生所\n门诊时间：上午8点到12点，下午2点到5点\n需要转诊和报销请询问医生。',
      imageList: ['https://cdnjson.com/images/2023/02/26/student_weisheng.jpg'],
      keywords: ['医院医生看病', '医务室'],
    },
    {
      title: '门禁',
      content: '早六点，晚十一点半',
      imageList: [],
      keywords: ['关门时间'],
    },
    {
      title: '宿舍供暖',
      content: '无供暖，但有空调。\n也可自行购置取暖设备，但注意用电安全。',
      imageList: [],
      keywords: ['暖气'],
    },
    {
      title: '电卡充值',
      content: '①充值处充值：携带电卡前往乐善楼二层充值处进行充值。\n②网上充值，机器激活：在财务处公众号充值，携带电卡前往乐善楼二层，在电卡圈存机上插卡激活。\n\n将电卡插入宿舍外电箱进行取电。',
      imageList: ['https://cdnjson.com/images/2023/02/26/student_chongzhi.jpg'],
      keywords: ['用电'],
    },
    {
      title: '洗澡用水',
      content: '供水时间：17:00-19:00、21:30-24:00\n宿舍卫生间开灯，并使用手机app控制热水开关。',
      imageList: ['https://cdnjson.com/images/2024/02/26/showerad28421408a41f04.png'],
      keywords: ['淋浴'],
    },
    {
      title: '饮用水',
      content: '宿舍楼各房间均配备有饮水机。\n饮用水价格：8元/桶（目前），自行拨打经销商电话，订购桶装水。',
      imageList: ['https://cdnjson.com/images/2024/02/26/Water_dispensereffee25621ed10b9.png'],
      keywords: [],
    },
    {
      title: '自动售货机',
      content: '宿舍楼旁均配备有自动售货机，扫码支付即可购买商品。',
      imageList: ['https://cdnjson.com/images/2024/02/26/Vending_Machine60fd713c293f5e70.png'],
      keywords: [],
    },
    {
      title: '报修',
      content: '①教室报修：\n电话：拨打教室讲台上的指定报修电话。\n\n②宿舍报修：\n登记：前往各宿舍楼值班室登记报修。',
      imageList: ['https://cdnjson.com/images/2024/02/26/repairc22c2a9ad8eea3f5.png'],
      keywords: ['修理'],
    },
  ]
}
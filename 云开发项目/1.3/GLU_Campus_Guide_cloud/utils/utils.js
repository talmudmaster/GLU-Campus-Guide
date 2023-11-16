/* utils/utils.js */
module.exports = {
    // 腾讯位置服务API
    mapKey: "ZQWBZ-NQBLV-W7CPF-U7QIR-5HBNQ-AOFUE",
    // 和风天气API
    weatherKey: "de1f89544449420cb217032e79b9527c",

    // 小程序名称
    miniprogram_name: "桂院校园导航",
    // 学校全称
    school_name_full: "桂林学院",
    // 学校简称
    school_name_short: "桂院",
    // 学校英文名
    school_name_English_full: "Guilin University",
    // 学校英文简称
    school_name_English_short: "GLU",
    // 学校模糊坐标（用于获取天气数据）
    school_location: "110.28,25.09",
    // 学校精确坐标（用于地图定位）
    longitude: '110.277685',
    latitude: '25.093668',
    // 校徽
    school_logo: "../../images/school_logo.png",
    // 学校官方小程序AppID
    AppID: "wx0a954435bd49aca4",
    // 学校信息
    school_information: {
        // 校规校训
        motto: "向学·向善·自律·自强",
        // 学校荣誉
        honor: "广西优秀民办高等学校",
        // 建校时间
        build_time: "2001",
        // 办校类型
        school_type: "民办",
        // 院校类型
        institution_type: "综合类",
        // 学校所在地
        location: "广西桂林·雁山",
    },
    // 学校简介
    text: "桂林学院（Guilin University 代码：13641）是一所经教育部批准设置的国有民办普通本科高校，由广西壮族自治区教育厅主管、桂林新城投资开发集团有限公司举办。学校前身系广西师范大学与社会投资方于2001年5月合作创办的广西师范大学漓江学院；2004年1月，经教育部确认取得“独立学院”办学资格；2021年5月，教育部致函广西壮族自治区人民政府，同意广西师范大学漓江学院转设并更名为桂林学院。",

    // 地图相关

    // 是否展示 POI 点
    enablepoi: false,
    // 是否显示带有方向的当前定位点
    showLocation: true,
    // 缩放级别
    scale: 16.1,
    // 最小缩放级别，比缩放级别小0.1-0.2为宜
    minscale: 16,
    // 自定义图层
    groundoverlay: {
        // 图层透明度 0-1
        opacity: 0.7,
        // 西南角
        southwest_latitude: 25.088910,
        southwest_longitude: 110.273850,
        // 东北角
        northeast_latitude: 25.098995,
        northeast_longitude: 110.281229,
    },
    // 地图边界
    boundary: {
        // 西南角
        southwest_latitude: 25.088083,
        southwest_longitude: 110.272618,
        // 东北角
        northeast_latitude: 25.099580,
        northeast_longitude: 110.281911,
    },
    // 学校边界
    school_boundary: {
        // 东（学校最东端的 经度）
        east: 110.280699,
        // 西（学校最东端的 经度）
        west: 110.2733,
        // 南（学校最东端的 纬度）
        south: 25.089701,
        // 北（学校最东端的 纬度）
        north: 25.09839,
    },
    default_site_name: "东门",

    // 图片

    // 学校公众号
    guanwei: "https://cdnjson.com/images/2023/04/30/guanwei.png",
    // 作者联系方式
    contact: "https://cdnjson.com/images/2023/02/26/contact.png",
    // 赞助
    sponsor: "https://cdnjson.com/images/2023/10/16/weixinzhifu.png",
    // 公共
    message_icon: "../../images/message_icon.png",
    // 封面
    school_icon: "../../images/school_icon.png",
    school_life: "../../images/school_life.png",
    map: "../../images/map.png",
    right_arrow: "../../images/right_arrow.png",
    // 地图
    blue_location: "../../images/blue_location.png",
    red_location: "../../images/red_location.png",
    location: "../../images/location.png",
    // 地点总汇
    tag: "../../images/tag.png",
    // 地点排名
    arrow_first: "../../images/arrow_first.png",
    arrow_first_no: "../../images/arrow_first_no.png",
    arrow_last: "../../images/arrow_last.png",
    arrow_last_no: "../../images/arrow_last_no.png",
    arrow_left: "../../images/arrow_left.png",
    arrow_left_no: "../../images/arrow_left_no.png",
    arrow_right: "../../images/arrow_right.png",
    arrow_right_no: "../../images/arrow_right_no.png",
    // 校园信息
    laba: "../../images/laba.png",
    new: "../../images/new.png",
    bus: "../../images/bus.png",
    wechat: "../../images/wechat.png",
    magazine: "../../images/magazine.png",
    weather: "../../images/weather.png",
    // 学校信息
    tel: "../../images/tel.png",
    // 交通出行
    grey_bus: "../../images/grey_bus.png",
    guilinchuxingwang: "../../images/guilinchuxingwang.png",
    // 软件声明
    message: "../../images/message.png",
    notes: "../../images/notes.png",
    zhixie: "../../images/zhixie.png",
    zhixie_kaifazhe: "https://cdnjson.com/images/2023/10/24/zhixie_kaifazhe.jpg",
    zhixie_up: "https://cdnjson.com/images/2023/02/26/zhixie_up.jpg",
    // 个人中心
    avatarUrl: "../../images/hat.png",
    green_arrow: "../../images/green_arrow.png",
    home: "../../images/home.png",
    message_mypage: "../../images/message_mypage.png",
    notes_mypage: "../../images/notes_mypage.png",
    users: "../../images/users.png",
    chat: "../../images/chat.png",
    money: "../../images/money.png",
    feedback: "../../images/feedback.png",
    share: "../../images/share.png",
    admin: "../../images/admin.png",
    // 获取地点
    circle: "../../images/circle.png",

    // 学校信息
    schooldata: [{
            id: 1,
            name: "人文学院",
            desc: "人文学院现开设有汉语言文学、汉语国际教育、英语、商务英语、越南语、泰语六个专业。\n\n&emsp;&emsp;其中，英语为广西一流本科专业建设点及广西民办高校重点建设专业、商务英语为广西高校财政重点扶持专业，汉语国际教育专业获自治区创新创业教育改革示范专业，4门课程获自治区一流课程建设点。",
        },
        {
            id: 2,
            name: "金融与法律学院",
            desc: "金融与法律学院现开设有金融学类（金融学、投资学、保险学、互联网金融）、经济学、国际经济与贸易、法学共七个专业。\n\n&emsp;&emsp;其中，酒店管理是广西民办重点建设专业和自治区重点建设专业，法学专业是广西民办重点建设专业和校级重点建设专业。学院长期聘请知名教授、行业专家、企业领军人才为学生授课和开展学术交流讲座。",
        },
        {
            id: 3,
            name: "管理工程学院",
            desc: "管理工程学院现开设有旅游管理类（旅游管理、酒店管理、会展经济与管理）、工商管理类（工商管理、资产评估、财务管理、审计学）、会计学、物业管理、电子商务、物流工程共十一个专业。\n\n&emsp;&emsp;其中财务管理专业为自治区级一流本科专业建设点。",
        },
        {
            id: 4,
            name: "教育学院",
            desc: "教育学院现开设有学前教育、小学教育、音乐学、舞蹈学共四个专业。\n\n&emsp;&emsp;其中音乐学专业为广西高等教育创优计划项目——特色专业、自治区一流本科专业建设点。\n\n&emsp;&emsp;学院现有广西高校实验教学示范建设中心1个（MIDI实验中心），广西高等教育创优计划项目2个，分别是音乐学（特色专业）、学前教育专业与桂林市七星幼教集团共建基地（自治区级大学生校外实践教育基地）。",
        },
        {
            id: 5,
            name: "理工学院",
            desc: "理工学院现开设有数学与应用数学、计算机科学与技术、软件工程、数据科学与大数据技术、物联网工程、电子信息工程、智能测控工程、医学信息工程八个专业。\n\n&emsp;&emsp;学院紧紧围绕培养应用型人才的办学指导思想，积极开展校企合作，探索产教融合。",
        },
        {
            id: 6,
            name: "城市设计学院",
            desc: "城市设计学院现开设有四个设计学类专业（环境设计、视觉传达、数字媒体艺术专业和工艺美术）以及工程造价、城乡规划两个工学专业。\n\n&emsp;&emsp;城市设计学院是广西独立学院中招收艺术本科时间最早、目前办学规模最大的高校教学部门，学院现有教职工41人，具有正高职称1人，副高职称7人，讲师22人，其中19人获得“双师型”教师认证。",
        },
        {
            id: 7,
            name: "体育与健康学院",
            desc: "体育与健康学院现开设有体育教育、社会体育指导与管理、运动康复、健康服务与管理四个本科专业。\n\n&emsp;&emsp;下设体育教师教育、健康休闲以及公共体育3个教研室，目前拥有在校学生840余人。\n\n&emsp;&emsp;一直以来，我院坚持以培养应用技术型体育专业人才为目标，以质量求生存，以社会需求为导向，以“双技能”素质培养和综合素质为主线，培养具有良好教师职业素养，能胜任中小学体育教学工作、社区体育服务与指导的应用技术型人才。",
        },
        {
            id: 8,
            name: "传媒与新闻学院",
            desc: "传媒与新闻现开设有新闻传播学类（新闻学、数字出版）、播音与主持艺术、广播电视编导及数字媒体技术共五个专业。\n\n&emsp;&emsp;自建院以来，学院凝心聚力，在常规工作有序进行的基础上，努力贯通各个专业节点，形成专业合力，协同发展；积极与各个协议共建合作单位协商，各专业不断增加及参与媒体融合实践，利用各种媒体平台，努力提升专业抗震能力，提高教学质量和实践操作能力及就业率。\n\n&emsp;&emsp;为突出应用型人才培养，全力打造专业特色，学院设特色实训室（融媒体实训室），逐步将学院建构成为媒体融合的有机整体。",
        },

    ],
    // 部门联络电话
    teldata: [{
            id: 1,
            name: "警务与保卫",
            list: [{
                    id: 1,
                    name: "校园保卫队",
                    tel: "3696019"
                },
                {
                    id: 2,
                    name: "校园大门值班室",
                    tel: "3696093"
                },
            ]
        },
        {
            id: 2,
            name: "医务室",
            list: [{
                id: 1,
                name: "医务室",
                tel: "18078333667"
            }, ]
        },
        {
            id: 3,
            name: "水电报修",
            list: [{
                    id: 1,
                    name: "水电报修办公室",
                    tel: "3696151"
                },
                {
                    id: 2,
                    name: "水电报修手机",
                    tel: "13217733880"
                },
            ]
        },
        {
            id: 4,
            name: "教学楼管理员",
            list: [{
                    id: 1,
                    name: "公共教学楼教室",
                    tel: "3696031"
                },
                {
                    id: 2,
                    name: "体育馆教室、器材",
                    tel: "3696165"
                },
                {
                    id: 3,
                    name: "艺术楼教室",
                    tel: "3696035"
                },
                {
                    id: 4,
                    name: "琴房",
                    tel: "3696036"
                },

            ]
        },
        {
            id: 5,
            name: "公寓值班室",
            list: [{
                    id: 1,
                    name: "东一",
                    tel: "3696381"
                },
                {
                    id: 2,
                    name: "东二",
                    tel: "3696382"
                },
                {
                    id: 3,
                    name: "东三",
                    tel: "3696383"
                },
                {
                    id: 4,
                    name: "东四",
                    tel: "8991227"
                },
                {
                    id: 5,
                    name: "西一",
                    tel: "3696385"
                },
                {
                    id: 6,
                    name: "西二",
                    tel: "3696160"
                },
                {
                    id: 7,
                    name: "榕湖家苑",
                    tel: "8991825"
                },

                {
                    id: 8,
                    name: "漓江家苑",
                    tel: "3871973"
                },
            ]
        },
        {
            id: 6,
            name: "理工学院",
            list: [{
                    id: 1,
                    name: "辅导员办公室",
                    tel: "3696219"
                },
                {
                    id: 2,
                    name: "教学秘书办公室",
                    tel: "3696216"
                },
                {
                    id: 3,
                    name: "数学教研室",
                    tel: "3696379"
                },
                {
                    id: 4,
                    name: "计算机教研室",
                    tel: "3696215"
                },
            ]
        },
    ],
}
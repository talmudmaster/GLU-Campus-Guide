<p align="center">
  <img alt="logo" src="images/logo.png" width="120" style="margin-bottom: 10px;">
</p>

<h3 align="center">桂院校园导航小程序</h3>

<p align="center" style="display: flex; justify-content: center; align-items: center; gap: 10px">
  <img src="https://gitee.com/talmudmaster/GLU-Campus-Guide/badge/star.svg?theme=dark" />
  <img src="https://img.shields.io/github/stars/talmudmaster/GLU-Campus-Guide" />
  <img src="https://img.shields.io/badge/platform-微信小程序-teal?style=for-the-badge" />
  <img src="https://img.shields.io/badge/version-2.3.0-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/license-MulanPSL-forestgreen?style=for-the-badge" />
</p>

<p align="center">
🔥 <a href="https://blog.csdn.net/weixin_45940369/article/details/130613289" target="_blank">配置和修改教程（CSDN）</a>
&nbsp;
🚀 <a href="https://space.bilibili.com/384844986/lists/1197124" target="_blank">视频介绍（bilibili）</a>
</p>

<div align="center">

提供 **云开发** 和 **静态** 双版本 供选择

仅需修改地图配置文件和云端数据，即可 **适配任意校园**

☑️ 多校区切换 ☑️ 地图选点与搜索 ☑️ 地图路线规划 ☑️ 校园信息展示 ☑️ 在线管理数据

原生微信小程序 + weui组件库 + 腾讯位置服务 API + 和风天气 API + 云开发

</div>

---

# 📢 写在前面

> **① 单校区也可以使用多校区的所在版本，不必使用以前的**  
> <br>
> **② 实在不会搞的，可以通过下面的联系方式私聊**  
> <br>
> **③ 可自由修改该项目，重构后端（如springboot、koa），重构前端（如uni、鸿蒙），变更形式（如web、app），甚至使用其他类型的地图框架（如leaflet、openlayers、mapbox、cesium），毕竟地图数据的处理逻辑是相似的**  
> <br>
> **④ 可以引入 Dijkstra 或者 A\* 算法**  
> <br>
> **⑤ 不太会改项目，或者是不理解代码，可以使用Ai工具辅助学习**  


# 📖 介绍

桂院校园导航是一款以地图为载体，提供桂林学院**校园地点的位置信息、导航，以及校园信息介绍**的小程序。

旨在解决传统地图的校园标识不到位、地图形式低效单一、信息设计不够好等问题，为来桂院的新生和访客提供更加完美的出行体验。

# 🔍 预览

扫描下方小程序二维码，即可体验静态版本。

注意：因微信审核机制限制，目前示例小程序不是最新版本，可以 clone 代码到本地开发工具预览

![](/images/QRCode.jpg)

# ⚡️ 功能

持续更新迭代中

## ① 地图相关

- ✅ 多校区切换 | **2.3.0 版本已上线**
- ✅ 校园地点分类动态展示
- ✅ 地点选择与搜索
- ✅ 地点信息展示
- ✅ 路线规划 | **2.0 版本起，弃用插件，改用 腾讯位置服务 API 实现**

![](/images/show1.png)

## ② 校园相关

- ✅ 校园信息展示
- ✅ 校园指南 | **2.0 版本已上线**
- ✅ 跳转至学校公众号/小程序

![](/images/show2.png)

## ③ 在线管理

- ✅ 管理校区 | **2.3.0 版本已上线**
- ✅ 管理地点数据（地点类型、地点） | **2.0 版本起，新增 默认地点**
- ✅ 地点坐标获取（地图选点）
- ✅ 管理媒体文件（轮播图、视频及地点默认图片） | **2.0 版本起，删去封面，新增 地点默认图片**
- ✅ 管理校园指南信息 | **2.2 版本已上线**

![](/images/show3.png)

# 🖌️ 设计思路

## ① 前端（小程序 + 组件库）

- 微信原生小程序：使用map组件渲染地图
- weui组件库：使用模态弹窗，美化地点展示效果

## ② 接口（位置服务 + 天气）

- 腾讯位置服务 API：传入起始点坐标，将返回的路线数据处理后，显示在页面和地图上
- 和风天气 API：传入坐标，将返回的天气数据处理后，显示在页面上

## ③ 后端（小程序云开发）

- 云数据库：JSON文档型数据库，灵活便捷
- 云函数：云端运行代码，天然集成微信鉴权
- 云存储：可上传/下载/引用文件

# ⚙ 配置教程

教程较长，故放在 CSDN 平台 ，敬请谅解

`CSDN 文章`：[**校园导航小程序 配置和修改教程**](https://blog.csdn.net/weixin_45940369/article/details/130613289)

**`请严格按照其中的步骤，一步一步来。若缺失步骤，可能会导致意想不到的问题。`**

> ① 电脑的定位源自于网络IP节点，故不一定准确，建议使用手机投屏演示，定位会更准  
> <br>
> ② 若上传了校园地图，则需要在手机端预览，因为电脑端无法预览自定义图层  
> <br>
> ③ 若设置了标记点图标，电脑端可能无法预览点聚合效果，在手机端预览

[切片图案](图片源文件)：首页按钮的切片素材，可导入 即时设计 进行编辑

# 📢 关于小程序发行

> ① 小程序未发行时，别人无法看到。此时只能将对方加入开发成员，让他扫码（小程序预览时的二维码），才能看到  
> <br>
> ② 小程序需要经过备案（若取学校中文名和用校徽，容易被打回，除非有官方授权），才能发行。此时对方只能通过扫小程序码，才能看到  
> <br>
> ③ 小程序通过微信认证（个人30/公司300认证一年，但不保证通过），才能被搜索到和被分享给其他人  
> <br>
> ④ 如无紧迫需求，不建议进行备案、发行和微信认证

# 📝 写作指南

考虑到 课设、毕设 还需要 PPT 和 文章，故提供了如下相关文档，以便各位参考

- [部分参考文章](https://pan.baidu.com/s/178lwGP1KIwtJekt55Fv2FA?pwd=f6gg)
- [**答辩演示PPT、文章报告**](https://docs.qq.com/s/wyOX55WZyaFPwHSTTWsD2q)，可直接导出 或 转存后在线编辑
- [相关设计图文件](图片源文件)（示意图、ER 图、流程图、系统结构图），可导入 processon 进行编辑
- 大计赛参赛作品——[云上高校导航](https://gitee.com/talmudmaster/Cloud-based_University_Navigation)

除此之外，还可以去知网或其他平台，以 小程序、云开发、校园导航 等词作为关键词进行搜索，查阅相关资料

# 🧾 参考资料

- [微信官方文档 · 小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [莞香广科 · 校园导览](https://gitee.com/hm_anwei/school-map)
- [信科校园导览](https://gitee.com/talmudmaster/GIIT-campus-guide)
- [地大校园导航](https://gitee.com/min_yue/CUG_Campus-navigation)
- [西海岸导览](https://gitee.com/tfnmdmx-gitee/xhaGuide)
- [案例分享丨如何设计校园导航系统](https://itc.jnmc.edu.cn/2021/0621/c1949a121868/pagem.htm)

# 🤝 交流讨论

开发者

- QQ：229600398
- 微信：qq229600398

开发交流群

- QQ 交流群：815075137
- 微信 交流群：加微信，拉你进群（因为微信群二维码会过期）

# 📒 注意事项

项目虽小，但是应付 课设、毕设、小型比赛 ，还是可以的

建议在使用该项目前进群询问，以免出现同校同学院撞车的尴尬情况

**建议在开题和中期答辩时，多藏点东西，不然老师认为你很能干，肯定让你加很多很多功能**

往期版本放在 [百度网盘](https://pan.baidu.com/s/178lwGP1KIwtJekt55Fv2FA?pwd=f6gg)（已停止维护，不建议使用）

# 🎈 贡献者们

感谢以下小伙伴们为 本项目 发展做出的贡献：

- **bilibili @ [宙克儿](https://space.bilibili.com/506034009)** 测试 云开发项目运行 和 找bug
- **bilibili @ [WhaleFallStudio](https://space.bilibili.com/34506136)** 提供 校园信息页 按钮图片 的 切片素材
- **bilibili @ [白艺中葡萄](https://space.bilibili.com/689315633)** 提供 地点搜索页 的 历史记录和热门地点 功能的 idea 和 code

# ❤ 致谢

非常感谢以下的小程序开发者和 B 站 up。让我学到了很多，得以完成小程序

![](/images/thanks.png)

# 📚 开源协议

本项目基于 [MulanPSL2](https://license.coscl.org.cn/MulanPSL2) 协议，请自由地享受和参与开源。

# 📅 远期规划

2023 年初，为了应付毕设，只是草草学了下相关知识就上手做了这个项目。不可避免地会出现代码冗余混乱、界面设计奇奇怪怪等诸多问题

之后也许会重新写，页面做得更加美观，项目修改难度更小，相关逻辑更家简洁易懂

- 采用 腾讯位置服务 WebService API、vant weapp 等主流技术和 UI 组件库
- 实现 路线规划时，自由切换 驾车、步行、骑行 模式 ✔️
- 使用 自定义组件，减少代码冗余
- 优化 界面设计、后端设计
- 提取所有云端调用接口、通用方法逻辑到外部js文件
- 使用 async/await 优化云函数接口调用后页面的 js 逻辑
- 实现 精准的地理位置判断，检测当前位置是否处于学校区域内（射线法思想） ✔️
- 实现 多校区切换 ✔️
- 实现 全景图 动态管理
- 实现 校车路线、浏览路线展示
- 引入 AI大语言模型对话
- 完善 相关文档及设计图（PPT、文章报告、UML 图、原型设计图、UI 设计图）

# 🧮 寻路算法思路

（我大概率没有心思去钻研和实现，有想法的网友可以自行研究或进群探讨）

有网友问我，不想用 API，如何使用算法实现路线规划。

一般是用 `Dijkstra` 或者 `A*`，当然也有其他的寻路算法，可以自行去了解。

`可以借助AI进行开发，减少开发工作量`

实现的思路大概是：

1. 获取所有地点的坐标，并生成一个点集合
2. 遍历所有地点，计算出每个地点到所有地点的距离，并生成一个距离矩阵
3. 使用 Dijkstra 或者 A\* 算法，根据距离矩阵，计算出起点到终点的最短路径

![](/images/point.png)

这里用图片来辅助说明：

- 图中红点蓝点都表示点（地点可引用其中任意一点，这里为清晰表示，暂时标为红点），蓝线表示边。就可以模拟出 **图**。
- 边的长度可以通过 Haversine公式 或 球面余弦定理 计算得出（其实方向也可以算出），并存储下来。
- 通过算法计算出最短路经过的所有点和路径长度距离。
- 计算最短路径并显示在地图上（使用 polyline 折线，可加动画轨迹）。
- 相同方向的边可以合并成一条路线进行展示说明。

# 🏠 室内地图 与 AR导航

这个是我一直想实现的，不过我是真的知之甚少，有想法的网友可以自行研究或进群探讨

# 🪄 二创案例

欢迎投稿！
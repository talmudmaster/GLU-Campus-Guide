// pages/search/search.js
let db = wx.cloud.database()
let _ = db.command
Page({

    /**
     * 页面的初始数据
     */
    data: {
        key: null,
        search_id: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.id)
        this.setData({
            search_id: options.id
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    getKey(e) {
        this.setData({
            key: e.detail.value
        })
    },
    // 搜索
    goSearch() {
        console.log(this.data.key)
        let key = this.data.key
        if (this.data.key) {
            db.collection('site')
                .where(_.or([{
                        name: db.RegExp({
                            regexp: key, // 搜索的值
                            options: 'i', // 不区分大小写
                        })
                    },
                    {
                        aliases: db.RegExp({
                            regexp: key, // 搜索的值
                            options: 'i', // 不区分大小写
                        })
                    }
                ]))
                .get()
                .then(res => {
                    console.log('success', res)
                    this.setData({
                        list: res.data
                    })
                    if(this.data.list&&this.data.list.length==0){
                        wx.showToast({
                            icon: 'none',
                            title: '未找到结果',
                        })
                    }
                })
                .catch(err => {
                    console.log('fail', err)
                })
        } else {
            wx.showToast({
                icon: 'error',
                title: '请输入内容',
            })
        }
    },
    // 返回地图页并通过缓存传递参数
    tapback(e){
        console.log(e.currentTarget.dataset.s_id)
        let id = e.currentTarget.dataset.s_id
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  // 上一个页面
        let search_id = this.data.search_id
        let search_begin = 0
        let search_end = 0
        if(search_id==1){
            search_begin = 1
            prevPage.setData({
                site_begin: id
            });
        }else if(search_id==2){
            search_end = 1
            prevPage.setData({
                site_end: id
            });
        }
        console.log(search_begin)
        console.log(search_end)
        console.log(id)
        console.log(prevPage)
        // 直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
            search_begin: search_begin,
            search_end: search_end,
            search_site_id: id,
        });
        // 浏览次数加1
        wx.cloud.callFunction({
            name: 'browse',
            data: {
                id: id,
            }
        })
        wx.navigateBack({})
    }

})
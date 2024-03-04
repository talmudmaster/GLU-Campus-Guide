// pages/category-manage/manage.js
let db = wx.cloud.database()
let _ = db.command
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sid: 1,
        name: null,
        category_list: [],
        _id: null,
        category: 1,
        showname: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        this.setData({
            sid: options.sid,
            _id: options._id,
            category: options.id,
            showname: options.name
        })
        db.collection('category')
            .get()
            .then(res => {
                console.log('success', res)
                this.setData({
                    category_list: res.data
                })
                let category_list = this.data.category_list
                this.setData({
                    c_id: category_list[category_list.length - 1].c_id + 1
                })
            })
            .catch(err => {
                console.log('fail', err)
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

    getName(e) {
        this.setData({
            name: e.detail.value
        })
    },

    addcategory() {
        if (this.data.name != null && this.data.name != "") {
            wx.cloud.callFunction({
                    name: 'add_category',
                    data: {
                        name: this.data.name
                    }
                })
                .then(res => {
                    console.log('success', res)
                    wx.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 2000
                    })
                    setTimeout(() => {
                        wx.navigateBack()
                    }, 1500)
                })
                .catch(err => {
                    console.log('fail', err)
                })
        } else if (this.data.name == null || this.data.name == "") {
            wx.showToast({
                title: '请输入类别名称！',
                icon: 'none',
                duration: 2000
            })
        }
    },

    updatecategory() {
        console.log(this.data.name)
        console.log(this.data._id)
        if (this.data.name != null && this.data.name != "") {
            wx.cloud.callFunction({
                    name: 'update_category',
                    data: {
                        _id: this.data._id,
                        name: this.data.name
                    }
                })
                .then(res => {
                    console.log('success', res)
                    wx.showToast({
                        title: '修改成功',
                        icon: 'success',
                        duration: 2000
                    })
                    setTimeout(() => {
                        wx.navigateBack()
                    }, 1000)
                })
                .catch(err => {
                    console.log('fail', err)
                })
        } else if (this.data.name == null || this.data.name == "") {
            wx.showToast({
                title: '请输入类别名称！',
                icon: 'none',
                duration: 2000
            })
        }
    },

    removecategory() {
        var that = this
        wx.showModal({
            title: '提示',
            content: '删除操作不可逆\n请谨慎操作！',
            success(res) {
                if (res.confirm) {
                    // 是否有关联数据
                    wx.cloud.callFunction({
                            name: 'lianbiao_query',
                        })
                        .then(res => {
                            console.log('success', res)
                            let list = res.result.list[that.data.category].list.length
                            console.log(list)
                            if (list == 0) {
                                wx.cloud.callFunction({
                                        name: 'remove_category',
                                        data: {
                                            _id: that.data._id,
                                        }
                                    })
                                    .then(res => {
                                        console.log('success', res)
                                        wx.showToast({
                                            title: '删除成功',
                                            icon: 'success',
                                            duration: 2000
                                        })
                                        setTimeout(() => {
                                            wx.navigateBack()
                                        }, 1000)
                                    })
                                    .catch(err => {
                                        console.log('fail', err)
                                    })
                            } else {
                                wx.showToast({
                                    title: '该类别下存在地点，无法删除！\n请确保该类别下没有地点',
                                    icon: 'none',
                                    duration: 3000
                                })
                            }
                        })
                        .catch(err => {
                            console.log('fail', err)
                        })
                }
            }
        })
    }
})
// pages/map/instruction/instruction.js
import map from '@data/map'
import media from '@data/media'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        map: media.map,
        // 默认地点
        default_point: map.default_point.name,
    },

    // 跳转至地点汇总页
    tosite() {
        wx.switchTab({
            url: '../../site/site',
        })
    },

    // 跳转至地图页
    tomap() {
        wx.switchTab({
            url: '../../map/map',
        })
    }
})
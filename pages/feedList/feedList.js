// pages/feedList/feedList.js
const { get } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getFeedList()
  },
  
  // GET查询反馈列表
  getFeedList() {
    get('/api/takeout/feedback/list').then(res => {
      this.setData({
        feedList: res.rows
      })
    })
  },
  // 跳转详情，传递反馈id
  toDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/feedDetail/feedDetail?id=${id}` })
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
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
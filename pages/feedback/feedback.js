// pages/feedback/feedback.js
const { post } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  // 提交反馈 POST接口
  subFeed(e) {
    const { title, content } = e.detail.value
    post('/api/common/feedback', { title, content }).then(res => {
      console.log('subFeed', res)
      wx.showToast({ title: res.msg })
      setTimeout(() => wx.navigateBack(), 1200)
    })
  },
  // 跳转反馈列表
  toFeedList() {
    wx.navigateTo({
       url: "/pages/feedList/feedList" 
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
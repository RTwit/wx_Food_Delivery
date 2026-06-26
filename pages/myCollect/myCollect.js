// pages/myCollect/myCollect.js
const { get, del, IMG_BASE_URL } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: IMG_BASE_URL,
    list : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCollList()
  },

  //获取收藏列表接口
  getCollList(){
    get('/api/takeout/collect/list').then(res => {
      console.log('collList', res)
      this.setData({
        list: res.rows
      })
    })
  },

  //取消收藏
  cancCollect(e){
    let collectId = e.currentTarget.dataset.id
    console.log('取消当前收藏id：', collectId)
    del(`/api/takeout/collect/${collectId}`).then(res => {
      console.log('cancCollect', res)
      wx.showToast({ title: '取消成功' })
      this.getCollList()
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
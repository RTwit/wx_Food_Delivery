// pages/sellerDet/sellerDet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'http://111.231.33.234:10001',
    detailInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const sellerId = options.id
    this.getSellerDetail(sellerId)
  },

  // 获取商家详情
  getSellerDet(id) {
    let url = this.data.baseUrl + '/prod-api/api/takeout/seller/'
    wx.request({
      url: url + id,
      success: res => {
        console.log('sellerDet',res);
        this.setData({
          detailInfo: res.data.data
        })
      },
      fail: () => 
      wx.showToast({
         title: '加载详情失败', 
         icon: 'none' 
        })
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
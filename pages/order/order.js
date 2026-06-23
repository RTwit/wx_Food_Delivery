// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'http://111.231.33.234:10001',
    odList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getOrderList()
  },

  // 获取订单列表
  getOrderList() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: '你还未登录',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: this.data.baseUrl + '/prod-api/api/allorder/list',
      method: 'GET',
      header: {
        Authorization: token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.data.code === 200) {
          console.log('orderlist',res);
          // 赋值订单
          this.setData({
            orderList: res.data.rows
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
      fail: () => {
        console.log(err);
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        })
      }
    })
  },

  //下拉刷新订单
  onPullDownRefresh() {
    this.getOrderList()
    wx.stopPullDownRefresh() // 停止下拉加载动画
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
// pages/feedList/feedList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'http://111.231.33.234:10001',
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
    const token = wx.getStorageSync('token')
    wx.request({
      url: this.data.baseUrl + '/prod-api/api/takeout/feedback/list',
      method: "GET",
      header: {
        Authorization: token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.data.code === "200") {
          this.setData({
             feedList: res.data.rows 
            })
        } else {
          wx.showToast({
             title: res.data.msg, 
             icon: "none" 
            })
        }
      },
      fail: () => wx.showToast({
         title: "网络异常", 
         icon: "none" 
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
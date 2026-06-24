// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'http://111.231.33.234:10001',
  },
  // 提交反馈 POST接口
  subFeed(e) {
    const token = wx.getStorageSync('token')
    const { title, content } = e.detail.value
    wx.request({
      url: this.data.baseUrl + '/prod-api/api/common/feedback',
      method: "POST",
      header: {
        Authorization: token,
        'content-type': 'application/json'
      },
      data: { title, content },
      success: res => {
        console.log('subFeed',res);
        if (res.data.code === "200") {
          wx.showToast({
             title: res.data.msg 
            })
          setTimeout(()=>wx.navigateBack(),1200)
        } else {
          wx.showToast({
             title: res.data.msg, icon: "none" 
            })
        }
      },
      fail: () => wx.showToast({
         title: "网络异常", icon: "none" 
        })
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
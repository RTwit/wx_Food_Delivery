// pages/changePwd/changePwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'http://111.231.33.234:10001',
  },

  resetPwd(e) {
    const token = wx.getStorageSync('token')
    const { oldPassword, newPassword } = e.detail.value
    // 非空校验
    if (!oldPassword || !newPassword) {
      wx.showToast({ title: '新旧密码不能为空', icon: 'none' })
      return
    }
    wx.request({
      url: this.data.baseUrl + '/prod-api/api/common/user/resetPwd',
      method: 'PUT',
      header: {
        Authorization: token,
        'content-type': 'application/json'
      },
      data: {
        oldPassword,
        newPassword
      },
      success: res => {
        if (res.data.code === '200') {
          wx.showToast({ title: res.data.msg })
          // 修改密码成功，清空token，强制回到登录页
          setTimeout(() => {
            wx.removeStorageSync('token')
            wx.reLaunch({ url: '/pages/login/login' })
          }, 1200)
        } else {
          wx.showToast({ title: res.data.msg, icon: 'none' })
        }
      },
      fail: () => {
        wx.showToast({ title: '网络请求失败', icon: 'none' })
      }
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
// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'http://111.231.33.234:10001',
    userInfo: null,
  },

  //登录
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad(options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getUserInfo()
  },
  // 加载用户信息
  getUserInfo() {
    const token = wx.getStorageSync('token')
    let url = this.data.baseUrl + '/prod-api/api/common/user/getInfo'
    wx.request({
      url : url,
      header: {
        Authorization:token
      },
      success:res=>{
        console.log('userInfo',res);
        if(res.data.code === 200) {
          this.setData({
            userInfo: res.data.user
          })
        app.globalData.userInfo = res.data.user
        }
      }, else (){
        this.setData({ 
          userInfo: null 
        })
      }
    })
  },

  // 我的订单
  toOrder() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: '你还未登录',
        icon: 'none'
      })
      return
    }
    wx.switchTab({
       url: '/pages/order/order' 
      })
  },
  // 我的收藏
  toCollect() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: '你还未登录',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
       url: '/pages/myCollect/myCollect' 
      })
  },
  // 收货地址
  toAddress() {
    let token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: '你还未登录',
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: '功能暂未开发',
      icon: 'none'
    })
  },
  // 意见反馈
  toFeedback() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: '你还未登录',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
       url: '/pages/feedback/feedback' 
      })
  },
  // 修改个人信息
  toChangeInfo() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: '你还未登录',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: `/pages/changeInfo/changeInfo?user=${JSON.stringify(this.data.userInfo)}`
    })
  },
  // 修改密码
  toChangePwd() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: '你还未登录',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/changePwd/changePwd'
    })
  },
  // 退出登录
  Logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 仅执行前端本地清登录，删除后端logout接口请求
        app.logout()
        // 清空当前页面用户信息，视图立即刷新为未登录
        this.setData({ userInfo: null })
        wx.switchTab({ url: '/pages/mine/mine' })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'http://111.231.33.234:10001',
    username:'',
    password:'',
  },

  getUsername(e){
    this.data.username = e.detail.value
  },

  getPassword(e){
    this.data.password = e.detail.value
  },

  login(){
    let url = this.data.baseUrl + '/prod-api/api/login'
    wx.request({
      url: url,
      method:'POST',
      data:{
        username:this.data.username,
        password:this.data.password
      },
      success:res=>{
        console.log('login',res);
        wx.setStorageSync('token', res.data.token)
        wx.switchTab({
          url: '/pages/mine/mine',
        })
      },
      fail:err=>{
        console.log(err);
      }
    })
  },

  toReg(){
    wx.navigateTo({
      url: '/pages/regist/regist',
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
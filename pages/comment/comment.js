// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: "http://111.231.33.234:10001",
    sellerId: 0,
    score:0,//评论星级
    content: "" // 评价文字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      sellerId: Number(options.sellerId)
    })
  },

  // 输入框同步文字
  inContent(e) {
    this.setData({
       content: e.detail.value 
      })
  },
  // 点击选择星级
  selectStar(e) {
    let star = Number(e.currentTarget.dataset.star)
    this.setData({ score: star })
  },

  // 提交评价
  subComment() {
    let token = wx.getStorageSync('token')
    let url = this.data.baseUrl + '/prod-api/api/takeout/comment'
    // 表单校验
    if (this.data.score === 0) {
      wx.showToast({
         title: '请选择星级', 
         icon: 'none' 
        })
      return
    }
    if (!this.data.content.trim()) {
      wx.showToast({
         title: '请填写评价内容',
          icon: 'none' 
        })
      return
    }

    wx.request({
      url: url,
      method: "POST",
      header: {
        Authorization: token,
        'content-type': 'application/json'
      },
      data: {
        content: this.data.content.trim(),
        orderNo: "TEST001", // 固定测试订单号
        score: this.data.score
      },
      success: res => {
        console.log('subCommentT:',res);
        if (res.data.code === "200") {
          wx.showToast({
             title: '评价成功' ,
             complete: () => {
              wx.navigateBack()
            }
          })
        } else {
          wx.showToast({
             title: res.data.msg,
              icon: 'none' 
            })
        }
      },
      fail: err => {
        console.log('subCommentF',err);
        wx.showToast({ 
          title: '提交失败，请检查网络', 
          icon: 'none'
         })
      }
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
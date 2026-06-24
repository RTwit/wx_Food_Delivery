// pages/myCollect/myCollect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'http://111.231.33.234:10001',
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
    let url = this.data.baseUrl + '/prod-api/api/takeout/collect/list'
    let token = wx.getStorageSync('token')
    wx.request({
      url : url,
      method : 'GET',
      header: {
        Authorization: token
      },
      success: res  =>{
        console.log('collList',res);
        this.setData({
          list: res.data.rows
        })
      }
    })
  },

  //取消收藏
  cancCollect(e){
    let token = wx.getStorageSync('token')
    let collectId = e.currentTarget.dataset.id
    // console.log('e.currentTarget完整对象：', e.currentTarget)
    // console.log('dataset全部：', e.currentTarget.dataset)
    console.log('取消当前收藏id：', collectId)

    let url = this.data.baseUrl + '/prod-api/api/takeout/collect/' + collectId
    console.log('完整删除接口地址：', url)
    wx.request({
      url : url,
      method : 'DELETE',
      header: {
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res  =>{
        console.log('cancCollect',res);
        if(res.data.code == 200){
          wx.showToast({title: '取消成功'})
          this.getCollList()
        }else{
          wx.showToast({title:res.data.msg,icon:'none'})
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
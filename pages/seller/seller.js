// pages/seller/seller.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'http://111.231.33.234:10001',
    allSelList:[],
    schName: ""
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAllSelList()
  },

  //全部商家列表
  getAllSelList(themeId = '', schName = ''){
    //加载中
    this.setData({
       loading: true 
      })
    let url = this.data.baseUrl + '/prod-api/api/takeout/seller/list'
    if(themeId) url += `&themeId=${themeId}`
    if(schName) url += `&name=${schName}`
    wx.request({
      url: url,
      success:res=>{
        console.log('seller', res);
        // const rows = res.data.rows || [];
        this.setData({
          allSelList: res.data.rows,
          loading: false
        })
      },
      fail() {
        this.setData({ loading: false })//隐藏
      }
    })
  },
  // 搜索输入框绑定
  inChange(e) {
    this.setData({
      schName: e.detail.value
    })
  },

  // 点击搜索按钮
  schSeller() {
    this.getAllSelList('', this.data.schName)
  },

  // 点击商家跳详情
  toSellerDet(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/sellerDetail/sellerDetail?id=${id}`
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
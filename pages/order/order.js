// pages/order/order.js
const { get } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    odList:[],
    filList:[],
    currentTab:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getOrderList()
  },

   // 切换
   change(e){
    const idx = e.currentTarget.dataset.index
    this.setData({
      currentTab: Number(idx)
    })
    this.filterOd()
  },
  // 根据选项过滤订单
  filterOd(){
    const tab = this.data.currentTab
    const all = this.data.odList
    let res = []
    if(tab === 0){
      // 全部订单
      res = all
    }else if(tab === 1){
      // 待评价（自行匹配后端状态文字，按需修改判断条件）
      res = all.filter(item=>item.orderStatus.includes('待评价'))
    }else if(tab === 2){
      // 退款/售后
      res = all.filter(item=>item.orderStatus.includes('退款') || item.orderStatus.includes('售后'))
    }
    this.setData({filList:res})
  },

  // 获取订单列表
  getOrderList() {
    get('/api/allorder/list').then(res => {
      console.log('orderlist', res)
      this.setData({
        odList: res.rows
      })
      this.filterOd()
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
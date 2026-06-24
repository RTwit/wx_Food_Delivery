// pages/seller/seller.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'http://111.231.33.234:10001',
    allSelList:[],
    schName: "",
    loading:false,
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAllSelList()
  },

  //全部商家列表
  getAllSelList(){
    //加载中
    this.setData({
       loading: true 
      })
    let url = this.data.baseUrl + '/prod-api/api/takeout/seller/list'
    wx.request({
      url: url,
      success:res=>{
        console.log('allSeller', res);
        this.setData({
          allSelList: res.data.rows,
          loading: false
        })
      },
      fail() {
        this.setData({ loading: false })
        wx.showToast({title:"加载商家失败", icon:"none"})
      }
    })
  },
  // 搜索方法
  schShop(keyword) {
    this.setData({ loading: true })
    let url = this.data.baseUrl + '/prod-api/api/takeout/search?pageNum=1&pageSize=10&keyword=' + keyword
    wx.request({
      url: url,
      success:res=>{
        console.log('搜索商家', res);
        const map = new Map()
        const uniqueShop = res.data.rows.filter(item=>{
          if(map.has(item.id)) return false
          map.set(item.id, true)
          return true
        })
        this.setData({
          allSelList: uniqueShop,
          loading: false
        })
      },
      fail() {
        this.setData({ loading: false })
        wx.showToast({title:"搜索失败", icon:"none"})
      }
    })
  },
  // 搜索输入框绑定
  inChange(e) {
    this.setData({
      schName: e.detail.value
    })
  },
//失去焦点时加载所有商家
  inBlur(){
    if(this.data.schName ==  ''){
      this.getAllSelList()
    }
  },

  // 点击搜索按钮
  schSeller() {
    this.schShop(this.data.schName)
  },

  // 点击商家跳详情
  toSellerDet(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/sellerDet/sellerDet?id=${id}`,
      success : res=>{
        console.log('toSelDet',res);
      },
      fail : err=>{
        console.log(err);
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
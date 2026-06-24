// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'http://111.231.33.234:10001',
    ads:[],
    themeList:[],
    sellerList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getADList()
    this.getThemeList()
    this.getNearSelList()
  },  

  //搜索
  onSearchTap(){
    wx.navigateTo({ url: '/pages/category/category?search=1' })
  },
  //定位点击事件
  selectLocation(){
    wx.showToast({ title: '定位开发中' })
  },

  // 轮播图列表
  getADList(){
    let url = this.data.baseUrl + '/prod-api/api/takeout/rotation/list'
    wx.request({
      url: url,
      success:res=>{
        console.log('ads', res);
        this.setData({
          ads:res.data.rows
        })
      }
    })
  },
  // 轮播图点击
  toAdsTap(e) {
    const item = e.currentTarget.dataset.item
    if (item.servModule === '外卖店家' && item.targetId) {
      wx.navigateTo({ url: `/pages/sellerDet/sellerDet?id=${item.targetId}` })
    }
  },

  // 主题分类列表
  getThemeList(){
    let url = this.data.baseUrl + '/prod-api/api/takeout/theme/list'
    wx.request({
      url: url,
      success:res=>{
        console.log('themes', res);
        this.setData({
          themeList:res.data.data
        })
      }
    })
  },
    // 点击分类
    toThemeTap(e) {
      const theme = e.currentTarget.dataset.theme
      wx.navigateTo({
        url: `/pages/seller/seller?themeId=${theme.id}&themeName=${theme.name}`
      })
    },

    //跳转全部商家页
    toSeller(e){
      console.log('toSeller',e);
      wx.navigateTo({
        url:'/pages/seller/seller'
      })
    },
    // 获取附近商家列表
    getNearSelList() {
      const token = wx.getStorageSync('token')
      let url = this.data.baseUrl + '/prod-api/api/takeout/seller/near'
      // ?pageNum=1&pageSize=10
      wx.request({
        url: url,
        success: res => {
          console.log('nearSel',res);
          this.setData({
            sellerList: res.data.rows
          })  
        },
        fail: () => 
        wx.showToast({
           title: '网络加载失败', 
           icon: 'none'
           })
      })
    },
    //点击查看商家详情
    toSellerDet(e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
         url: `/pages/sellerDet/sellerDet?id=${id}` 
        })
    },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ sellerList: [] });
    this.getADList();
    this.getThemeList();
    this.getSellerList();
    wx.stopPullDownRefresh()
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
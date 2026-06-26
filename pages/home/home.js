// pages/home/home.js
const { get, IMG_BASE_URL } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: IMG_BASE_URL,
    ads:[],
    themeList:[],
    sellerList:[],
    location:"",
    keyword: "",
    isSearching: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getADList()
    this.getThemeList()
    this.getNearSelList()
    this.getLocation()
  },  

  //获取当前定位
  getLocation(){
    get('/api/common/gps/location', {}, { noToken: true }).then(res => {
      console.log('当前地址：', res);
      let locData = res.data
      let addr = locData.province + locData.city + locData.area + locData.location
      this.setData({
        location: addr
      })
    }).catch(err => {
      console.log('获取当前地址错误：', err);
    })
  },

  onSearchInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  onSearchBlur() {
    if (this.data.keyword === '') {
      this.getNearSelList()
      this.setData({ isSearching: false })
    }
  },

  onSearchTap() {
    if (!this.data.keyword.trim()) {
      wx.showToast({ title: '请输入搜索内容', icon: 'none' })
      return
    }
    this.setData({ isSearching: true })
    get(`/api/takeout/search?pageNum=1&pageSize=10&keyword=${this.data.keyword}`, {}, { noToken: true }).then(res => {
      console.log('搜索结果', res)
      let map = new Map()
      let uniqueShop = res.rows.filter(item => {
        if (map.has(item.id)) return false
        map.set(item.id, true)
        return true
      })
      this.setData({
        sellerList: uniqueShop
      })
    }).catch(() => {
      wx.showToast({ title: '搜索失败', icon: 'none' })
    })
  },
  //定位点击事件
  selectLocation(){
    wx.showToast({ title: '定位开发中' })
  },

  // 轮播图列表
  getADList(){
    get('/api/takeout/rotation/list', {}, { noToken: true }).then(res => {
      console.log('ads', res);
      this.setData({
        ads: res.rows
      })
    })
  },
  // 轮播图点击
  toAdsTap(e) {
    let item = e.target.dataset.item
    if (item.servModule === '外卖店家' && item.targetId) {
      wx.navigateTo({ url: `/pages/sellerDet/sellerDet?id=${item.targetId}` })
    }
  },

  // 主题分类列表
  getThemeList(){
    get('/api/takeout/theme/list', {}, { noToken: true }).then(res => {
      console.log('themes', res);
      this.setData({
        themeList: res.data
      })
    })
  },
    // 点击分类
    toThemeTap(e) {
      let theme = e.currentTarget.dataset.theme
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
    get('/api/takeout/seller/near', {}, { noToken: true }).then(res => {
      console.log('nearSel', res);
      this.setData({
        sellerList: res.rows
      })
    })
  },
    // 图片加载失败替换本地默认图
    imgError(e) {
      let idx = e.target.dataset.index
      let key = 'sellerList[' + idx + '].imgUrl'
      this.setData({
        [key]: "/images/pic-default.png"
      })
    },
    //点击查看商家详情
    toSellerDet(e) {
      let id = e.currentTarget.dataset.id
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
// pages/sellerDet/sellerDet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: 'http://111.231.33.234:10001',
    detailInfo: {},
    loading: true,
    catList:[],
    curCatId:0,
    prodList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('跳转携带的商家id options.id：', options.id)
    const sellerId = options.id
    this.getSellerDet(sellerId)
    this.getCatList(sellerId)
  },
  getSellerDet(id) {
    let url = this.data.baseUrl + '/prod-api/api/takeout/seller/' + id
    wx.request({
      url:url,
      success: res => {
        console.log('sellerDet', res);
          this.setData({
            detailInfo: res.data.data,
            loading: false
          })
      },
      fail: () => {
        this.setData({ loading: false })
        wx.showToast({ title: '加载详情失败', icon: 'none' })
      }
    })
  },
  // 获取商家菜品分类
  getCatList(sellerId) {
    let url = this.data.baseUrl + "/prod-api/api/takeout/category/list?sellerId=" + sellerId
    wx.request({
      url : url,
      success: res => {
        console.log('catListT',res);
        let catArr = res.data?.data || []
          this.setData({
            // 兜底：不存在则赋值空数组
            catList: catArr,
            curCatId: catArr.length > 0 ? catArr[0].id : null
          })
          // 默认加载第一个分类菜品
          if(catArr.length > 0){
            this.getProdList(sellerId, catArr[0].id)
          }
      },
      fail:err =>{
        console.log('catListF',err);
      }
    })
  },
   //根据商家id+分类id查询菜品
   getProdList(sellerId, catId) {
    let url = this.data.baseUrl + "/prod-api/api/takeout/product/list?sellerId=" + sellerId + "&categoryId=" + catId
    wx.request({
      url : url,
      success: res => {
        console.log('prodList',res);
        this.setData({ prodList: res.data.data })
      }
    })
  },

  // 切换分类
  switchCat(e) {
    const cid = e.currentTarget.dataset.cid
    const sellerId = this.data.detailInfo.id
    this.setData({ curCatId: cid })
    this.getProdList(sellerId, cid)
  },
  imgError() {
    this.setData({
      "detailInfo.imgUrl": "/images/pic-default.png"
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
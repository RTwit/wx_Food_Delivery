// pages/sellerDet/sellerDet.js
const { get, post, del, IMG_BASE_URL } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: IMG_BASE_URL,
    detailInfo: {},
    loading: true,
    catList:[],
    curCatId:0,
    prodList:[],
    isCollect:false,
    collId:null,
    commentList: [],
    totComment: 0,
    cart: {},
    cartTotalNum: 0,
    cartTotalPrice: '0.00',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('跳转携带的商家id options.id：', options.id)
    const sellerId = options.id
    this.getSellerDet(sellerId)
    this.getCatList(sellerId)
    this.getCommentList(sellerId)
    this.loadCart()
  },
  // 获取商家评论列表
  getCommentList(sellerId) {
    get(`/api/takeout/comment/list?sellerId=${sellerId}`).then(res => {
      console.log('评论commtent:', res)
      this.setData({
        commentList: res.rows,
        commentTotal: res.total
      })
    })
  },

  //跳转评论页
  toComment(){
    wx.navigateTo({
      url: `/pages/comment/comment?sellerId=${this.data.sellerId}`,
    })
  },

  //检验是否收藏商家
  chkCollect(sellerId){
    get(`/api/takeout/collect/check?sellerId=${sellerId}`).then(res => {
      console.log('检验是否收藏:', res)
      this.setData({
        isCollect: res.isCollect,
        collId: res.id || null
      }, () => {
        console.log('赋值后isCollect', this.data.isCollect)
      })
    }).catch(err => {
      console.log('检验是否收藏失败:', err)
    })
  },

  //点击/取消收藏切换
  chgCollect(){
    const token = wx.getStorageSync('token')
    let { isCollect, collId, detailInfo } = this.data
    let sellerId = detailInfo.id
    if (!token) {
      wx.showModal({
        title: '登录提示',
        content: '收藏店铺需要先登录账号，是否去登录？',
        confirmText: '去登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
      return
    }
  
    if (!isCollect) {
      post('/api/takeout/collect', { sellerId: Number(sellerId) }).then(res => {
        console.log('addColl', res)
        wx.showToast({
          title: '收藏成功',
          icon: 'success'
        })
        setTimeout(() => {
          this.chkCollect(sellerId)
        }, 1600)
      })
    } else {
      del(`/api/takeout/collect/${collId}`).then(res => {
        wx.showToast({ title: '已取消收藏' })
        setTimeout(() => {
          this.chkCollect(sellerId)
        }, 1600)
      })
    }
  },

  //获取商家详情
  getSellerDet(id) {
    get(`/api/takeout/seller/${id}`, {}, { noToken: true }).then(res => {
      console.log('sellerDet', res)
      this.setData({
        detailInfo: res.data,
        loading: false
      })
      this.chkCollect(id)
    }).catch(() => {
      this.setData({ loading: false })
    })
  },
  // 获取商家菜品分类
  getCatList(sellerId) {
    get(`/api/takeout/category/list?sellerId=${sellerId}`, {}, { noToken: true }).then(res => {
      console.log('catListT', res)
      let catArr = res.data || []
      this.setData({
        catList: catArr,
        curCatId: catArr.length > 0 ? catArr[0].id : null
      })
      if (catArr.length > 0) {
        this.getProdList(sellerId, catArr[0].id)
      }
    }).catch(err => {
      console.log('catListF', err)
    })
  },
   //根据商家id+分类id查询菜品
  getProdList(sellerId, catId) {
    get(`/api/takeout/product/list?sellerId=${sellerId}&categoryId=${catId}`, {}, { noToken: true }).then(res => {
      console.log('prodList', res)
      const products = res.data.map(item => ({ ...item, qty: 0 }))
      this.setData({ prodList: products })
      this.updateProdQty()
    })
  },

  // 切换分类
  switchCat(e) {
    let cid = e.currentTarget.dataset.cid
    let sellerId = this.data.detailInfo.id
    this.setData({ curCatId: cid })
    this.getProdList(sellerId, cid)
  },

  // 更新菜品数量
  updateProdQty() {
    const cart = this.data.cart
    const prodList = this.data.prodList.map(item => ({
      ...item,
      qty: cart[String(item.id)] || 0
    }))
    this.setData({ prodList: prodList })
  },

  // 增加数量
  increaseQty(e) {
    const id = e.currentTarget.dataset.id
    const prodList = this.data.prodList
    const product = prodList.find(p => p.id === parseInt(id))
    if (!product) return

    const cart = { ...this.data.cart }
    cart[id] = (cart[id] || 0) + 1
    this.updateCart(cart)
  },

  // 减少数量
  decreaseQty(e) {
    const id = e.currentTarget.dataset.id
    const cart = { ...this.data.cart }
    if (cart[id] && cart[id] > 0) {
      cart[id] -= 1
      if (cart[id] === 0) {
        delete cart[id]
      }
      this.updateCart(cart)
    }
  },

  // 更新购物车
  updateCart(cart) {
    const prodList = this.data.prodList
    let totalNum = 0
    let totalPrice = 0

    Object.keys(cart).forEach(id => {
      const num = cart[id]
      const product = prodList.find(p => p.id === parseInt(id))
      if (product) {
        totalNum += num
        totalPrice += num * product.price
      }
    })

    wx.setStorageSync('cart', {
      sellerId: this.data.detailInfo.id,
      sellerName: this.data.detailInfo.name,
      items: cart,
      prodList: prodList
    })

    const updatedProdList = prodList.map(item => ({
      ...item,
      qty: cart[String(item.id)] || 0
    }))

    this.setData({
      cart,
      prodList: updatedProdList,
      cartTotalNum: totalNum,
      cartTotalPrice: totalPrice.toFixed(2)
    })
  },

  // 跳转到购物车
  toCart() {
    if (this.data.cartTotalNum === 0) {
      wx.showToast({ title: '购物车为空', icon: 'none' })
      return
    }
    wx.navigateTo({
      url: '/pages/cart/cart'
    })
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
    this.loadCart()
  },

  // 加载购物车数据
  loadCart() {
    const cartData = wx.getStorageSync('cart') || {}
    const items = cartData.items || {}
    this.updateCart(items)
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
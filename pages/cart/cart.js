// pages/cart/cart.js
const { IMG_BASE_URL } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: IMG_BASE_URL,
    cartData: {},
    cartItems: [],
    cartTotalNum: 0,
    cartTotalPrice: '0.00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadCart()
  },

  onShow() {
    this.loadCart()
  },

  // 加载购物车数据
  loadCart() {
    const cartData = wx.getStorageSync('cart') || {}
    const items = cartData.items || {}
    const prodList = cartData.prodList || []

    let cartItems = []
    let totalNum = 0
    let totalPrice = 0

    Object.keys(items).forEach(id => {
      const qty = items[id]
      const product = prodList.find(p => p.id === parseInt(id))
      if (product && qty > 0) {
        const subtotal = (qty * product.price).toFixed(2)
        cartItems.push({
          ...product,
          qty: qty,
          subtotal: subtotal
        })
        totalNum += qty
        totalPrice += qty * product.price
      }
    })

    this.setData({
      cartData: cartData,
      cartItems: cartItems,
      cartTotalNum: totalNum,
      cartTotalPrice: totalPrice.toFixed(2)
    })
  },

  // 增加数量
  increaseQty(e) {
    const id = e.currentTarget.dataset.id
    const cartData = wx.getStorageSync('cart') || {}
    const items = cartData.items || {}

    items[id] = (items[id] || 0) + 1
    cartData.items = items

    wx.setStorageSync('cart', cartData)
    this.loadCart()
  },

  // 减少数量
  decreaseQty(e) {
    const id = e.currentTarget.dataset.id
    const cartData = wx.getStorageSync('cart') || {}
    const items = cartData.items || {}

    if (items[id] && items[id] > 1) {
      items[id] -= 1
    } else if (items[id]) {
      delete items[id]
    }
    cartData.items = items

    wx.setStorageSync('cart', cartData)
    this.loadCart()
  },

  // 清空购物车
  clearCart() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('cart')
          this.loadCart()
          wx.showToast({ title: '已清空', icon: 'success' })
        }
      }
    })
  },

  // 去结算
  checkout() {
    wx.showToast({
      title: '你已结算',
      icon: 'success'
    })
  },

  // 去选购
  goShopping() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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
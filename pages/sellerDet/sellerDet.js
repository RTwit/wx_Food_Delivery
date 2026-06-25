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
    isCollect:false,
    collId:null,
    commentList: [],
    totComment: 0,
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
  },
  // 获取商家评论列表
  getCommentList(sellerId) {
    let token = wx.getStorageSync('token')
    let url = `${this.data.baseUrl}/prod-api/api/takeout/comment/list?sellerId=${sellerId}`
    wx.request({
      url: url,
      header: {
        Authorization: token,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log('评论commtent:',res);
        if (res.data.code !== "200") {
          wx.showToast({
             title: res.data.msg, 
             icon: 'none' 
            })
          return
        }
        // 赋值评论数据
        self.setData({
          commentList: res.data.rows,
          commentTotal: res.data.total
        })
      },
      fail: (err) => {
        console.log('评论失败:',err);
        wx.showToast({
           title: '加载评论失败，网络异常', 
           icon: 'none' 
          })
      }
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
    let token = wx.getStorageSync('token')
    let url = `${this.data.baseUrl}/prod-api/api/takeout/collect/check?sellerId=${sellerId}`
    wx.request({
      url: url ,
      header:{
        Authorization:token,
        'content-type':'application/x-www-form-urlencoded',
      },
      success: res => {
        console.log('检验是否收藏:', res);
        if(res.data.code == 200){
          console.log('赋值前isCollect', this.data.isCollect)
          this.setData({
            isCollect: res.data.isCollect,
            collId: res.data.id || null
          }, ()=>{
            // setData完成后的回调，打印最新值
            console.log('赋值后isCollect', this.data.isCollect)
          })
        }
      },
      fail: (err) => {
        console.log('检验是否收藏fou:', err);
      }
    })
  },

  //点击/取消收藏切换
  chgCollect(){
    let token = wx.getStorageSync('token')
    let { baseUrl, isCollect, collId, detailInfo } = this.data
    let sellerId = detailInfo.id//取出商家ID
    //登录判断
    if(!token){
      wx.showModal({
        title: '登录提示',
        content: '收藏店铺需要先登录账号，是否去登录？',
        confirmText: '去登录',
        cancelText: '取消',
        success: (res) => {
          // 用户点击确认，跳登录页面
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
      return
    }
  
    // 当前未收藏 → 新增收藏
    if(!isCollect){
      let url = baseUrl + '/prod-api/api/takeout/collect'
      wx.request({
        url: url,
        method:'POST',
        header:{
          Authorization: token,
          'content-type':'application/json',
        },
        data: {
          sellerId: Number(sellerId)
        },
        success:res=>{
          console.log('addColl', res);
          if(res.data.code == 200){
            wx.showToast({
              title: '收藏成功',
              icon: 'success'
            })
            // 延迟1.6秒再查询，避开toast渲染阻塞
            setTimeout(()=>{
              this.chkCollect(sellerId)
            }, 1600)
          }else{
            wx.showToast({
              title: res.data.msg, 
              icon:'none'
            })
          }
        },
        fail:err=>{
          console.log('addColl',err);
        }
      })
    }
    // 当前已收藏 → 取消收藏
    else {
      let url = `${baseUrl}/prod-api/api/takeout/collect/${collId}`
      wx.request({
        url: url,
        method:'DELETE',
        header:{
          Authorization:token,
          'content-type':'application/x-www-form-urlencoded',
        },
        success: res=>{
          if(res.data.code == 200){
            wx.showToast({title:'已取消收藏'})
            setTimeout(()=>{
              this.chkCollect(sellerId)
            },1600)
          }else{
            wx.showToast({
              title:res.data.msg,
              icon:'none'
            })
          }
        },
        fail: err=>{
          console.log('removeColl',err);
        }
      })
    }
  },

  //获取商家详情
  getSellerDet(id) {
    let url = this.data.baseUrl + '/prod-api/api/takeout/seller/' + id
    let self = this
    wx.request({
      url:url,
      success: res => {
        console.log('sellerDet', res);
          this.setData({
            detailInfo: res.data.data,
            loading: false
          })
          // 详情加载完毕，再查询收藏状态
          self.chkCollect(id)
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
    let cid = e.currentTarget.dataset.cid
    let sellerId = this.data.detailInfo.id
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
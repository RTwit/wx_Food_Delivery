const BASE_URL = 'http://111.231.33.234:10001/prod-api'
const IMG_BASE_URL = 'http://111.231.33.234:10001'

const request = (options) => {
  const { url, method = 'GET', data = {}, header = {}, noToken = false } = options

  let defaultHeader = {
    'content-type': method === 'POST' || method === 'PUT' ? 'application/json' : 'application/x-www-form-urlencoded'
  }

  if (!noToken) {
    const token = wx.getStorageSync('token')
    if (token) {
      defaultHeader.Authorization = 'Bearer ' + token
    }
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method,
      data,
      header: { ...defaultHeader, ...header },
      success: (res) => {
        const { statusCode, data: responseData } = res

        if (statusCode === 200) {
          if (responseData.code === 200 || responseData.code === '200') {
            resolve(responseData)
          } else {
            wx.showToast({
              title: responseData.msg || '请求失败',
              icon: 'none'
            })
            reject(responseData)
          }
        } else if (statusCode === 401) {
          wx.showToast({
            title: '登录已过期，请重新登录',
            icon: 'none'
          })
          wx.removeStorageSync('token')
          setTimeout(() => {
            wx.reLaunch({ url: '/pages/login/login' })
          }, 1500)
          reject({ code: 401, msg: '登录已过期' })
        } else if (statusCode === 404) {
          wx.showToast({
            title: '接口不存在',
            icon: 'none'
          })
          reject({ code: 404, msg: '接口不存在' })
        } else if (statusCode === 500) {
          wx.showToast({
            title: '服务器错误',
            icon: 'none'
          })
          reject({ code: 500, msg: '服务器错误' })
        } else {
          wx.showToast({
            title: `请求异常: ${statusCode}`,
            icon: 'none'
          })
          reject({ code: statusCode, msg: `请求异常: ${statusCode}` })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

const get = (url, data = {}, options = {}) => {
  return request({ url, method: 'GET', data, ...options })
}

const post = (url, data = {}, options = {}) => {
  return request({ url, method: 'POST', data, ...options })
}

const put = (url, data = {}, options = {}) => {
  return request({ url, method: 'PUT', data, ...options })
}

const del = (url, data = {}, options = {}) => {
  return request({ url, method: 'DELETE', data, ...options })
}

module.exports = {
  request,
  get,
  post,
  put,
  del,
  IMG_BASE_URL
}
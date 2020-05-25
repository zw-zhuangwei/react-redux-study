import axios from 'axios'
axios.defaults.headers = {}
axios.defaults.timeout = 20000
axios.interceptors.request.use(
  config => {
    if (config.method.toUpperCase === 'GET') {
      if (!config.params) config.params = {}
      config.params._preventCache = new Date().getTime()
    }
    // config.withCredentials = true
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 请求到结果的拦截处理
axios.interceptors.response.use(
  config => {
    return config
  },
  error => {
    let is401 = false
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = `${error.response.data.message}错误请求-400`
          break
        case 401:
          error.message = '未授权，请重新登录-401'
          break
        case 403:
          error.message = '拒绝访问-无权限访问-403'
          break
        case 404:
          error.message = '请求错误,未找到该资源-404'
          break
        case 405:
          error.message = '请求方法未允许-405'
          break
        case 408:
          error.message = '请求超时-408'
          break
        case 500:
          error.message = `${
            error.response.data
              ? error.response.data.message
              : '服务器端出错-500'
          }`
          break
        case 501:
          error.message = '网络未实现-501'
          break
        case 502:
          error.message = '网络错误-502'
          break
        case 503:
          error.message = '服务不可用-503'
          break
        case 504:
          error.message = '网络超时-504'
          break
        case 505:
          error.message = 'http版本不支持该请求-505'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      error.message = '连接到服务器失败'
    }
    if (!is401) {
      alert(error.message)
    }
    //return Promise.reject(error)
  }
)

export default axios

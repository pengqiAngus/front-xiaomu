import axios from 'axios'
import store from '../store'
const service = axios.create({
  // baseURL: import.meta.env.VITE_BASE_API,
  baseURL: '/api',
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 添加 icode
    config.headers.icode = 'AEC2162A22337305 '
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 必须返回 config
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
service.interceptors.response.use((res) => {
  const { success, message, data } = res.data
  if (success) {
    return data
  }
  return Promise.reject(new Error(message))
})
export default service

import axios from 'axios'

const service = axios.create({
  baseURL: 'dev-api', // url = base url + request url
  timeout: 5000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log('%crequests.js line:14 error', 'color: #007acc;', error)
  }
)

// response 拦截器
service.interceptors.response.use((response) => {
  return response.data
})

export default service

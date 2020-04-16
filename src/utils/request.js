import axios from 'axios'


const instance = axios.create({
  baseURL: 'http://training.test.luojigou.vip/'
})

export const createAPI = (url, method, data) => {
  const config = {}
  if (method === 'GET') {
    config.params = data
  } else {
    config.data = data
  }
  return instance({
    url,
    method,
    ...config
  })
}

instance.interceptors.request.use(function (config) {
//   config.headers.Authorization = getItem('token')

  return config
}, function (error) {
  return Promise.reject(error)
})

export default instance

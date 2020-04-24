import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://training.test.luojigou.vip/',
  timeout: 3000
})

export const createAPI = (url, method, data) => {
  const config = {}
  if (method === 'GET') {
    config.params = data
  } else {
    if (method === 'POST' ) {
      config.headers = {
        'Content-Type': 'application/json;charset=UTF-8',
      }
    }
    config.data = data
  }
  return instance({
    url,
    method,
    ...config
  })
}

instance.interceptors.request.use(function (config) {

  return config
}, function (error) {
  return Promise.reject(error)
})

export default instance

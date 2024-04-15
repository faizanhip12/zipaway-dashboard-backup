import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const instance = axios.create({
  // baseURL: 'https://0467-103-104-192-70.ngrok-free.app/api/v1', // Maaz local
  // baseURL: 'http://192.168.0.203:5002/api/v1', // Maaz live
  // baseURL: 'http://192.168.0.42:5002/api/v1', // local
  baseURL: 'https://zipaway.info/api/v1', // live
  timeout: 500000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// 'ngrok-skip-browser-warning': 'any'
// test
// Add a request interceptor
instance.interceptors.request.use(function (config: any) {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

  return {
    ...config,
    headers: {
      authorization: storedToken ? `Bearer ${storedToken}` : null
    }
  }
})

export default instance

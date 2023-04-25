import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { getToken } from '../utils/userTokenCookie'

const getAxiosInstance = (option?: { multi?: boolean }) => {
  const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }

  const instance = axios.create(config)

  // instance.defaults.timeout = 3000

  //요청보낼 때 쿠키에있는 엑세스토큰을 가져와서 헤더에 셋
  instance.interceptors.request.use(
    (request) => {
      const token = getToken()
      if (token) request.headers['Authorization'] = `Bearer ${token}`
      if (option && option.multi) request.headers['Content-Type'] = 'multipart/form-data'
      return request
    },
    (error: AxiosError) => {
      console.log(error)
      return Promise.reject(error)
    },
  )

  return instance
}

export const axiosInstance = getAxiosInstance

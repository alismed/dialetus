import axios from 'axios'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { API_URL } = publicRuntimeConfig

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json'
  }
})

api.interceptors.response.use(
  response => response.data ? response.data : response,
  error => {
    if (error.response && error.response.data)
      return Promise.reject(error.response.data.error)
    return Promise.reject(error)
  }
)

export default api

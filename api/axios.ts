import Axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios"
import { encode as base64Encode } from "base-64"
import { encode as utf8Encode } from "utf8"
import ServerSettingsStore from "~/stores/serverSettingsStore"

const getServerSettings = () => {
  const savedSettings = ServerSettingsStore.getState().getSettings()
  
  return {
    baseURL: savedSettings?.serverURL || process.env.EXPO_PUBLIC_API_URL || '',
    username: savedSettings?.username || process.env.EXPO_PUBLIC_API_USERNAME || '',
    password: savedSettings?.password || process.env.EXPO_PUBLIC_API_PASSWORD || '',
  }
}

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const { username, password, baseURL } = getServerSettings()
  
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders
  }

  if (baseURL && config.baseURL !== baseURL) {
    config.baseURL = baseURL
  }

  const basicAuthToken = base64Encode(utf8Encode(`${username}:${password}`))
  config.headers.authorization = `Basic ${basicAuthToken}`
  config.headers["Content-Type"] = "multipart/form-data" // Very important ! This took me ages to resolve it ;(
  
  return config
}

const { baseURL } = getServerSettings()

export const axios = Axios.create({
  baseURL: baseURL,
})

// Add request interceptor for authentication
axios.interceptors.request.use(authRequestInterceptor)

// Helper function to update axios instance when settings change
export const updateAxiosSettings = () => {
  const { baseURL } = getServerSettings()
  axios.defaults.baseURL = baseURL
}

// axios.interceptors.request.use(request => {
//   console.log('Starting Request', JSON.stringify(request, null, 2))
//   return request
// })

// axios.interceptors.response.use(null, (error) => {
//   console.warn(error.config); // log the request details
//   return Promise.reject(error); // ensure the promise chain keeps failing
// });

// axios.interceptors.response.use(response => {
//   console.log('Response:', JSON.stringify(response.data, null, 2))
//   return response
// })
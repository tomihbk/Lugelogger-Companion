import Axios, {
  AxiosError,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios"
import { encode as base64Encode } from "base-64"
import { encode as utf8Encode } from "utf8"
import ServerSettingsStore from "~/stores/serverSettingsStore"
import { ErrorTracking } from "~/utils/ErrorTracking"

const getServerSettings = () => {
  const savedSettings = ServerSettingsStore.getState().getSettings()

  return {
    baseURL: savedSettings?.serverURL || process.env.EXPO_PUBLIC_API_URL || "",
    username:
      savedSettings?.username || process.env.EXPO_PUBLIC_API_USERNAME || "",
    password:
      savedSettings?.password || process.env.EXPO_PUBLIC_API_PASSWORD || "",
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
  timeout: 15000, // 15 seconds timeout
})

// Add request interceptor for authentication
axios.interceptors.request.use(authRequestInterceptor)

axios.interceptors.response.use(
  (response) => response,

  (error) => {
    if (Axios.isAxiosError(error)) {
      const status = error.response?.status
      const method = error.config?.method?.toUpperCase()
      const endpoint = error.config?.url

      const isNetworkError =
        error.code === "ERR_NETWORK" ||
        error.code === "ECONNABORTED" ||
        !error.response

      const isClientError =
        status !== undefined && status >= 400 && status < 500

      const isServerError =
        status !== undefined &&
        status >= 500 &&
        status !== 502 &&
        status !== 503 &&
        status !== 504

      if (!isNetworkError && !isClientError && isServerError) {
        ErrorTracking.captureException(error, {
          type: "api_error",
          method,
          endpoint,
          status,
        })
      }

      return Promise.reject(error)
    }

    ErrorTracking.captureException(error, {
      type: "unexpected_api_error",
    })

    return Promise.reject(error)
  },
)

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

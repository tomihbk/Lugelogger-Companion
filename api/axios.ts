import assert from "assert"
import Axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios"
import { encode as base64Encode } from "base-64"
import { encode as utf8Encode } from "utf8"

// This ensures environment variables are set
assert(
  process.env.EXPO_PUBLIC_API_URL,
  "env variable not set: EXPO_PUBLIC_API_URL"
)
assert(
  process.env.EXPO_PUBLIC_API_USERNAME,
  "env variable not set: EXPO_PUBLIC_API_USERNAME"
)
assert(
  process.env.EXPO_PUBLIC_API_PASSWORD,
  "env variable not set: EXPO_PUBLIC_API_PASSWORD"
)

const username = process.env.EXPO_PUBLIC_API_USERNAME!
const password = process.env.EXPO_PUBLIC_API_PASSWORD!
const basicAuthToken = base64Encode(utf8Encode(`${username}:${password}`))

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders
  }

  config.headers.authorization = `Basic ${basicAuthToken}`
  config.headers["Content-Type"] = "multipart/form-data" // Very important ! This took me ages to resolve it ;(
  return config
}

export const axios = Axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

// Add request interceptor for authentication
axios.interceptors.request.use(authRequestInterceptor)

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

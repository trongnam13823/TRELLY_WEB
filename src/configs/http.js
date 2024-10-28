import axios from "axios";
import nprogress from "./nprogress";
import useAuth from "@/store/useAuth";
import authApi from "@/api/auth.api";

let refreshTokenPromise = null;

const http = axios.create({
  baseURL: 'http://localhost:9696/',
  withCredentials: true
});

http.interceptors.request.use(
  // Do something before request is sent
  (config) => {
    applyAccessToken(config);

    return config;
  },
  // Do something with request error
  (error) => {
    return Promise.reject(error);
  }
)

http.interceptors.response.use(
  // Do something with response data
  (response) => {
    if(!refreshTokenPromise) nprogress.done()
    
    return response.data
  },
  // Do something with response error
  async (error) => {
    const statusCode = error.response.status
    const message = error.response.data.message

    if (statusCode === 401 && message.includes('expired') && error.config.headers.Authorization) {
      return await handleRefreshToken(error.config)
    }

    if(!refreshTokenPromise) nprogress.done()

    return Promise.reject(error.response.data);
  }
)

function handleRefreshToken(originalRequest) {
  refreshTokenPromise ?? (refreshTokenPromise = authApi.refreshToken())

  refreshTokenPromise
    .then(({ accessToken }) => {
      useAuth.getState().setAccessToken(accessToken)
      originalRequest.headers.Authorization = `Bearer ${accessToken}`
    })
    .catch(() => {
      useAuth.getState().logout()
    })
    .finally(() => {
      refreshTokenPromise = null
    })
    
  return http(originalRequest)
}

function applyAccessToken(config) {
  const accessToken = useAuth.getState().accessToken;
  config.headers.Authorization = accessToken && `Bearer ${accessToken}`
}

export default http;

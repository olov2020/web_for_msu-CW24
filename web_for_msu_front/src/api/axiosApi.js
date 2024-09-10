import axios from "axios";

export const $host = axios.create({
  baseURL:  import.meta.env.VITE_SERVER_BASE_URL,
})

export const $authHost = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
})

const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)
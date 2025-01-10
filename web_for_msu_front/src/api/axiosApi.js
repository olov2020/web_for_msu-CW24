import axios from "axios";
import { LOGIN_ROUTE } from "../routing/consts.js";
import { setNotAuthAction } from "../store/UserReducers.js";
import store from "../store/index.js";

export const $host = axios.create({
  baseURL: 'https://91.105.196.82/api',
});

export const $authHost = axios.create({
  baseURL: 'https://91.105.196.82/api',
});

const authInterceptor = config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const refreshToken = async () => {
  try {
    const response = await $authHost.post('/home/refresh', {
      refresh_token: localStorage.getItem("refreshToken")
    });
    const { access_token } = response.data;
    localStorage.setItem("token", access_token);
    return access_token;
  } catch (error) {
    console.error("Refresh token failed:", error);
    throw error;
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  store.dispatch(setNotAuthAction());
  window.location.href = LOGIN_ROUTE;
};

$authHost.interceptors.request.use(authInterceptor);

/*
$authHost.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return $authHost(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);
        handleLogout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);*/

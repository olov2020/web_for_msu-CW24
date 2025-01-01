import axios from "axios";
import {LOGIN_ROUTE} from "../routing/consts.js";
import {setAuthFromToken, setNotAuthAction} from "../store/UserReducers.js";
import store from "../store/index.js";

export const $host = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

export const $authHost = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

const authInterceptor = config => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor, error => {
  return Promise.reject(error);
});

// Interceptor to handle token refresh
$authHost.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Check if the error is due to token expiration
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const formData = new FormData();
        formData.append("refresh_token", refreshToken);
        const response = await $host.post("/api/home/refresh", formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const newAccessToken = response.data.access_token;

        // Update the token in local storage
        localStorage.setItem("token", newAccessToken);

        // Update the Redux state with the new token
        store.dispatch(setAuthFromToken(newAccessToken));

        // Update the authorization header with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return $authHost(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error (e.g., redirect to login)
        console.error("Refresh token error:", refreshError);
        store.dispatch(setNotAuthAction());
        // Optionally, you can redirect the user to the login page
        window.location.href = LOGIN_ROUTE;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

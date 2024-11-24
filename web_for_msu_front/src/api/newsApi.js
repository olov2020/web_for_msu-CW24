import {$host, $authHost} from './axiosApi.js'
import {jwtDecode} from 'jwt-decode'

export const getAllNews = async () => {
  const response = await $host.get(`/news`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const addNewsItem = async (title, description, photo) => {
  const response = await $authHost.post('/news/create', {title, description, photo}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  localStorage.setItem('token', response.data.accessToken);
  return jwtDecode(response.data.accessToken);
}
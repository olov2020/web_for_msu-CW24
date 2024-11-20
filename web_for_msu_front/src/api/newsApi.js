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

export const addNewsItem = async ({title, description, photo, date}) => {
  const response = await $host.post('/news/create', {title, description, photo, date}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  try {
    localStorage.setItem('token', response.data.accessToken);
    return jwtDecode(response.data.accessToken);
  } catch (error) {
    console.log(error);
  }
}
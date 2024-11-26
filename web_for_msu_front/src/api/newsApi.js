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

export const deleteNewsItem = async ({newsId}) => {
  const response = await $authHost.delete(`/news/delete/${newsId}`);

  if (response.status === 200) {
    return true;
  } else {
    console.log(`error while deleting ${newsId}`);
  }
}
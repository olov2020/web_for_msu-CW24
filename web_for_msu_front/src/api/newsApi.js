import {jwtDecode} from 'jwt-decode'
import axios from "axios";

export const getAllNews = async () => {
  const response = await axios.get(`/api/news`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const addNewsItem = async (title, description, photo) => {
  const response = await axios.post('/api/news/create', {title, description, photo}, {})

  try {
    localStorage.setItem('token', response.data.accessToken);
    return jwtDecode(response.data.accessToken);
  } catch (error) {
    console.log(error);
  }
}

export const deleteNewsItem = async ({newsId}) => {
  const response = await axios.delete(`/api/news/${newsId}`);

  if (response.status === 200) {
    return true;
  } else {
    console.log(`error while deleting ${newsId}`);
  }
}
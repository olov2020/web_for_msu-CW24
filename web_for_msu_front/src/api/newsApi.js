import axios from "axios";
import {$authHost, $host} from "./axiosApi.js";

export const getAllNews = async () => {
  const response = await $host.get(`/api/news`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const addNewsItem = async (title, description, photo) => {
  const formData = new FormData();
  const value = {
    title: title,
    description: description,
  }
  formData.append('data', JSON.stringify(value));
  formData.append('photo', photo);

  formData.forEach((value) => {
    console.log(value)
  })
  const response = await $authHost.post('/api/news/create', formData, {
    headers: {
      "Content-Type": 'multipart/form-data'
    }
  })

  try {
    return response.data;
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
import {$authHost, $host} from "./axiosApi.js";

export const getAllNews = async () => {
  const response = await $host.get(`/news/get_all/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getNewsById = async ({newsId}) => {
  const response = await $host.get(`/news/${newsId}/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const addNewsItem = async (title, description, photo, file) => {
  const formData = new FormData();
  const value = {
    title: title,
    description: description,
  };
  formData.append('data', JSON.stringify(value));
  if (photo) {
    formData.append('photo', photo);
  }
  if (file) {
    formData.append('file', file);
  }

  const response = await $authHost.post('/news/create/', formData, {
    headers: {
      "Content-Type": 'multipart/form-data',
    }
  });
  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
};

export const deleteNewsItem = async ({newsId}) => {
  const response = await $authHost.delete(`/news/${newsId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}
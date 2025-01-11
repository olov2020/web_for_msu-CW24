import {$authHost, $host} from "./axiosApi.js";

export const getAllNews = async () => {
  const response = await $host.get(`/news/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const addNewsItem = async (title, description, photo) => {
  const formData = new FormData();
  const value = {
    title: title,
    description: description,
  };
  formData.append('data', JSON.stringify(value));
  formData.append('photo', photo);

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
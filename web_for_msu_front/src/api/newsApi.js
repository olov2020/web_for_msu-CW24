import {$host, $authHost} from './axiosApi.js'
import {jwtDecode} from 'jwt-decode'

export const getAllNews = async () => {
  const response = await $host.get(`/news`)

  try {
    return response.data;
  } catch (error) {
    console.log(`getAllNews error: ${error}`);
  }
}
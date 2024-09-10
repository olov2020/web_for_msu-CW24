import {$host, $authHost} from './axiosApi.js'
import {jwtDecode} from 'jwt-decode'

export const getScheduleByUserId = async ({userId}) => {
  const {data} = await $authHost.get(`/home/schedule/${userId}`)

  return data
}

export const getUserInfoByUserId = async ({userId}) => {
  const {data} = await $authHost.get(`/home/${userId}`)

  return data
}

export const userLogin = async ({email, password}) => {
  const {data} = await $host.post('/signIn', {email, password}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const userRegistration = async ({email, password, name, surname}) => {
  const {data} = await $host.post('/signUp', {email, password, name, surname}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const refreshToken = async () => {
  const {data} = await $authHost.get('/refreshToken')

  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const userLogout = async () => {
  const {data} = await $authHost.get('/account/logout')
  localStorage.removeItem('token')
  return jwtDecode(data.accessToken)
}
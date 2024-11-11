import {$host, $authHost} from './axiosApi.js'
import {jwtDecode} from 'jwt-decode'
import {REGISTRATION_PUPIL_ROUTE, REGISTRATION_TEACHER_ROUTE} from "../routing/consts.js";

export const addCourseByFile = async ({file}) => {
  const {data} = await $host.post(`/courses/add/${file}`, {
    headers: {
      'content-type': 'application/json'
    }
  })

  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const getCourseByFile = async ({file}) => {
  const {data} = await $authHost.get(`/courses/${file}`)

  return data
}

export const addNewCourse = async (course) => {
  const {data} = await $host.post(`/addNewCourse/${course}`, {
    headers: {
      'content-type': 'application/json'
    }
  })

  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const getAllCourses = async () => {
  const {data} = await $authHost.get(`/courses`)

  return data
}

export const getCoursesByUserId = async ({userId}) => {
  const {data} = await $authHost.get(`/courses/${userId}`)

  return data
}

export const getScheduleByUserId = async ({userId, fromDate, toDate}) => {
  const response = await $authHost.get(`/schedule/${userId}/${fromDate}/${toDate}`)

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export const getUserInfoByUserId = async ({userId}) => {
  const {data} = await $authHost.get(`/home/${userId}`)

  return data
}

export const userChangePhoto = async ({photo}) => {
  const {data} = await $host.post('/account/photo', {photo}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const pupilChangeData = async ({name, surname, lastname, email, phone, school}) => {
  const {data} = await $host.post('/account/data', {name, surname, lastname, email, phone, school}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const teacherChangeData = async ({name, surname, lastname, email, phone, university, work}) => {
  const {data} = await $host.post('/account/data', {name, surname, lastname, email, phone, university, work}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
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

export const pupilRegistration = async (formValues) => {
  const {data} = await $host.post(REGISTRATION_PUPIL_ROUTE, formValues, {
    headers: {
      'content-type': 'application/json'
    }
  })

  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const teacherRegistration = async (formValues) => {
  const {data} = await $host.post(REGISTRATION_TEACHER_ROUTE, formValues, {
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
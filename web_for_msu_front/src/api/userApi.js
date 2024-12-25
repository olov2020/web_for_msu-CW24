import {jwtDecode} from 'jwt-decode'
import {REGISTRATION_PUPIL_ROUTE, REGISTRATION_TEACHER_ROUTE} from "../routing/consts.js";
import axios from "axios";

/*export const getAllRoles = async () => {
  const response = await axios.get(`/api/home/all_roles`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}*/

export const getUserInfoByUserId = async ({userId}) => {
  const response = await axios.get(`/api/home/${userId}`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const userChangePhoto = async ({photo}) => {
  const response = await axios.post('/api/account/photo', {photo}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  try {
    localStorage.setItem('token', response.data.accessToken)
    return jwtDecode(response.data.accessToken)
  } catch (error) {
    console.log(error);
  }
}

export const pupilChangeData = async ({name, surname, lastname, email, phone, school}) => {
  const response = await axios.post('/api/account/data', {name, surname, lastname, email, phone, school}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  try {
    localStorage.setItem('token', response.data.accessToken)
    return jwtDecode(response.data.accessToken)
  } catch (error) {
    console.log(error);
  }
}

export const teacherChangeData = async ({name, surname, lastname, email, phone, university, work}) => {
  const response = await axios.post('/api/account/data', {name, surname, lastname, email, phone, university, work}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  try {
    localStorage.setItem('token', response.data.accessToken)
    return jwtDecode(response.data.accessToken)
  } catch (error) {
    console.log(error);
  }
}

export const userLogin = async ({email, password}) => {
  const response = await axios.post('/api/signIn', {email, password}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  try {
    localStorage.setItem('token', response.data.accessToken)
    return jwtDecode(response.data.accessToken)
  } catch (error) {
    console.log(error);
  }
}

export const pupilRegistration = async (formValues) => {
  const response = await axios.post(`/api/${REGISTRATION_PUPIL_ROUTE}`, formValues, {
    headers: {
      'content-type': 'application/json'
    }
  })

  try {
    localStorage.setItem('token', response.data.accessToken)
    return jwtDecode(response.data.accessToken)
  } catch (error) {
    console.log(error);
  }
}

export const teacherRegistration = async (formValues) => {
  const response = await axios.post(`/api/${REGISTRATION_TEACHER_ROUTE}`, formValues, {
    headers: {
      'content-type': 'application/json'
    }
  })

  try {
    localStorage.setItem('token', response.data.accessToken)
    return jwtDecode(response.data.accessToken)
  } catch (error) {
    console.log(error);
  }
}

export const getDirectoryTeachers = async () => {
  const response = await axios.get('/api/teachers');

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const refreshToken = async () => {
  const response = await axios.get('/api/refreshToken')

  try {
    localStorage.setItem('token', response.data.accessToken)
    return jwtDecode(response.data.accessToken)
  } catch (error) {
    console.log(error);
  }
}

export const userLogout = async () => {
  const response = await axios.get('/api/account/logout');

  try {
    localStorage.setItem('token', response.data.accessToken)
    return jwtDecode(response.data.accessToken)
  } catch (error) {
    console.log(error);
  }
}
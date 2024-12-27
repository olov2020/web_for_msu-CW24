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

export const userLogin = async (email, password) => {
  console.log(email, password);
  const response = await axios.post('/api/home/login', {email, password}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  try {
    localStorage.setItem('token', response.data.access_token)
    localStorage.setItem('refreshToken', response.data.refresh_token)
    console.log(response.data.access_token)
    console.log(response.data.refresh_token)
    return jwtDecode(response.data.access_token)
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const pupilRegistration = async (formValues) => {
  const formData = new FormData();
  const value = {
      "name": "John",
      "surname": "Doe",
      "patronymic": "Ivanovich",
      "birth_date": "2005-05-20",
      "email": "bb@example.com",
      "password": "QWer1234",
      "phone": "+1234567890",
      "school_grade": 10,
      "school": "School No.1",
      "registration_address": "123 Main St",
      "telegram": "@johndoe",
      "vk": "johndoevk",
      "parent1_surname": "Doe",
      "parent1_name": "Jane",
      "parent1_patronymic": "Ivanovna",
      "parent1_phone": "+0987654321",
      "parent1_email": "jane.doe@example.com",
      "mailing": "True"
    };
  formData.append('data', JSON.stringify(value));
  formData.append('image', formValues.photo);
  formData.append('agreement', formValues.agreement);

  const response = await axios.post(`/api/pupil/add_pupil`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  try {
    console.log("Response from server:", response.data);
    return response.status === 200;
  } catch (error) {
    console.log(error);
    return false;
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
import {$authHost, $host} from "./axiosApi.js";
import {setAuthFromToken} from "../store/UserReducers.js";

export const userChangePhoto = async ({photo}) => {
  const formData = new FormData();
  formData.append('photo', photo);
  const response = await $authHost.post('/api/account/photo', formData, {
    headers: {
      'content-type': 'multipart/form-data',
    }
  })

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const pupilChangeData = async (name, surname, lastname, email, phone, school) => {
  const response = await $authHost.post('/api/account/data', {name, surname, lastname, email, phone, school}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  try {
    return response.data
  } catch (error) {
    return new Error(error);
  }
}

export const teacherChangeData = async (name, surname, lastname, email, phone, university, work) => {
  const response = await $authHost.post('/api/account/data', {
    name,
    surname,
    lastname,
    email,
    phone,
    university,
    work
  }, {
    headers: {
      'content-type': 'application/json'
    }
  })

  try {
    return response.data
  } catch (error) {
    return new Error(error);
  }
}

export const userLogin = async (email, password, dispatch) => {
  const response = await $host.post('/api/home/login', {email, password}, {
    headers: {
      'Content-Type': 'application/json',
    }
  })

  try {
    localStorage.setItem('token', response.data.access_token)
    localStorage.setItem('refreshToken', response.data.refresh_token)

    dispatch(setAuthFromToken(response.data.access_token));
    return true;
  } catch (error) {
    return new Error(error);
  }
}

export const pupilRegistration = async (formValues) => {
  const formData = new FormData();
  const value = {
    "name": formValues.name,
    "surname": formValues.surname,
    "patronymic": formValues.lastname,
    "birth_date": formValues.birthDate,
    "email": formValues.email,
    "password": formValues.password,
    "phone": formValues.phone,
    "school_grade": 11 - formValues.schoolEndDate + new Date().getFullYear(),
    "school": formValues.school,
    "registration_address": formValues.registrationAddress,
    "telegram": formValues.telegram,
    "vk": formValues.vk,
    "parent1_surname": formValues.parent1Surname,
    "parent1_name": formValues.parent1Name,
    "parent1_patronymic": formValues.parent1Lastname,
    "parent1_phone": formValues.parent1Phone,
    "parent1_email": formValues.parent1Email,
    "parent2_surname": formValues.parent2Surname,
    "parent2_name": formValues.parent2Name,
    "parent2_patronymic": formValues.parent2Lastname,
    "parent2_phone": formValues.parent2Phone,
    "parent2_email": formValues.parent2Email,
    "mailing": formValues.mailing,
    "how_know": formValues.howToKnow,
  };
  formData.append('data', JSON.stringify(value));
  formData.append('image', formValues.photo);
  formData.append('agreement', formValues.agreement);

  const response = await $host.post(`/api/pupil/add_pupil`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  try {
    return response.status === 200;
  } catch (error) {
    return new Error(error);
  }
}

export const teacherRegistration = async (formValues) => {
  const formData = new FormData();
  const value = {
    "password": formValues.password,
    "email": formValues.email,
    "name": formValues.name,
    "surname": formValues.surname,
    "patronymic": formValues.lastname,
    "birth_date": formValues.birthDate,
    "phone": formValues.phone,
    "telegram": formValues.telegram,
    "vk": formValues.vk,
    "school": formValues.school,
    "school_date_end": formValues.schoolEndDate,
    "university": formValues.university,
    "university_date_end": formValues.universityEndDate,
    "workplace": formValues.work,
    "registration_address": formValues.registrationAddress,
    "was_pupil": formValues.wasPupil,
  };
  formData.append('data', JSON.stringify(value));
  formData.append('image', formValues.photo);
  formData.append('agreement', formValues.agreement);

  const response = await $host.post(`/api/teacher/add_teacher`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  try {
    return response.status === 200;
  } catch (error) {
    return new Error(error);
  }
}

export const getDirectoryTeachers = async () => {
  const response = await $host.get('/api/teachers');

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}
import {$authHost, $host} from "./axiosApi.js";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const getPupilInfo = async () => {
  const response = await $authHost.get('/pupil/get_account_data/');

  try {
    return response.data;
  } catch (error) {
    return new Error(`Failed to fetch user data: ${error}`);
  }
}

export const getTeacherInfo = async () => {
  const response = await $authHost.get('/teacher/get_account_data/');

  try {
    return response.data;
  } catch (error) {
    return new Error(`Failed to fetch user data: ${error}`);
  }
}

export const userLogin = async (email, password) => {
  try {
    const response = await $host.post('/home/login/', {email, password}, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const {access_token, refresh_token} = response.data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('refreshToken', refresh_token);

    const decodedToken = jwtDecode(access_token);

    const fetchPhoto = async (url) => {
      try {
        const response = await axios.get(url, {responseType: 'blob'});
        return response.data;
      } catch (error) {
        console.error('Error fetching the photo:', error);
        throw error;
      }
    };

    const downloadPhoto = async () => {
      try {
        const blob = await fetchPhoto(decodedToken.sub.image);

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          localStorage.setItem('photo', base64data);
        };
      } catch (error) {
        console.error('Error downloading the photo:', error);
      }
    };

    await downloadPhoto();

    return access_token;
  } catch (error) {
    throw new Error(`Login failed: ${error}`);
  }
}

export const pupilChangeData = async (photo, email, phone, school) => {
  const formData = new FormData();
  const value = {
    email: email,
    phone: phone,
    school: school
  };
  formData.append('data', JSON.stringify(value));
  formData.append('image', photo);
  const response = await $authHost.put('/pupil/change_account_data/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  try {
    localStorage.setItem('token', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    return new Error(error);
  }
}

export const teacherChangeData = async (photo, email, phone, university, work) => {
  const formData = new FormData();
  const value = {
    email: email,
    phone: phone,
    university: university,
    work: work,
  };
  formData.append('data', JSON.stringify(value));
  formData.append('image', photo);
  const response = await $authHost.put('/teacher/change_account_data/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  try {
    localStorage.setItem('token', response.data.access_token);
    return response.data.access_token;
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
    "school_grade": formValues.schoolClass,
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

  const response = await $host.post(`/pupil/add_pupil/`, formData, {
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

  const response = await $host.post(`/teacher/add_teacher/`, formData, {
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
  const response = await $host.get('/home/teachers/');

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const changePassword = async (email) => {
  const response = await $host.post(`/home/change_password/${email}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const resetPassword = async (password, accessToken) => {
  const response = await $host.post(`/home/reset_password/${accessToken}/`, {'password': password}, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}
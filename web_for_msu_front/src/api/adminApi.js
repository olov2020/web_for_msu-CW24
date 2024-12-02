import axios from "axios";

export const openRegistrationTests = async () => {
  const response = await axios.post(`/api/admin/registration/open`);

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Регистрация не открыта, произошла ошибка ${response.data.message}`);
}

export const openRegistrationCourses = async () => {
  const response = await axios.post(`/api/admin/courses/open`);

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Запись не открыта, произошла ошибка ${response.data.message}`);
}

export const closeRegistrationCourses = async () => {
  const response = await axios.post(`/api/admin/courses/close`);

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Запись не закрыта, произошла ошибка ${response.data.message}`);
}
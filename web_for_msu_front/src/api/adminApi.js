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

export const getAllApplicants = async () => {
  const response = await axios.get(`/api/admin/list/applicants`);

  try {
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getAllPupils = async () => {
  const response = await axios.get(`/api/admin/list/pupils`);

  try {
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getAllTeachers = async () => {
  const response = await axios.get(`/api/admin/list/teachers`);

  try {
    return response.data;
  } catch (error) {
    return error;
  }
}

export const addPupil = async ({pupilId}) => {
  const response = await axios.post(`/api/admin/add/pupil`, pupilId);

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Ученик не был добавлен, произошла ошибка ${response.data.message}`);
}

export const deletePupil = async ({pupilId}) => {
  const response = await axios.post(`/api/admin/delete/pupil`, pupilId);

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Ученик не был удален, произошла ошибка ${response.data.message}`);
}
import {$authHost} from "./axiosApi.js";

export const openRegistrationCourses = async () => {
  const response = await $authHost.post(`/admin/courses/open`);

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Запись не открыта, произошла ошибка ${response.data.message}`);
}

export const closeRegistrationCourses = async () => {
  const response = await $authHost.post(`/admin/courses/close`);

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Запись не закрыта, произошла ошибка ${response.data.message}`);
}

export const getAllPupils = async () => {
  const response = await $authHost.get(`/admin/list/pupils`);

  try {
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getAllTeachers = async () => {
  const response = await $authHost.get(`/admin/list/teachers`);

  try {
    return response.data;
  } catch (error) {
    return error;
  }
}

export const addPupil = async ({pupilId}) => {
  const response = await $authHost.post(`/admin/add/pupil/${pupilId}`);

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Ученик не был добавлен, произошла ошибка ${response.data.message}`);
}

export const deletePupil = async ({pupilId}) => {
  const response = await $authHost.post(`/admin/delete/pupil/${pupilId}`);

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Ученик не был удален, произошла ошибка ${response.data.message}`);
}

export const addTeacher = async ({teacherId}) => {
  const response = await $authHost.post(`/admin/add/teacher/${teacherId}`);

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Преподаватель не был добавлен, произошла ошибка ${response.data.message}`);
}

export const deleteTeacher = async ({teacherId}) => {
  const response = await $authHost.post(`/admin/delete/teacher/${teacherId}`);

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Преподаватель не был добавлен, произошла ошибка ${response.data.message}`);
}

export const setNewsAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/news/${userId}`);

  return response.status === 200;
}

export const setCourseAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/course/${userId}`);

  return response.status === 200;
}

export const setMarksAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/marks/${userId}`);

  return response.status === 200;
}

export const deleteNewsAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/delete/news/${userId}`);

  return response.status === 200;
}

export const deleteCourseAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/delete/course/${userId}`);

  return response.status === 200;
}

export const deleteMarksAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/delete/marks/${userId}`);

  return response.status === 200;
}


export const setKNRAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/knr/${userId}`);

  return response.status === 200;
}

export const setVSHAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/vsh/${userId}`);

  return response.status === 200;
}

export const setLSHAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/lsh/${userId}`);

  return response.status === 200;
}

export const setTestsOfflineAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/tests_offline/${userId}`);

  return response.status === 200;
}

export const setTestsOnlineAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/tests_online/${userId}`);

  return response.status === 200;
}

export const deleteKNRAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/delete/knr/${userId}`);

  return response.status === 200;
}

export const deleteVSHAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/delete/vsh/${userId}`);

  return response.status === 200;
}

export const deleteLSHAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/delete/lsh/${userId}`);

  return response.status === 200;
}

export const deleteTestsOfflineAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/delete/tests_offline/${userId}`);

  return response.status === 200;
}

export const deleteTestsOnlineAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/delete/tests_online/${userId}`);

  return response.status === 200;
}

export const getAllCoursesIds = async () => {
  const response = await $authHost.get('/admin/courses-ids');

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}
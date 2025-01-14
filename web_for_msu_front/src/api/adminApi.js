import {$authHost} from "./axiosApi.js";

export const openRegistrationCourses = async () => {
  const response = await $authHost.post(`/admin/open_courses_registration/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(`Запись не открыта, произошла ошибка ${error}`);
  }
}

export const closeRegistrationCourses = async () => {
  const response = await $authHost.post(`/admin/close_courses_registration/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(`Запись не закрыта, произошла ошибка ${error}`);
  }
}

export const getAllPupils = async () => {
  const response = await $authHost.get(`/admin/list/pupils/`);

  try {
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getAllTeachers = async () => {
  const response = await $authHost.get(`/admin/list/teachers/`);

  try {
    return response.data;
  } catch (error) {
    return error;
  }
}

export const addPupil = async ({pupilId}) => {
  const response = await $authHost.post(`/admin/add/pupil/${pupilId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(`Ученик не был добавлен, произошла ошибка ${error}`);
  }
}

export const deletePupil = async ({pupilId}) => {
  const response = await $authHost.delete(`/admin/delete/pupil/${pupilId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(`Ученик не был удален, произошла ошибка ${error}`);
  }
}

export const addTeacher = async ({teacherId}) => {
  const response = await $authHost.post(`/admin/add/teacher/${teacherId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(`Преподаватель не был добавлен, произошла ошибка ${error}`);
  }
}

export const deleteTeacher = async ({teacherId}) => {
  const response = await $authHost.delete(`/admin/delete/teacher/${teacherId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(`Преподаватель не был добавлен, произошла ошибка ${error}`);
  }
}

export const makePupilRetired = async ({pupilId}) => {
  const response = await $authHost.post(`/admin/retire/pupil/${pupilId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(`Ученик не был отчислен, произошла ошибка ${error}`);
  }
}

export const recoverPupil = async ({pupilId}) => {
  const response = await $authHost.post(`/admin/recover/pupil/${pupilId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(`Ученик не был восстановлен, произошла ошибка ${error}`);
  }
}

export const setNewsAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/news/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setCourseAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/course/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setMarksAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/marks/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setAuditoryAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/auditory/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const deleteNewsAdmin = async (userId) => {
  const response = await $authHost.delete(`/admin/role/delete/news/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const deleteCourseAdmin = async (userId) => {
  const response = await $authHost.delete(`/admin/role/delete/course/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const deleteMarksAdmin = async (userId) => {
  const response = await $authHost.delete(`/admin/role/delete/marks/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const deleteAuditoryAdmin = async (userId) => {
  const response = await $authHost.delete(`/admin/role/delete/auditory/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}


export const setKNRAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/knr/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setVSHAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/vsh/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setLSHAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/lsh/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setTestsOfflineAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/tests_offline/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setTestsOnlineAdmin = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/tests_online/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setDirectoryTeacher = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/directory/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setSovetTeacher = async (userId) => {
  const response = await $authHost.post(`/admin/role/add/sovet/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const deleteKNRAdmin = async (userId) => {
  const response = await $authHost.delete(`/admin/role/delete/knr/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const deleteVSHAdmin = async (userId) => {
  const response = await $authHost.delete(`/admin/role/delete/vsh/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const deleteLSHAdmin = async (userId) => {
  const response = await $authHost.delete(`/admin/role/delete/lsh/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const deleteTestsOfflineAdmin = async (userId) => {
  const response = await $authHost.delete(`/admin/role/delete/tests_offline/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const deleteTestsOnlineAdmin = async (userId) => {
  const response = await $authHost.delete(`/admin/role/delete/tests_online/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const deleteDirectoryTeacher = async (userId) => {
  const response = await $authHost.delete(`/admin/role/delete/directory/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const deleteSovetTeacher = async (userId) => {
  const response = await $authHost.delete(`/admin/role/delete/sovet/${userId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}


export const downloadDatabase = async () => {
  const response = await $authHost.get('/admin/download/', {
    responseType: 'blob',
  });

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getCoursesAuditoriums = async () => {
  const response = await $authHost.get('/admin/auditoriums/get/');
  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setCoursesAuditoriums = async (formValues) => {

  const response = await $authHost.put(`/admin/auditoriums/`, JSON.stringify(formValues), {
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


export const getAllCoursesIds = async () => {
  const response = await $authHost.get('/admin/courses-ids/');

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}
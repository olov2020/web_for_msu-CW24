import {$authHost, $host} from "./axiosApi.js";

export const getAllCourses = async () => {
  const response = await $host.get(`/api/home/all_courses`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getCoursesSelect = async () => {
  const response = await $authHost.get(`/api/home/select_courses`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getCoursesSelectStatus = async () => {
  const response = await $authHost.get(`/api/home/select_courses/status`)

  return response.status === 200;
}

export const getMyCourses = async () => {
  const response = await $authHost.get(`/api/pupil/my_courses`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getSchedule = async () => {
  const response = await $authHost.get(`/api/home/schedule`)

  try {
    return response.data;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return {};
  }
}

export const getPupilMarksByCourseId = async ({courseId}) => {
  const response = await $authHost.get(`/api/pupil/marks/${courseId}`)

  try {
    return response.data;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return {};
  }
}

export const getTeacherMarksByCourseId = async ({courseId}) => {
  const response = await $authHost.get(`/api/teacher/get_journal/${courseId}`)

  try {
    return response.data;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return {};
  }
}

export const updateTeacherMarksByCourseId = async (courseId, marks) => {

  const response = await $authHost.put(`/api/teacher/update_journal/${courseId}`, marks)

  try {
    return response.data;
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return {};
  }
}

export const courseAdd = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await $authHost.post(`/api/admin/create_course`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Курс не создан, произошла ошибка ${response.data.message}`);
}

export const courseChange = async (id, file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await $authHost.put(`/api/admin/update_course/${id}`, formData)

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Курс не изменен, произошла ошибка ${response.data.message}`);
}

export const approvePupilsOnCourse = async (courseId, pupilId) => {
  const response = await $authHost.put(`/api/teacher/approve_pupils/${courseId}/${pupilId}`);

  try {
    return response.status === 200;
  } catch (error) {
    return new Error(error);
  }
}

export const getAllPupilsOnCourse = async ({courseId}) => {
  const response = await $authHost.get(`/api/courses/get_pupils/${courseId}`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}
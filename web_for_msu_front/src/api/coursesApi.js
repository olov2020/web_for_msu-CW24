import {$authHost, $host} from "./axiosApi.js";

export const getAllCourses = async () => {
  const response = await $host.get(`/home/all_courses`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getCoursesSelect = async () => {
  const response = await $authHost.get(`/home/select_courses`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getCoursesSelectStatus = async () => {
  const response = await $authHost.get(`/home/select_courses/status`)

  return response.status === 200;
}

export const getMyCourses = async () => {
  const response = await $authHost.get(`/pupil/my_courses`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getSchedule = async () => {
  const response = await $authHost.get(`/home/schedule`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getPupilMarksByCourseId = async ({courseId}) => {
  const response = await $authHost.get(`/pupil/marks/${courseId}`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getTeacherMarksByCourseId = async ({courseId}) => {
  const response = await $authHost.get(`/teacher/get_journal/${courseId}`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const updateTeacherMarksByCourseId = async (courseId, marks) => {

  const response = await $authHost.put(`/teacher/update_journal/${courseId}`, marks)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const courseAdd = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await $authHost.post(`/admin/create_course`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })

  try {
    return response.data;
  } catch (error) {
    return new Error(`Курс не создан, произошла ошибка ${error}`);
  }
}

export const courseChange = async (id, file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await $authHost.put(`/admin/update_course/${id}`, formData)

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Курс не изменен, произошла ошибка ${response.data.message}`);
}

export const approvePupilsOnCourse = async (courseId, pupilId) => {
  const response = await $authHost.put(`/teacher/approve_pupils/${courseId}/${pupilId}`);

  try {
    return response.status === 200;
  } catch (error) {
    return new Error(error);
  }
}

export const getAllPupilsOnCourse = async ({courseId}) => {
  const response = await $authHost.get(`/courses/get_pupils/${courseId}`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}
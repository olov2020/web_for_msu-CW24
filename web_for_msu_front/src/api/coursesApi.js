import axios from "axios";

export const getAllCourses = async () => {
  const response = await axios.get(`/api/home/all_courses`)

  try {
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}

export const getCoursesSelect = async () => {
  const response = await axios.get(`/api/home/select_courses`)

  try {
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}

export const getCoursesSelectStatus = async () => {
  const response = await axios.get(`/api/home/select_courses/status`)

  return response.status === 200;
}

export const getMyCourses = async () => {
  const response = await axios.get(`/api/pupil/my_courses`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getSchedule = async () => {
  const response = await axios.get(`/api/home/schedule`)

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export const getPupilMarksByCourseId = async ({courseId}) => {
  const response = await axios.get(`/api/pupil/marks/${courseId}`)

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export const getTeacherMarksByCourseId = async ({courseId}) => {
  const response = await axios.get(`/api/teacher/get_journal/${courseId}`)

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export const updateTeacherMarksByCourseId = async (
  courseId,
  marks) => {


  const response = await axios.put(`/api/teacher/update_journal/${courseId}`, marks)

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export const courseAdd = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`/api/admin/create_course`, formData)

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Курс не создан, произошла ошибка ${response.data.message}`);
}

export const courseChange = async (id, file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.put(`/api/admin/update_course/${id}`, formData)

  if (response.status === 200) {
    return response.data;
  }

  return new Error(`Курс не изменен, произошла ошибка ${response.data.message}`);
}

export const approvePupilsOnCourse = async (courseId, pupilId) => {
  const response = await axios.put(`/api/teacher/approve_pupils/${courseId}/${pupilId}`);

  try {
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
}

export const getAllPupilsOnCourse = async ({courseId}) => {
  const response = await axios.get(`/api/courses/get_pupils/${courseId}`);

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
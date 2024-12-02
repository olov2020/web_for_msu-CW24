import axios from "axios";

export const getAllCourses = async () => {
  const response = await axios.get(`/api/home/all_courses`)

  try {
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
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

/*export const getCourseByFile = async () => {
  const response = await $host.get(`/api/admin/add_from_file`)

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}*/

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
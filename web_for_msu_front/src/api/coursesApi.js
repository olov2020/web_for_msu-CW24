import {$authHost, $host} from "./axiosApi.js";
import {jwtDecode} from "jwt-decode";

export const getAllCourses = async () => {
  const response = await $host.get(`/api/home/all_courses`)

  try {
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getMyCourses = async () => {
  const response = await $host.get(`/api/pupil/my_courses`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getSchedule = async () => {
  const response = await $host.get(`/api/home/schedule`)

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export const getPupilMarksByCourseId = async ({courseId}) => {
  const response = await $host.get(`/api/pupil/marks/${courseId}`)

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export const getTeacherMarksByCourseId = async ({courseId}) => {
  const response = await $host.get(`/api/teacher/get_journal/${courseId}`)

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export const updateTeacherMarksByCourseId = async ({
                                                     courseId,
                                                     dates,
                                                     mark_type_choices,
                                                     mark_types,
                                                     pupils,
                                                     visits,
                                                     averages
                                                   }) => {
  const response = await $host.put(`/api/teacher/update_journal/${courseId}`,
    {
      dates, mark_type_choices, mark_types, pupils, visits, averages
    })

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export const getCourseByFile = async () => {
  const response = await $host.get(`/api/admin/add_from_file`)

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export const courseAdd = async (course) => {
  const response = await $host.post(`/api/admin/create_course`, {course}, {
    headers: {
      'content-type': 'application/json'
    }
  })

  try {
    localStorage.setItem('token', response.data.accessToken)
    return jwtDecode(response.data.accessToken)
  } catch (error) {
    console.log(error)
    return {};
  }
}

export const courseChange = async (id, file) => {
  const response = await $host.put(`/api/course/change/${id}`, {file})

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}
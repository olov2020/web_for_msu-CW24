import {$authHost, $host} from "./axiosApi.js";
import {jwtDecode} from "jwt-decode";

export const getAllCourses = async () => {
  const response = await $host.get(`/home/all_courses`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getMyCourses = async () => {
  const response = await $host.get(`/pupil/my_courses`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getSchedule = async () => {
  const response = await $host.get(`/home/schedule`)

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export const getPupilMarksByCourseId = async ({courseId}) => {
  const response = await $host.get(`/pupil/marks/${courseId}`)

  try {
    return response.data;
  } catch (error) {
    console.log(error)
    return {};
  }
}

export const getTeacherMarksByCourseId = async ({courseId}) => {
  const response = await $host.get(`/teacher/get_journal/${courseId}`)

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
  const response = await $host.put(`/teacher/update_journal/${courseId}`,
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

export const addCourseByFile = async ({file}) => {
  const {data} = await $host.post(`/courses/add/${file}`, {
    headers: {
      'content-type': 'application/json'
    }
  })

  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}

export const getCourseByFile = async ({file}) => {
  const {data} = await $host.get(`/courses/${file}`)

  return data
}

export const addNewCourse = async (course) => {
  const {data} = await $host.post(`/addNewCourse/${course}`, {
    headers: {
      'content-type': 'application/json'
    }
  })

  localStorage.setItem('token', data.accessToken)
  return jwtDecode(data.accessToken)
}
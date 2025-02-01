import {$authHost, $host} from "./axiosApi.js";

export const getAllCourses = async () => {
  const response = await $host.get(`/home/all_courses/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getCourseById = async ({courseId}) => {
  const response = await $host.get(`/home/course/${courseId}/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const checkIfUserIsOnCourse = async ({courseId}) => {
  const response = await $authHost.get(`/home/check_user_on_course/${courseId}/`)

  return response.data;
}

export const getMyCoursesPupil = async () => {
  const response = await $authHost.get(`/pupil/my_courses/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getMyCoursesTeacher = async () => {
  const response = await $authHost.get(`/teacher/my_courses/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getSchedule = async () => {
  const response = await $authHost.get(`/home/schedule/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getPupilMarksByCourseId = async ({courseId}) => {
  const response = await $authHost.get(`/pupil/marks/${courseId}/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getPupilMarksByCourseId2 = async ({courseId}) => {
  const response = await $authHost.get(`/pupil/marks2/${courseId}/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getTeacherMarksByCourseId = async ({courseId}) => {
  const response = await $authHost.get(`/teacher/get_journal/${courseId}/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getTeacherMarksByCourseId2 = async ({courseId}) => {
  const response = await $authHost.get(`/teacher/get_journal2/${courseId}/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const updateTeacherMarksByCourseId = async (courseId, marks) => {
  const response = await $authHost.put(`/teacher/update_journal/${courseId}/`, marks, {
    headers: {
      'Content-Type': 'application/json',
    }
  })

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const updateTeacherMarksByCourseId2 = async (courseId, marks) => {
  const response = await $authHost.put(`/teacher/update_journal2/${courseId}/`, marks, {
    headers: {
      'Content-Type': 'application/json',
    }
  })

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setTeacherResultsByCourseId = async (courseId, results) => {
  const response = await $authHost.patch(`/teacher/update_results/${courseId}/`, results, {
    headers: {
      'Content-Type': 'application/json',
    }
  })

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setTeacherResultsByCourseId2 = async (courseId, results) => {
  const response = await $authHost.patch(`/teacher/update_results2/${courseId}/`, results, {
    headers: {
      'Content-Type': 'application/json',
    }
  })

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}


export const courseAdd = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await $authHost.post(`/admin/create_course/`, formData, {
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
  const response = await $authHost.put(`/admin/update_course/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })

  try {
    return response.data;
  } catch (error) {
    return new Error(`Курс не изменен, произошла ошибка ${error}`);
  }
}


export const getCoursesSelect = async () => {
  const response = await $authHost.get(`/pupil/available_courses/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getCoursesSelectStatus = async () => {
  const response = await $authHost.get(`/home/select_courses/status/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const selectCourses = async (formValues) => {
  const response = await $authHost.post(`/pupil/select_courses/`, JSON.stringify(formValues), {
    headers: {
      'Content-Type': 'application/json',
    }
  })

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}


export const approvePupilsOnCourse = async ({courseId, pupilId}) => {
  const response = await $authHost.put(`/teacher/approve_pupils/${courseId}/${pupilId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const deletePupilsFromCourse = async ({courseId, pupilId}) => {
  const response = await $authHost.delete(`/teacher/delete_pupils/${courseId}/${pupilId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}


export const getAllPupilsOnCourse = async ({courseId}) => {
  const response = await $authHost.get(`/teacher/pupils_list/${courseId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getPupilsOnCourse = async ({courseId}) => {
  const response = await $authHost.get(`/teacher/get_pupil_on_course/${courseId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getPupilsOnCourseToDelete = async ({courseId}) => {
  const response = await $authHost.get(`/teacher/get_pupil_on_course_delete/${courseId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setPupilsOnCourse = async ({courseId, pupilId}) => {
  const response = await $authHost.post(`/teacher/add_pupil_on_course/${courseId}/${pupilId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const deletePupilsOnCourse = async ({courseId, pupilId}) => {
  const response = await $authHost.delete(`/teacher/delete_pupil_on_course/${courseId}/${pupilId}/`);

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}
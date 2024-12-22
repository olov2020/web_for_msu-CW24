import axios from "axios";

export const getEventsTestsOfflineTeachers = async () => {
  const response = await axios.get(`/api/events/tests/offline`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getEventsTestsOnlineTeachers = async () => {
  const response = await axios.get(`/api/events/tests/online`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getStatusRegistrationTests = async () => {
  const response = await axios.get(`/api/events/tests/status`)

  return response.status === 200;
}

export const testsRegistration = async () => {
  const response = await axios.post(`/api/events/tests/registration`);
  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
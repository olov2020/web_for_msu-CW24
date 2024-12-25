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

export const getEventsOpenChampionshipTeachers = async () => {
  const response = await axios.get(`/api/events/open-championship`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getEventsContestScientificWorksTeachers = async () => {
  const response = await axios.get(`/api/events/contest-of-scientific-works`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getEventsResidentialSchoolTeachers = async () => {
  const response = await axios.get(`/api/events/residential-school`)

  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getStatusRegistrationTests = async () => {
  const response = await axios.get(`/api/events/tests/status`)

  return response.data;
}

export const testsRegistration = async (values) => {
  const formData = new FormData();
  formData.append('name', values.name);
  formData.append('surname', values.surname);
  formData.append('lastname', values.lastname);
  formData.append('email', values.email);
  formData.append('phone', values.phone);
  formData.append('classOver', values.classOver);
  formData.append('format', values.format);
  formData.append('city', values.city);
  formData.append('agreementAb', values.agreementAb);
  const response = await axios.post(`/api/events/tests/registration`, formData);
  try {
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
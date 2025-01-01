import {$host} from "./axiosApi.js";

export const getEventsTestsOfflineTeachers = async () => {
  const response = await $host.get(`/api/events/tests/offline`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getEventsTestsOnlineTeachers = async () => {
  const response = await $host.get(`/api/events/tests/online`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getEventsOpenChampionshipTeachers = async () => {
  const response = await $host.get(`/api/events/open-championship`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getEventsContestScientificWorksTeachers = async () => {
  const response = await $host.get(`/api/events/contest-of-scientific-works`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getEventsResidentialSchoolTeachers = async () => {
  const response = await $host.get(`/api/events/residential-school`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getEventsSummerSchoolTeachers = async () => {
  const response = await $host.get(`/api/events/summer-school`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}
export const getEventsSummerCampTeachers = async () => {
  const response = await $host.get(`/api/events/summer-camp`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}


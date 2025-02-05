import {$authHost, $host} from "./axiosApi.js";

export const getEventsTestsOfflineTeachers = async () => {
  const response = await $host.get(`/home/events/tests/offline/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getEventsTestsOnlineTeachers = async () => {
  const response = await $host.get(`/home/events/tests/online/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getEventsContestScientificWorksTeachers = async () => {
  const response = await $host.get(`/home/events/contest-of-scientific-works/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getEventsResidentialSchoolTeachers = async () => {
  const response = await $host.get(`/home/events/residential-school/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getEventsSummerSchoolTeachers = async () => {
  const response = await $host.get(`/home/events/summer-school/`)

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setEventsOpenChampionshipDate = async (dateStart, dateEnd) => {
  const formData = new FormData();
  formData.append('date_start', dateStart);
  formData.append('date_end', dateEnd);
  const response = await $authHost.post('/admin/events/set-date/open-championship/', formData, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getEventsOpenChampionshipDate = async () => {
  const response = await $host.get('/home/events/get-date/open-championship/');

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const setEventsContestScientificWorksDate = async (dateFirst, dateSecond, dateThird) => {
  const formData = new FormData();
  formData.append('date_first', dateFirst);
  formData.append('date_second', dateSecond);
  formData.append('date_third', dateThird);
  const response = await $authHost.post('/admin/events/set-date/contest-scientific-works/', formData, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

export const getEventsContestScientificWorksDate = async () => {
  const response = await $host.get('/home/events/get-date/contest-scientific-works/');

  try {
    return response.data;
  } catch (error) {
    return new Error(error);
  }
}

import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Define all your API calls here
export const loginUser = (email, password) => {
  return axios.post(`${API_URL}/users/login`, { email, password });
};

export const createUser = (userData) => {
  return axios.post(`${API_URL}/users`, userData);
};

export const createCourse = (courseData) => {
  return axios.post(`${API_URL}/courses`, courseData);
};

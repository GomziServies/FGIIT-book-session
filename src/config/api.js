import axios from 'axios';
import apiConfig from './apiConfig';

const BASE_URL = apiConfig.BASE_URL + '/user/v1';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const publicAxiosInstance = axios.create({
  baseURL: apiConfig.BASE_URL + '/public/v1',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authorization = localStorage.getItem('fg_group_user_authorization');

    if (authorization) {
      config.headers['authorization'] = authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

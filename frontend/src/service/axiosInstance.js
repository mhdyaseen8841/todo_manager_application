import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || `http://localhost:4000/api/v1`;

const createAxiosInstance = (baseURL, defaultHeaders = {}) => {
  const instance = axios.create({ baseURL, headers: defaultHeaders });
   setupInterceptors(instance);
  return instance;
};

// Function to setup interceptors
const setupInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.token = `${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

export const USER_INSTANCE = createAxiosInstance(`${baseURL}/user/`, {
  'Content-Type': 'application/json',
});

export const PROJECT_INSTANCE = createAxiosInstance(`${baseURL}/project/`, {
  'Content-Type': 'application/json',
});


export const TODO_INSTANCE = createAxiosInstance(`${baseURL}/todo/`, {
  "Content-Type": "application/json",
});



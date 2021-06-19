import axios from "axios";

const baseURL = "http://localhost:3000/api";

const publicFetch = axios.create({
  baseURL,
});

const privateFetch = axios.create({
  baseURL,
});

privateFetch.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      return Promise.reject(error.message);
    }
  }
);

export { publicFetch, privateFetch };

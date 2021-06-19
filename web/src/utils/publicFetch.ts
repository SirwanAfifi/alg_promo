import axios from "axios";

const publicFetch = axios.create({
  baseURL: "http://localhost:3000/api",
});

publicFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      return Promise.reject(error.message);
    }
  }
);

export { publicFetch };

import axios from "axios";

export const api = axios.create({
  baseURL: "http://107.155.87.217:4000/api",
});


// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (localStorage) {
      const token = localStorage?.getItem('token'); // or get from Zustand, etc.
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
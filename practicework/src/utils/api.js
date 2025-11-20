// src/utils/api.js
import axios from "axios";

// baseURL adjust kar le apne backend ke hisaab se
const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  timeout: 10000,
});

// request interceptor: token & role add karo
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
   
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// optional: response interceptor to handle 401 logout globally
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // optional: clear auth and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      // window.location.href = "/"; // uncomment if you want immediate redirect
    }
    return Promise.reject(error);
  }
);

export default API;

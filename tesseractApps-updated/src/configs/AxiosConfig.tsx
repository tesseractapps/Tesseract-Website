import axios from "axios";

const AxiosConfig = axios.create({
  baseURL: "https://tesseractapps.com",
  // baseURL: "http://localhost:5001",
  withCredentials: true,
  timeout: 10000,
});
// AxiosConfig.interceptors.request.use(
//   (config) => {
//     // Add any request interceptors here if needed
//     return config;
//   },
//   (error) => {
//     // Handle request errors here
//     return Promise.reject(error);
//   }
// );
// AxiosConfig.interceptors.response.use(
//   (response) => {
//     // Add any response interceptors here if needed
//     return response;
//   },
//   (error) => {
//     // Handle response errors here
//     return Promise.reject(error);
//   }
// );
const API = AxiosConfig;
export default API;

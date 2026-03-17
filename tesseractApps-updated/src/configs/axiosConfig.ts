import axios from "axios";

const AxiosConfig = axios.create({
  baseURL: "https://tesseractapps.com",
  // baseURL: "http://localhost:5001",
  withCredentials: true,
  timeout: 10000,
});
const API = AxiosConfig;
export default API;

import axios from "axios";
const instance = axios.create({
  baseURL: "./data",
});
export default instance;

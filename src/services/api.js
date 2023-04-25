import axios from "axios";
const BASE_URL = "https://vanderastra.cyclic.app/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;

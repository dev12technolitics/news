import axios from 'axios'
const BASE_URL = 'https://attractive-jumper-lion.cyclic.app/api/v1'
const api = axios.create({
  baseURL: BASE_URL,
})

export default api

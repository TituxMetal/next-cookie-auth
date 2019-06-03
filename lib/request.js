import axios from 'axios'

const baseUri = '/api/users'

axios.defaults.withCredentials = true
export const register = async data => await axios.post(`${baseUri}/register`, data)
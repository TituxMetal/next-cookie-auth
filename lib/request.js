import axios from 'axios'

const baseUri = '/api/users'

axios.defaults.withCredentials = true
export const register = async data => await axios.post(`${baseUri}/register`, data)

export const login = async data => await axios.post(`${baseUri}/login`, data)

export const getSessionFromClient = async () => {
  const { data } = await axios.get(`${baseUri}/me`)

  return { ...data }
}

export const getSessionFromServer = async req =>
  req.user ? { user: req.user, success: true } : { user: false, success: false }

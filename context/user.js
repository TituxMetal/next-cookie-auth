import { useState, createContext } from 'react'
import Router from 'next/router'

import { register, login } from '../lib'

export const UserContext = createContext()

export const UserProvider = ({ children, pathname }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const initialFields = { name: '', email: '', password: '' }
  const [fields, setFields] = useState(initialFields)
  const [user, setUser] = useState()
  const [error, setError] = useState('')

  const handleChange = event => setFields({ ...fields, [event.target.name]: event.target.value })

  const submitAuth = async authData => {
    try {
      const { data } =
        (pathname === '/register' && (await register(authData))) ||
        (pathname === '/login' && (await login(authData)))

      setFields(initialFields)
      setUser(data.user)
      setIsAuthenticated(true)
      setError('')
      Router.replace('/')
    } catch (e) {
      const msg = (e.response.data && e.response.data.errors) || e.message
      setError(msg)
    }
  }

  return (
    <UserContext.Provider
      value={{ isAuthenticated, fields, setFields, handleChange, submitAuth, error, setError }}>
      {children}
    </UserContext.Provider>
  )
}

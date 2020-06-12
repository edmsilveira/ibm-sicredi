import { useState, useEffect } from 'react'

import api from '../api/api'
import history from '../history'

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
    setLoading(false)
  }, []);
  
  const handleLogin = async (data) => {

    if(data.username == 'admin' && data.password == 'admin') {

      const { data: { token } } = await api.post('/authenticate')
  
      localStorage.setItem('token', JSON.stringify(token))
      api.defaults.headers.Authorization = `Bearer ${token}`
      setAuthenticated(true)
      history.push('/home')
    } else {
      setHasError(true)
    }
    
  }

  const handleLogout = () => {
    setAuthenticated(false)
    setHasError(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    history.push('/')
  }
  
  return { authenticated, loading, hasError, handleLogin, handleLogout }
}

export default useAuth
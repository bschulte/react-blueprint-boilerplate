import { get } from './networking'

export const getToken = () => {
  return localStorage.getItem('authToken')
}

export const setToken = (token) => {
  localStorage.setItem('authToken', `Bearer ${token}`)
}

export const deleteToken = () => {
  localStorage.removeItem('authToken')
}

export const checkAuth = async () => {
  try {
    const response = await get('/users/verify-auth')
    return response.status === 200
  } catch (err) {
    console.log('Error checking user auth')
    return false
  }
}

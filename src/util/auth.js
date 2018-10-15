import { get } from './networking'

export const getToken = () => {
  return localStorage.getItem('authToken')
}

export const checkAuth = async () => {
  const response = await get('/users/verify-auth')
  return response.status === 200
}

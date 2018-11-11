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
    const { data } = await get('/users/verify-auth')
    // Get the email from verify auth. We do this since there can be a page
    // reload where the login page won't be reached (where the email is initially
    // set) and we need to make sure we have the value set in that case.
    return data
  } catch (err) {
    console.log('Error checking user auth')
    return false
  }
}

import { Intent } from '@blueprintjs/core'
import axios from 'axios'
import { getToken } from './auth'
import history from './history'
import { AppToaster } from '../components/AppToaster'

// Generate a query string from an object
const generateUrlQueryParams = (obj) => {
  return Object.entries(obj)
    .map(([key, val]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
    })
    .join('&')
}

// Add the authentication token by default for any request
const setupHeaders = (headers) => ({
  ...headers,
  Authorization: getToken()
})

const checkForUnauthorized = (statusCode) => {
  // Check for unauthorized error to redirect user to /login if seen
  if (statusCode === 401) {
    AppToaster.show({
      message: 'Session expired, please log in',
      intent: Intent.WARNING,
      icon: 'warning-sign'
    })

    history.push('/login')
  }
}

const getOrPut = async (requestType, url, queryParams = {}, headers = {}) => {
  if (!url || !requestType) {
    throw new Error('get request with no URL or request type!')
  }

  let response
  try {
    response = await axios({
      method: requestType.toUpperCase(),
      url,
      params: queryParams,
      headers: setupHeaders(headers)
    })
  } catch (err) {
    console.error('Error performing get request', url, err)
    return null
  }

  checkForUnauthorized(response.status)

  return { data: response.data, status: response.status }
}

// Helper function to issue a GET network request
// "params" should be an object of params to be passed in the query string
export const get = async (url, queryParams = {}, headers = {}) => {
  return getOrPut('get', url, queryParams, headers)
}

// Helper function to issue a PUT network request
// "params" should be an object of params to be passed in the query string
export const put = async (url, queryParams = {}, headers = {}) => {
  return getOrPut('put', url, queryParams, headers)
}

// Helper function to issue a POST network request
// params should be the request body params
export const post = async (url, bodyParams = {}, headers = {}) => {
  if (!url) {
    throw new Error('get request with no URL!')
  }

  const response = await axios.post(`${url}`, bodyParams, {
    method: 'POST',
    headers: setupHeaders(headers)
  })

  checkForUnauthorized(response)

  return { data: response.data, status: response.status }
}

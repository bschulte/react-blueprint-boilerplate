import { Intent } from '@blueprintjs/core'
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
// Helper function to issue a GET network request
// "params" should be an object of params to be passed in the query string
export const get = async (url, params = {}, headers = {}) => {
  if (!url) {
    throw new Error('get request with no URL!')
  }

  const response = await fetch(`${url}?${generateUrlQueryParams(params)}`, {
    method: 'GET',
    headers: setupHeaders(headers)
  })

  checkForUnauthorized(response.status)

  return response
}

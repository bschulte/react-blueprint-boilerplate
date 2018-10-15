import { getToken } from './auth'

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

// Helper function to issue a GET network request
// "params" should be an object of params to be passed in the query string
export const get = (url, params = {}, headers = {}) => {
  if (!url) {
    throw new Error('get request with no URL!')
  }

  return fetch(`${url}?${generateUrlQueryParams(params)}`, {
    method: 'GET',
    headers: setupHeaders(headers)
  })
}

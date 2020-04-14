import 'whatwg-fetch' // for IE and other old browsers support.

const defaultOptions = {
        method: 'GET',
        credentials: 'same-origin'
      },
      defaultHeaders = {
        'Accept': 'application/json'
      }

const jsonFetch = (url, options) => {
  options = Object.assign({}, defaultOptions, options)
  options.headers = Object.assign({}, defaultHeaders, options.headers)
  if(options.body || options.data) options.headers['Content-Type'] = 'application/json; charset=utf-8'
  return fetch(url, options)
    .catch(error => {
      // NOTE: Here we capture network errors, ie; 504 timeouts or 502 bad gateway.
      //      For now we throw so that we have a trace to this point in code.
      throw Object.assign(error, {
        status: 0,
        statusText: 'Cannot connect. Please, make sure you have a running internet connection'
      })
    })
    .then(response => {
      if(response.ok) {
        if(response.status === 204 || response.status === 205) return null
        return response.json()
      }
      // NOTE: Here we handle application errors in here, ie: 4xx errors.
      //      For now we treat them as text even json responses can be received.
      else return response.text().then(text => Promise.reject({status: response.status, responseText: text}))
    })
}

export default jsonFetch

const AUTH_KEY = 'react-admin-token'

function getToken() {
  return localStorage.getItem(AUTH_KEY)
}

function setToken(token:string) {
  localStorage.setItem(AUTH_KEY, token)
}

export {
  getToken,
  setToken
}
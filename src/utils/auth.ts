const AUTH_KEY = 'react-admin-userinfo'

function getUserInfo() {
  return JSON.parse(localStorage.getItem(AUTH_KEY) as string)
}

function setUserInfo(userinfo: any) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(userinfo))
}

function removeUserInfo() {
  localStorage.removeItem(AUTH_KEY)
}

function getToken() {
  return getUserInfo()?.token
}

export {
  getToken,
  getUserInfo,
  setUserInfo,
  removeUserInfo
}
// Constants
import { KEYS } from '../../constants/storage'

// Storage
import { LocalStorage, SessionStorage } from '../../organisms/provider'

function getAuthToken() {
  return LocalStorage.getItem(KEYS.auth) || SessionStorage.getItem(KEYS.auth) || ''
}

function setAuthToken(jwt, persist = false) {
  if(persist) {
    LocalStorage.setItem(KEYS.auth, jwt)
  } else {
    SessionStorage.setItem(KEYS.auth, jwt)
  }
    
  return jwt
}

function removeAuthToken() {
  // Remove Token from both places
  LocalStorage.removeItem(KEYS.auth)
  SessionStorage.removeItem(KEYS.auth)
  
  return true
}

export {
  getAuthToken,
  setAuthToken,
  removeAuthToken
}
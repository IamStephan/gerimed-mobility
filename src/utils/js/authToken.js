// Constants
import { KEYS } from '../../constants/storage'

function getAuthToken() {
  // Gatsby SSR
  // Cannot get token
  if(typeof window === 'undefined') return null

  try {
    return window.localStorage.getItem(KEYS.auth) || window.sessionStorage.getItem(KEYS.auth) || ''
  } catch(e) {
    console.log(e)

    // Unable to get token
    return null
  }
}

function setAuthToken(jwt, persist = false) {
  // Gatsby SSR
  // Cannot set token
  if(typeof window === 'undefined') return null

  try {
    if(persist) {
      window.localStorage.setItem(KEYS.auth, jwt)
    } else {
      window.sessionStorage.setItem(KEYS.auth, jwt)
    }
    
    return jwt
  } catch(e) {
    console.log(e)

    // Unable to set token
    return null
  }
}

function removeAuthToken() {
  // Gatsby SSR
  // Cannot set token
  if(typeof window === 'undefined') return null

  try {
    // Remove Token from both places
    window.localStorage.removeItem(KEYS.auth)
    window.sessionStorage.removeItem(KEYS.auth)
    
    return true
  } catch(e) {
    console.log(e)

    // Unable to set token
    return null
  }
}

export {
  getAuthToken,
  setAuthToken,
  removeAuthToken
}
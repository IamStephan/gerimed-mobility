import {  useState } from 'react'
import { useLocalStorage, useSessionStorage } from 'react-use'

/**
 * The goal is to get the token
 * and remove the token easily regardless
 * of where it is stored
 * 
 * NOTE:
 * =====
 * The prefered method of storing the
 * token should be session and the user has
 * to explicitly choose to save it for
 * later logins.
 * 
 * local and session storage slightly differs.
 * so when the user logs out just set their values
 * to null, the browser can handle clean ups
 * and if the user logs out, no meaningful
 * data is left behind
 */

export function useToken(key) {
  const [tokenLocal, setTokenLocal] = useLocalStorage(key)
  const [tokenSession, setTokenSession] = useSessionStorage(key)

  // Internal Reference
  const [token, setToken] = useState(getInitialState)

  // Get the initial state on first render
  function getInitialState() {
    // first check the prefered method
    if(tokenSession) {
      return {
        token: tokenSession,
        remeber: false
      }
    } else if(tokenLocal) {
      return {
        token: tokenLocal,
        remeber: true
      }
    }

    return {
      token: null,
      remember: null
    }
  }
  
  /**
   * This deletes the token regardless
   * of whether its store in local or
   * session storage
   */
  function deleteToken() {
    setTokenLocal(null)
    setTokenSession(null)
  }

  /**
   * This first deletes the tokens from
   * storage to make sure its a clean slate,
   * then it sets the token based on the choosen
   * method (or Default)
   */
  function saveToken(token, remeber=false) {
    deleteToken()

    if(remeber) {
      setTokenLocal(token)

      setToken({
        token: tokenLocal,
        remember: true
      })
    } else {
      setTokenSession(token)

      setToken({
        token: tokenSession,
        remember: false
      })
    }
  }

  return {
    info: token,
    deleteToken,
    saveToken
  }
}
import React from "react"

// Hooks
import { useLocalStorage } from 'react-use'

// Constants
import { KEYS } from '../../constants/localStorage'

// Gatsby
import { navigate } from "gatsby"

const PrivateRoute = ({ component: Component, ...rest }) => {

  const [value] = useLocalStorage(KEYS.jwt)

  // Ckeck The validity of the token in an auth service
  if (!value) {
    navigate("/profile/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute

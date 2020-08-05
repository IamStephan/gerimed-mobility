import React from "react"

// Gatsby
import { navigate } from "gatsby"

const PrivateRoute = ({ component: Component, location, ...rest }) => {

  // Do a auth check to login client
  // Temp redirect
  if (true) {
    // !Should be login NOT signup!
    navigate("/profile/signup")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute

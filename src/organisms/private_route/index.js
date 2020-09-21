import React, { useEffect } from "react"

// Controller
import { LocalController } from './controller'

// Hooks
import { useMachine } from '@xstate/react'

// Pages
import Loader from '../../pages/loader'

/**
 * Used only for the profile page
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  const [current, send] = useMachine(LocalController)

  const show = current.matches('authorized')

  switch(true) {
    case show: {
      return  (
        <Component
          send={send}
          {...rest}
        />
      )
    }

    default: {
      return null
    }
  }
}

export default PrivateRoute

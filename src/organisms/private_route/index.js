import React, { createContext } from "react"

// Hooks
import { useMachine } from '@xstate/react'

// Controller
import { LocalController } from './controller'

// Pages
import Loader from '../../pages/loader'

// Context
export const UserInfo = createContext()

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [current] = useMachine(LocalController)

  switch(true) {
    // Waterfall
    case current.matches('ready'): 
    case current.matches('loadUserInfo') && !current.context.staleLoad:{
      return null
    }

    case current.matches('loadUserInfo') && current.context.staleLoad: {
      return <Loader />
    }

    case current.matches('authorized'): {
      return (
        <UserInfo.Provider
          value={{
            info: current.context.userInfo
          }}
        >
          <Component {...rest} />
        </UserInfo.Provider>
      )
    }

    default: {
      /**
       * STATE MACHINES!!!!!
       * state will never reach this, but eslint will complain and
       * i still want this here
       */
      return null
    }
  }
}

export default PrivateRoute

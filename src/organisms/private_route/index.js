import React, { useEffect } from "react"

// Gatsby
import { navigate } from 'gatsby'

// Auth Controller
import { AuthService } from '../../organisms/provider'

// Hooks
import { useService } from '@xstate/react'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [current, send] = useService(AuthService)

  useEffect(() => {
    if(current.matches({ idle: 'guest' })) {
      navigate('/profile/login', {
        replace: true
      })
    }
  }, [current.value]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(current.matches({ idle: 'user' }) && !current.context?.user) {
      send('GET_ME')
    }
  }, [current.value]) // eslint-disable-line react-hooks/exhaustive-deps

  const isGuest = current.matches({ idle: 'guest' })

  if(isGuest) {
    return null
  }

  return  (
    <Component
      send={send}
      {...rest}
    />
  )
    
}

export default PrivateRoute

import React from 'react'

// Router
import { Router } from '@reach/router'

// Templates
import Register from '../../client_pages/register'
import Login from '../../client_pages/login'
import ProfileTemplate from '../../client_pages/profile'

// Components
import PrivateRoute from '../../organisms/private_route'

const Profile = () => {
  if(typeof window === 'undefined') return null

  return (
    <Router
      basepath='/profile'
    >
      <PrivateRoute
        component={ProfileTemplate}
        path='/'
      />
      <Register path='/register' />
      <Login path='/login' />
    </Router>
  )
}

export default Profile

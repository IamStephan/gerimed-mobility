import React from 'react'

// Router
import { Router } from '@reach/router'

// Templates
import Register from '../../templates/register'
import Login from '../../templates/login'
import ProfileTemplate from '../../templates/profile'

// Components
import PrivateRoute from '../../components/privateRoute'

const Profile = () => {
  return (
    <Router
      basepath='/profile'
    >
      <PrivateRoute
        component={ProfileTemplate}
        path='/'
      />
      <Register path='/register' />
      <Login path='/login/*' />
    </Router>
  )
}

export default Profile

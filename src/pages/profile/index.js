import React from 'react'

// Router
import { Router } from '@reach/router'

// Templates
import Register from '../../templates/register'

// Components

const Profile = () => {
  return (
    <Router
      basepath='/profile'
    >
      <Register path='/register' />
    </Router>
  )
}

export default Profile

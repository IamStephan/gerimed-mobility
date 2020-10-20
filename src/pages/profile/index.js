import React from 'react'

// Router
import { Router } from '@reach/router'

// Templates
import Register from '../../client_pages/register'
import Login from '../../client_pages/login'
import ForgotPassword from '../../client_pages/password_forgot'
import ResetPassword from '../../client_pages/password_reset'
import ProfileTemplate from '../../client_pages/profile'

// Components
import PrivateRoute from '../../organisms/private_route'

// SEO
import SEO from '../../molecules/seo'

const Profile = () => {
  if(typeof window === 'undefined') return null

  return (
    <>
      <SEO
        title='Profile'
        description='Gerimed Mobility Home'
      />

      <Router
        basepath='/profile'
      >
        <Register path='/register' />
        <Login path='/login' />
        <ForgotPassword path='/forgot' />
        <ResetPassword path='/reset' />

        <PrivateRoute
          component={ProfileTemplate}
          path='/*'
        />
      </Router>
    </>
    
  )
}

export default Profile

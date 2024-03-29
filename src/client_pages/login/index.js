import React from 'react'

// Styles
import styles from './styles.module.scss'

// Sections
import LoginSection from '../../sections/login'
import AuthShowcase from '../../sections/authShowcase'

// Constants
import { PAGES } from '../../constants/pages'


const Login = () => {
  return (
    <div
      className={styles['login']}
    >
      <LoginSection />
      <AuthShowcase page={PAGES.login} />
    </div>
  )
}

export default Login
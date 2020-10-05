import React from 'react'

// Styles
import styles from './styles.module.scss'

// Sections
import ForgotSection from '../../sections/forgot'
import AuthShowcase from '../../sections/authShowcase'

// Constants
import { PAGES } from '../../constants/pages'

const Login = () => {
  return (
    <div
      className={styles['forgot']}
    >
      <ForgotSection />
      <AuthShowcase page={PAGES.login} />
    </div>
  )
}

export default Login
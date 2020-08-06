import React from 'react'

// Styles
import styles from './styles.module.scss'

// Sections
import LoginSection from '../../sections/login'
import AuthShowcase from '../../sections/authShowcase'


const Login = () => {
  return (
    <div
      className={styles['login']}
    >
      <LoginSection />
      <AuthShowcase page='login' />
    </div>
  )
}

export default Login
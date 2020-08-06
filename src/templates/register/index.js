import React from 'react'

// Styles
import styles from './styles.module.scss'

// Sections
import RegisterSection from '../../sections/register'
import AuthShowcase from '../../sections/authShowcase'


const Register = () => {
  return (
    <div
      className={styles['register']}
    >
      <RegisterSection />
      <AuthShowcase page='register' />
    </div>
  )
}

export default Register

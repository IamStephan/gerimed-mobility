import React from 'react'

// Styles
import styles from './styles.module.scss'

// Sections
import RegisterSection from '../../sections/register'
import AuthShowcase from '../../sections/authShowcase'

// Constants
import { PAGES } from '../../constants/pages'

const Register = () => {
  return (
    <div
      className={styles['register']}
    >
      <RegisterSection />
      <AuthShowcase page={PAGES.register} />
    </div>
  )
}

export default Register

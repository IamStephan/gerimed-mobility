import React from 'react'

// Styles
import styles from './styles.module.scss'

// Sections
import ResetPasswordSection from '../../sections/resetPassword'
import AuthShowcase from '../../sections/authShowcase'

// Constants
import { PAGES } from '../../constants/pages'


const ResetPassword = () => {
  return (
    <div
      className={styles['passwordReset']}
    >
      <ResetPasswordSection />
      <AuthShowcase page={PAGES.passwordReset} />
    </div>
  )
}

export default ResetPassword
import React from 'react'

// Material
import { Typography, Button, LinearProgress } from '@material-ui/core'

// Hooks
import { useService } from '@xstate/react'

// Auth Controller
import { AuthService } from '../../../../organisms/provider'

// Template
import TabTemplate from '../../components/tabTemplate'

// Gatsby
import { navigate } from 'gatsby'

// Styles
import styles from './styles.module.scss'

const Settings = () => {
  const [current, send] = useService(AuthService)

  const loading = current.matches('loading') || !current.context.user

  function _handleLogout() {
    send('LOGOUT')
  }

  return (
    <TabTemplate
      title='Settings'
    >
      {
        loading ? (
          <LinearProgress
            color='secondary'
          />
        ) : null
      }
      <div
        className={styles['settings']}
      >
        <div
          className={styles['row']}
        >
          <div
            className={styles['left']}
          >
            <Typography
              className={styles['caption']}
            >
              Your Account
            </Typography>
          </div>

          <div
            className={styles['right']}
          >
            <Button
              disableElevation
              variant='contained'
              color='inherit'
              className={styles['CButton']}
              onClick={_handleLogout}
              disabled={loading}
            >
              Logout
            </Button>
          </div>
        </div>

        {/**
         * NOTE:
         * =====
         * I do not know what the demand for a reset password is
         * and its probably best to see the demand for it and update
         * the website if the demand increases
         */}
        {/* <div
          className={styles['row']}
        >
          <div
            className={styles['left']}
          />

          <div
            className={styles['right']}
          >
            <Button
              disableElevation
              variant='outlined'
              color='inherit'
              className={styles['OButton']}
              onClick={_handleResetPassword}
              disabled={loading}
            >
              Reset Password
            </Button>
          </div>
        </div> */}
      </div>
    </TabTemplate>
  )
}

export default Settings

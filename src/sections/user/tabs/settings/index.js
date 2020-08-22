import React, { useState } from 'react'

// Material
import { Typography, Button, LinearProgress } from '@material-ui/core'

// Gatsby
import { navigate } from 'gatsby'

// Hooks
import { useToken } from '../../../../hooks/useToken'
import { useSnackbar } from 'notistack'

// Constants
import { KEYS } from '../../../../constants/localStorage'

// State
import { useGlobalState } from '../../../../state/profile'

// API
import { RequestPasswordReset } from '../../../../api/auth'

// Template
import TabTemplate from '../../components/tabTemplate'

// Styles
import styles from './styles.module.scss'

const Settings = props => {
  const {
    site
  } = props

  const [submitting, setSubmitting] = useState(false)
  const { deleteToken } = useToken(KEYS.jwt)
  const [info] = useGlobalState('info')

  const { enqueueSnackbar } = useSnackbar()

  /**
   * NOTE:
   * =====
   * I honestly feel like i need to implement this on my
   * own in strapi
   */
  function logout() {
    deleteToken()
    navigate('/')
  }

  async function resetPass() {
    setSubmitting(true)

    const results = await RequestPasswordReset({
      protocol: site.siteMetadata.protocol,
      server: site.siteMetadata.server,
      port: site.siteMetadata.port
    }, {
      email: info.email
    })

    results.notis.forEach(({ message }) => {
      enqueueSnackbar(message, {
        variant: results.type
      })
    })

    setSubmitting(false)
  }

  return (
    <TabTemplate
      title='Settings'
    >
      {
        submitting ? (
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
              onClick={logout}
              disabled={submitting}
            >
              Logout
            </Button>
          </div>
        </div>

        <div
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
              onClick={resetPass}
              disabled={submitting}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </div>
    </TabTemplate>
  )
}

export default Settings

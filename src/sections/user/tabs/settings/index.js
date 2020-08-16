import React from 'react'

// Material
import { Typography, Button, Switch } from '@material-ui/core'

// Gatsby
import { navigate } from 'gatsby'

// Hookes
import { useLocalStorage } from 'react-use'

// Constants
import { KEYS } from '../../../../constants/localStorage'

// Template
import TabTemplate from '../../components/tabTemplate'

// Styles
import styles from './styles.module.scss'

const Settings = () => {
  const [v, s, removeToken] = useLocalStorage(KEYS.jwt)
  /**
   * NOTE:
   * =====
   * I honestly feel like i need to implement this on my
   * own in strapi
   */
  function logout() {
    removeToken()
    navigate('/')
  }

  return (
    <TabTemplate
      title='Settings'
    >
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
              Newsletter
            </Typography>
          </div>

          <div
            className={styles['right']}
          >
            <Switch
              disabled
              checked={true}
              color='secondary'
            />
          </div>
        </div>

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

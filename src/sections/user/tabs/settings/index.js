import React, { useState } from 'react'

// Material
import { Typography, Button, Switch } from '@material-ui/core'

// Gatsby
import { navigate } from 'gatsby'

// Hookes
import { useLocalStorage } from 'react-use'

// Constants
import { KEYS } from '../../../../constants/localStorage'

// State
import { useGlobalState } from '../../../../state/profile'

// API
import axios from 'axios'

// Template
import TabTemplate from '../../components/tabTemplate'

// Styles
import styles from './styles.module.scss'

const Settings = props => {
  const {
    site,
    setNotis,
  } = props

  const [submitting, setSubmitting] = useState(false) 

  const [v, s, removeToken] = useLocalStorage(KEYS.jwt)

  const [info] = useGlobalState('info')

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

  function resetPass() {
    setSubmitting(true)

    axios.post(`${site.siteMetadata.protocol}://${site.siteMetadata.server}:${site.siteMetadata.port}/auth/forgot-password`, {
      email: info.email
    }).then(() => {
      setNotis([{
        id: Math.random(),
        title: 'Success',
        type: 'success',
        message: 'Please check your email for the reset link.'
      }])

      setSubmitting(false)
    }).catch((e) => {
      // Client error to server
      if(e.response) {
        const errors = e.response?.data?.message[0]?.messages

        const listOfErrors = []
        
        for(let i = 0; i < errors?.length; i++) {
          listOfErrors.push({
            id: errors[i].id,
            title: 'Error',
            type: 'error',
            message: errors[i].message
          })
        }

        setNotis(listOfErrors)
      } else {
        // unhandled Errors
        setNotis([{
          id: Math.random(),
          title: 'Error',
          type: 'error',
          message: e.message
        }])
      }
      
      setSubmitting(false)
    })
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

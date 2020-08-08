import React, { useState } from 'react'

// Components
import NotificationCenter from '../../components/notifications'

// SVGs
import Logo from '../../svg/logo_green.svg'

// Hooks
import { useLocalStorage } from 'react-use'
import { useForm } from 'react-hook-form'

// Schema
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

// Gatsby
import { Link, navigate, useStaticQuery, graphql } from 'gatsby'

// Material
import { TextField, Button, Divider, Typography } from '@material-ui/core'

// API
import axios from 'axios'

// Constants
import { KEYS } from '../../constants/localStorage'

// Styles
import styles from './styles.module.scss'

// Schema Definition
const loginShema = yup.object().shape({
  identifier: yup.string().email().required(),
  password: yup.string().required()
})

/**
 * NOTE:
 * =====
 * for now just use alert to show the errors
 */
const LoginSection = () => {
  // Meta info
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            server
            port
          }
        }
      }
    `
  )

  // The form and its validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginShema)
  })

  // Shows user is submitting the form
  const [submitting, setSubmitting] = useState(false)

  // Errors
  const [notis, setNotis] = useState([])

  // Used to store the jwt token
  const [_, setToken] = useLocalStorage(KEYS.jwt)

  function _handleSubmit(data) {
    setSubmitting(true)
    setNotis([])

    axios.post(`http://${site.siteMetadata.server}:${site.siteMetadata.port}/auth/local`, {
      identifier: data.identifier,
      password: data.password
    }).then((v) => {
      setToken(v.data.jwt)
      setSubmitting(false)

      // Navigate to the profile page
      navigate('/profile')
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

  function _removeNoti(id) {
    setNotis(notis.filter(v => v.id !== id))
  }

  return (
    <>
      <NotificationCenter
        notifications={notis}
        removeNoti={_removeNoti}
      />
      <section
        className={styles['loginSection']}
      >
        <div
          className={styles['loginContainer']}
        >
          <div
            className={styles['logoContainer']}
          >
            <Link
              to='/'
            >
              <Logo />
            </Link>
          </div>

          <div
            className={styles['titleContainer']}
          >
            <Typography
              variant='h3'
              color='secondary'
              className={styles['title']}
            >
              Login
            </Typography>
          </div>

          <form
            noValidate
            className={styles['form']}
            onSubmit={handleSubmit(_handleSubmit)}
          >
            <div
              className={styles['input']}
            >
              <TextField
                inputRef={register}
                type='emial'
                label='Email'
                name='identifier'
                variant='outlined'
                color='secondary'
                error={errors.identifier}
                helperText={errors.identifier?.identifier}
                required
              />
            </div>

            <div
              className={styles['input']}
            >
              <TextField
                inputRef={register}
                type='password'
                label='Password'
                name='password'
                variant='outlined'
                color='secondary'
                error={errors.password}
                helperText={errors.password?.message}
                required
              />
            </div>

            <div
              className={styles['input']}
            >
              <Button
                disableElevation
                type='submit'
                variant='contained'
                color='secondary'
                disabled={submitting}
              >
                Login
              </Button>
            </div>
          </form>

          <br />
          <Divider />
          <br />
          
          <div
            className={styles['alternate']}
          >
            <Button
              variant='outlined'
              color='secondary'
              component={Link}
              to='/profile/register'
              fullWidth
            >
              Create a new account
            </Button>
          </div>

          <div
            className={styles['alternate']}
          >
            <Button
              variant='text'
              color='secondary'
              component={Link}
              to='/profile/register'
              fullWidth
            >
              Forgot Password
            </Button>
          </div>
        </div>
      </section>
    </>

  )
}

/**
 * NOTES:
 * ======
 * Keep in mind that this section is not
 * meant for reuse in othe pages
 */

export default LoginSection

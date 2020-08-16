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
const registerShema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*\d)/g, 'Password must contain at least one number')
    .matches(/(?=.*[A-Z])/g, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*[a-z])/g, 'Password must contain at least one lowercase letter')
    .required(),
  confirmPassword: yup.string().oneOf([ yup.ref('password'), null ], ' Passwords do not match').required('')
})

/**
 * NOTE:
 * =====
 * for now just use alert to show the errors
 */
const RegisterSection = () => {
  // Meta info
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            protocol
            server
            port
          }
        }
      }
    `
  )

  // The form and its validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(registerShema)
  })

  // Shows user is submitting the form
  const [submitting, setSubmitting] = useState(false)

  // Errors
  const [notis, setNotis] = useState([])

  // Used to store the jwt token
  const [_, setToken] = useLocalStorage(KEYS.jwt)

  function _handleSubmit(data) {
    setSubmitting(true)
    axios.post(`${site.siteMetadata.protocol}://${site.siteMetadata.server}:${site.siteMetadata.port}/auth/local/register`, {
      username: `${data.firstName.toLowerCase()}-${data.lastName.toLowerCase()}-${data.email.toLowerCase()}`,
      email: data.email,
      password: data.password,
      'first_name': data.firstName,
      'last_name': data.lastName
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
        className={styles['registerSection']}
      >
        <div
          className={styles['registerContainer']}
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
              Register
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
                label='First Name'
                name='firstName'
                variant='outlined'
                color='secondary'
                error={errors.firstName}
                helperText={errors.firstName?.message}
                required
              />
            </div>

            <div
              className={styles['input']}
            >
              <TextField
                inputRef={register}
                label='Last Name'
                name='lastName'
                variant='outlined'
                color='secondary'
                error={errors.lastName}
                helperText={errors.lastName?.message}
                required
              />
            </div>

            <div
              className={styles['input']}
            >
              <TextField
                inputRef={register}
                type='email'
                label='Email'
                name='email'
                variant='outlined'
                color='secondary'
                error={errors.email}
                helperText={errors.email?.message}
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
              <TextField
                inputRef={register}
                type='password'
                label='Confirm Password'
                name='confirmPassword'
                variant='outlined'
                color='secondary'
                error={errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
                Register
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
              to='/profile/login'
              fullWidth
            >
              Login
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

export default RegisterSection

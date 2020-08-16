import React, { useState, useEffect } from 'react'

// SVGs
import Logo from '../../../../svg/logo_green.svg'

// Schema
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

// Router
import { useLocation } from '@reach/router'

// Query String
import { parse } from 'query-string'

// Gatsby
import { Link, navigate } from 'gatsby'

// Material
import { TextField, Button, Divider, Typography } from '@material-ui/core'

// Hooks
import { useForm } from 'react-hook-form'

// API
import axios from 'axios'

// Styles
import styles from './styles.module.scss'

// Schema Definition
const passwordSchema = yup.object().shape({
  password: yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*\d)/g, 'Password must contain at least one number')
    .matches(/(?=.*[A-Z])/g, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*[a-z])/g, 'Password must contain at least one lowercase letter')
    .required(),
  confirmPassword: yup.string().oneOf([ yup.ref('password'), null ], ' Passwords do not match').required('')
})

const PasswordMode = props => {
  const {
    site,
    setNotis,
  } = props

  // The form and its validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(passwordSchema)
  })

  // Shows user is submitting the form
  const [submitting, setSubmitting] = useState(false)

  const location = useLocation()

  // Redirect if there is no code query param
  useEffect(() => {
    if(!location.search) {
      //navigate('/profile/login')
    }
  }, [])

  function _handleSubmit(data) {
    setSubmitting(true)
    setNotis([])

    // Get the code from the url
    const parsedData = parse(location.search)

    axios.post(`${site.siteMetadata.protocol}://${site.siteMetadata.server}:${site.siteMetadata.port}/auth/reset-password`, {
      code: parsedData.code, // code contained in the reset link of step 3.
      password: data.password,
      passwordConfirmation: data.confirmPassword,
    }).then(() => {
      // Notification to check mail
      navigate('/profile/login')
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
    <div
      className={styles['passwordContainer']}
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
          New Password
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
            type='password'
            label='New Password'
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
            Reset Password
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
  )
}

export default PasswordMode

import React, { useState } from 'react'

// Provider
//import Provider from '../../components/provider'

// SVGs
import Logo from '../../svg/logo_green.svg'

// Hooks
import { useLocalStorage } from 'react-use'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'

// Schema
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

// Gatsby
import { Link } from 'gatsby'

// Material
import { TextField, Button, Divider, Typography } from '@material-ui/core'

// API
import axios from 'axios'

// Constants
import { RESPONSE_ERRORS } from '../../constants/strapi'
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

const RegisterSection = () => {
  // The form and its validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(registerShema)
  })

  // Shows user is submitting the form
  const [submitting, setSubmitting] = useState(false)

  // Used to store the jwt token
  const [_, setToken] = useLocalStorage(KEYS.jwt)

  // Notifications
  const { enqueueSnackbar } = useSnackbar()

  function _handleSubmit(data) {
    setSubmitting(true)
    axios.post('http://161.35.149.214/auth/local/register', {
      username: `${data.firstName.toLowerCase()}-${data.lastName.toLowerCase()}-${data.email.toLowerCase()}`,
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    }).then((v) => {
      setToken(v.data.jwt)

      setSubmitting(false)
    }).catch((e) => {
      if(e.response?.data?.message[0]?.messages[0]?.id === RESPONSE_ERRORS.taken) {
        enqueueSnackbar('User already exists', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      } else {
        alert('error')
      }
      console.log(e.response)
      setSubmitting(false)
    })
  }

  return (
    <>
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

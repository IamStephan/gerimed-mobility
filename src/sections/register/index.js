import React, { useState } from 'react'

// SVGs
import Logo from '../../svg/logo_green.svg'

// Hooks
import { useForm } from 'react-hook-form'

// Schema
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

// Gatsby
import { Link, useStaticQuery, graphql } from 'gatsby'

// Material
import { TextField, Button, Divider, Typography, LinearProgress } from '@material-ui/core'

// API
import { Register } from '../../api/auth'

// Notifications
import { useSnackbar } from 'notistack'

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

  const { enqueueSnackbar } = useSnackbar()

  // The form and its validation
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(registerShema)
  })

  // Shows user is submitting the form
  const [submitting, setSubmitting] = useState(false)


  async function _handleSubmit(data) {
    setSubmitting(true)

    const results = await Register({
      protocol: site.siteMetadata.protocol,
      server: site.siteMetadata.server,
      port: site.siteMetadata.port
    }, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    })

    // Results only return a success or an error so show them all
    results.notis.forEach(({ message }) => {
      enqueueSnackbar(message, {
        variant: results.type
      })
    })

    if(results.type === 'success') {
      reset()
    }

    setSubmitting(false)
  }

  return (
    <>
      <section
        className={styles['registerSection']}
      >
        
        <div
          className={styles['registerContainer']}
        >
          {
            submitting ? (
              <div>
                <LinearProgress
                  color='secondary'
                />
                <br />
              </div>
            ) : null
          }

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
                disabled={submitting}
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
                disabled={submitting}
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
                disabled={submitting}
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
                disabled={submitting}
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
                disabled={submitting}
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
              disabled={submitting}
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

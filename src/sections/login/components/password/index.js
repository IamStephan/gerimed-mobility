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
import { TextField, Button, Divider, Typography, LinearProgress } from '@material-ui/core'

// Hooks
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

// API
import { ResetPassword } from '../../../../api/auth'

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
  } = props

  const { enqueueSnackbar } = useSnackbar()

  // The form and its validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(passwordSchema)
  })

  // Shows user is submitting the form
  const [submitting, setSubmitting] = useState(false)

  const location = useLocation()

  useEffect(() => {
    if(!location.search) {
      enqueueSnackbar('No reset code found, please check your email', {
        variant: 'warning'
      })
    }
  }, [])

  async function _handleSubmit(data) {
    setSubmitting(true)

    // Get the code from the url
    const parsedData = parse(location.search)

    const results = await ResetPassword({
      protocol: site.siteMetadata.protocol,
      server: site.siteMetadata.server,
      port: site.siteMetadata.port
    }, {
      code: parsedData.code,
      password: data.password,
      confirmPassword: data.confirmPassword,
    })

    results.notis.forEach(({ message }) => {
      enqueueSnackbar(message, {
        variant: results.type
      })
    })

    if(results.type === 'success') {
      navigate('/profile/login')
    }

    setSubmitting(false)
  }

  return (
    <div
      className={styles['passwordContainer']}
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
          disabled={submitting}
          fullWidth
        >
          Login
        </Button>
      </div>
    </div>
  )
}

export default PasswordMode

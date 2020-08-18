import React, { useState } from 'react'

// SVGs
import Logo from '../../../../svg/logo_green.svg'

// Schema
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

// Gatsby
import { Link, navigate } from 'gatsby'

// Material
import { TextField, Button, Divider, Typography, ButtonGroup } from '@material-ui/core'

// Hooks
import { useLocalStorage } from 'react-use'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

// API
import { Login } from '../../../../api/auth'

// Notifications


// Constants
import { KEYS } from '../../../../constants/localStorage'

// Styles
import styles from './styles.module.scss'

// Schema Definition
const loginShema = yup.object().shape({
  identifier: yup.string().email().required(),
  password: yup.string().required()
})

const LoginMode = props => {
  const {
    site,
  } = props

  const { enqueueSnackbar } = useSnackbar()

  // The form and its validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginShema)
  })

  // Shows user is submitting the form
  const [submitting, setSubmitting] = useState(false)

  // Used to store the jwt token
  const [_, setToken] = useLocalStorage(KEYS.jwt)

  async function _handleSubmit(data) {
    setSubmitting(true)

    const results = await Login({
      protocol: site.siteMetadata.protocol,
      server: site.siteMetadata.server,
      port: site.siteMetadata.port
    }, {
      identifier: data.identifier,
      password: data.password
    })

    results.notis.forEach(({ message }) => {
      enqueueSnackbar(message, {
        variant: results.type
      })
    })

    if(results.type === 'success') {
      const { data: { jwt } } = results.data
      
      // Set jwt token
      setToken(jwt)

      // redirect
      navigate('/profile')
    }

    setSubmitting(false)
  }

  return (
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
            type='email'
            label='Email'
            name='identifier'
            variant='outlined'
            color='secondary'
            error={errors.identifier}
            helperText={errors.identifier?.message}
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
        <ButtonGroup
          orientation='vertical'
          fullWidth
          variant='text'
        >
          <Button
            color='secondary'
            component={Link}
            to={`/profile/login/email`}
          >
            Forgot Password
          </Button>
          <Button
            color='secondary'
            component={Link}
            to={`/profile/login/resend`}
          >
            Resend Confirmation
          </Button>
        </ButtonGroup>
        
      </div>
    </div>
  )
}

export default LoginMode

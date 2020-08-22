import React, { useState } from 'react'

// Schema
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

// Gatsby
import { Link, navigate } from 'gatsby'

// Material
import {
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  Button,
  Divider,
  Typography,
  LinearProgress,
  FormControlLabel,
  Link as Btn,
} from '@material-ui/core'
import { VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons'

// Components
import AuthTitle from '../../../../components/authTitle'

// Hooks
import { useToken } from '../../../../hooks/useToken'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

// API
import { Login, ResendConfirmation } from '../../../../api/auth'

// Constants
import { KEYS } from '../../../../constants/localStorage'

// Styles
import styles from './styles.module.scss'

// Schema Definition
const loginShema = yup.object().shape({
  identifier: yup.string().email().required(),
  password: yup.string().required(),
  remember: yup.boolean()
})

const emailNeedsVery = 'Auth.form.error.confirmed'

const LoginMode = props => {
  const {
    site,
  } = props

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  // The form and its validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginShema)
  })

  // Shows user is submitting the form
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Used to store the jwt token
  const { saveToken } = useToken(KEYS.jwt)

  function toggleShowPassword() {
    setShowPassword(prev => !prev)
  }

  async function _handleResend(email) {
    setSubmitting(true)
    const results = await ResendConfirmation({
      protocol: site.siteMetadata.protocol,
      server: site.siteMetadata.server,
      port: site.siteMetadata.port
    }, {
      email
    })

    closeSnackbar()

    results.notis.forEach(({ message }) => {
      enqueueSnackbar(message, {
        variant: results.type
      })
    })

    setSubmitting(false)
  }

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

    results.notis.forEach(({ message, id }) => {
      if(id === emailNeedsVery) {
        enqueueSnackbar(message, {
          variant: results.type,
          persist: true,
          action: () => {
            return (
              <Button
                color='inherit'
                onClick={() => _handleResend(data.identifier)}
              >
                Resend
              </Button>
            )
          }
        })
      }
      enqueueSnackbar(message, {
        variant: results.type
      })
    })

    if(results.type === 'success') {
      const { data: { jwt } } = results.data
      
      // Set jwt token
      saveToken(jwt, data.remember)

      // redirect
      navigate('/profile')
    }

    setSubmitting(false)
  }

  return (
    <div
      className={styles['loginContainer']}
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

      <AuthTitle
        title='Login'
      />

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
            disabled={submitting}
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
            type={showPassword ? 'text' : 'password'}
            label='Password'
            name='password'
            variant='outlined'
            color='secondary'disabled={submitting}
            error={errors.password}
            helperText={errors.password?.message}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position='end'
                >
                  <IconButton
                    onClick={toggleShowPassword}
                  >
                    {
                      showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />
                    }
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>

        <div
          className={styles['forgotRemember']}
        >
          <div
            className={styles['remember']}
          >
            <FormControlLabel
              control={(
                <Checkbox
                  color='secondary'
                  inputRef={register}
                  name='remember'
                />
              )}

              label='Remember me'
            />
          </div>

          <div
            className={styles['forgot']}
          >
            <Typography
              variant='body1'
            >
              <Btn
                color='secondary'
                component={Link}
                to='/profile/login/email'
              >
                Forgot password?
              </Btn>
            </Typography>
          </div>
         
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

      <Divider />

      <div
        className={styles['alternate']}
      >
        <Typography
          variant='body1'
        >
          Don't have an account? {' '}
          <Btn
            color='secondary'
            component={Link}
            to='/profile/register'
          >
            Register
          </Btn>
        </Typography>
      </div>
    </div>
  )
}

export default LoginMode

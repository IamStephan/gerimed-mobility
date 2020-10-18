import React, { useState, useEffect } from 'react'

// Hooks
import { useService } from '@xstate/react'
import { useForm } from 'react-hook-form'

// Resolvers
import { yupResolver } from '@hookform/resolvers'

// Auth Controller
import { AuthService } from '../../organisms/provider'

// Model
import { loginSchema } from './model'

// Gatsby
import { Link, navigate } from 'gatsby'

// Material
import {
  TextField,
  InputAdornment,
  Button,
  Divider,
  Typography,
  LinearProgress,
  Link as Btn,
  FormControlLabel,
  Checkbox,
  IconButton
} from '@material-ui/core'
import { VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons'

// Components
import AuthTitle from '../../molecules/auth_title'

// Styles
import styles from './styles.module.scss'

/**
 * NOTE:
 * =====
 * for now just use alert to show the errors
 */
const LoginSection = () => {
  const [current, send] = useService(AuthService)

  const [showPassword, setShowPassword] = useState(false)

  const loading = current.matches('loading')

  // The form and its validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema)
  })

  useEffect(() => {
    if(current.event.type === 'done.invoke.loading.login') {
      navigate('/profile')
    }
  }, [current.event.type])

  async function _handleSubmit(data) {
    // console.log('SEND_EVENT')
    send('LOGIN', {
      email: data.email,
      password: data.password,
      shouldRemember: data.remember
    })
  }

  function toggleShowPassword() {
    setShowPassword(prev => !prev)
  }

  return (
    <>
      <section
        className={styles['loginSection']}
      >
        
        <div
          className={styles['loginContainer']}
        >
          {
            loading ? (
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
                name='email'
                variant='outlined'
                color='secondary'
                disabled={loading}
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
                type={showPassword ? 'text' : 'password'}
                label='Password'
                name='password'
                variant='outlined'
                color='secondary'
                disabled={loading}
                error={errors.password}
                helperText={errors.password?.message}
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
                required
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
                  to='/profile/forgot'
                >
                  Forgot password?
                </Btn>
              </Typography>
            </div>

            <div
              className={styles['inputAlt']}
            >
              <FormControlLabel
                disabled={loading}
                control={(
                  <Checkbox
                    color='secondary'
                    inputRef={register}
                    name='remember'
                  />
                )}
                label={(
                  <Typography>
                    Remember Me
                  </Typography>
                )}
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
                disabled={loading}
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

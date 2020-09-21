import React, { useState } from 'react'

// Hooks
import { useMachine } from '@xstate/react'
import { useForm } from 'react-hook-form'

// Resolvers
import { yupResolver } from '@hookform/resolvers'

// Model
import { FormModel } from './model'

// Controller
import { LocalState } from './controller'

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

// Notifications
import { useSnackbar } from 'notistack'

// Styles
import styles from './styles.module.scss'

/**
 * NOTE:
 * =====
 * for now just use alert to show the errors
 */
const RegisterSection = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [current, send] = useMachine(LocalState, {
    context: {
      notifications: { enqueueSnackbar }
    }
    
  })

  console.log(current.value)

  // The form and its validation
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(FormModel)
  })

  // Shows user is submitting the form
  const submitting = current.matches('loading')


  async function _handleSubmit(data) {
    // console.log('SEND_EVENT')
    send('LOGIN', {
      identifier: data.email,
      password: data.password,
      shouldRemember: data.remember
    })
  }

  function toggleShowPassword() {
    send('TOGGLE_PASSWORD')
  }

  const showPassword = current.context.showPassword

  return (
    <>
      <section
        className={styles['loginSection']}
      >
        
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
                type={showPassword ? 'text' : 'password'}
                label='Password'
                name='password'
                variant='outlined'
                color='secondary'
                disabled={submitting}
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
              className={styles['inputAlt']}
            >
              <FormControlLabel
                disabled={submitting}
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

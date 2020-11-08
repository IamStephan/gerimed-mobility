import React, { useState, useEffect } from 'react'

// Hooks
import { useService } from '@xstate/react'
import { useForm } from 'react-hook-form'

// Resolvers
import { yupResolver } from '@hookform/resolvers'

// Auth Controller
import { AuthService } from '../../organisms/provider'

// Model
import { resetPasswordSchema } from './model'

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
const ResetPasswordSection = () => {
  const [current, send] = useService(AuthService)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const loading = current.matches('loading')

  // The form and its validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(resetPasswordSchema)
  })

  useEffect(() => {
    if(current.event.type === 'done.invoke.loading.reset_password') {
      navigate('/profile/login')
    }
  }, [current.event.type])

  async function _handleSubmit(data) {
    // console.log('SEND_EVENT')
    send('RESET_PASSWORD', {
      password: data.password,
      confirmPassword: data.confirmPassword
    })
  }

  function toggleShowPassword() {
    setShowPassword(prev => !prev)
  }

  function toggleShowConfimPassword() {
    setShowConfirmPassword(prev => !prev)
  }

  return (
    <>
      <section
        className={styles['resetPasswordSection']}
      >
        
        <div
          className={styles['resetPasswordContainer']}
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
            title='Reset Password'
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
              className={styles['input']}
            >
              <TextField
                inputRef={register}
                type={showConfirmPassword ? 'text' : 'password'}
                label='Confirm Password'
                name='confirmPassword'
                variant='outlined'
                color='secondary'
                disabled={loading}
                error={errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position='end'
                    >
                      <IconButton
                        onClick={toggleShowConfimPassword}
                      >
                        {
                          showConfirmPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />
                        }
                      </IconButton>
                    </InputAdornment>
                  )
                }}
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
                disabled={loading}
              >
                Reset Password
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
              Remember your password? {' '}
              <Btn
                color='secondary'
                component={Link}
                to='/profile/login'
              >
                Login
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

export default ResetPasswordSection

import React, { useState, useEffect } from 'react'

// Hooks
import { useService } from '@xstate/react'
import { useForm } from 'react-hook-form'

// Form Resolver
import { yupResolver } from '@hookform/resolvers'

// Auth Controller
import { AuthService } from '../../organisms/provider'

// Model
import { registerShema } from './model'

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
  IconButton,
} from '@material-ui/core'
import { VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons'

// Molecules
import AuthTitle from '../../molecules/auth_title'

// Styles
import styles from './styles.module.scss'


const RegisterSection = () => {
  const [current, send] = useService(AuthService)

  const loading = current.matches('loading')

  // The form and its validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(registerShema)
  })

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if(current.matches({ idle: 'user' })) {
      navigate('/profile')
    }
  }, [current.value]) // eslint-disable-line react-hooks/exhaustive-deps

  function _handleSubmit(data) {
    send('REGISTER', {
      'firstName': data.firstName,
      'lastName': data.lastName,
      'email': data.email,
      'username': data.email,
      'password': data.password
    })
  }

  function toggleShowPassword() {
    setShowPassword(prev => !prev)
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
            title='Register'
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
                label='First Name'
                name='firstName'
                variant='outlined'
                color='secondary'
                disabled={loading}
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
                disabled={loading}
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
              className={styles['inputAlt']}
            >
              <FormControlLabel
                disabled={loading}
                control={(
                  <Checkbox
                    color='secondary'
                    inputRef={register}
                    name='terms'
                    
                  />
                )}
                label={(
                  <Typography>
                    I hereby agree to the {' '}
                    <Btn
                      component={Link}
                      to='/terms'
                      color='secondary'
                    >
                      terms of use, {' '}
                    </Btn>
                    <Btn
                      component={Link}
                      to='/return'
                      color='secondary'
                    >
                      return policy {' '}
                    </Btn>
                    and {' '}
                    <Btn
                      component={Link}
                      to='/policies'
                      color='secondary'
                    >
                      privacy policy.
                    </Btn>
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
                Register
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
              Already have an account? {' '}
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

export default RegisterSection

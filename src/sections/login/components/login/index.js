import React from 'react'

// Schema
import { yupResolver } from '@hookform/resolvers'

// Gatsby
import { Link } from 'gatsby'

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
import AuthTitle from '../../../../molecules/auth_title'

// Hooks
import { useMachine } from '@xstate/react'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

// Controller
import { LocalState } from './controller'

// Model
import { LoginSchema } from './model'

// Styles
import styles from './styles.module.scss'

const LoginMode = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const [current, send] = useMachine(LocalState, {
    context: {
      notifications: {
        enqueueSnackbar,
        closeSnackbar
      }
    }
  })

  
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(LoginSchema)
  })

  function toggleShowPassword() {
    send('TOGGLEPASSWORD')
  }

  async function _handleSubmit(data) {
    send('LOGIN', {
      identifier: data.identifier,
      password: data.password,
      shouldRemember: data.remember
    })
  }

  const loading = current.matches('loading')
  const showPassword = current.context.showPassword

  return (
    <div
      className={styles['loginContainer']}
    >
      {
        loading && (
          <div>
            <LinearProgress
              color='secondary'
            />
            <br />
          </div>
        )
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
            disabled={loading}
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
            color='secondary'
            disabled={loading}
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
              disabled={loading}
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
  )
}

export default LoginMode

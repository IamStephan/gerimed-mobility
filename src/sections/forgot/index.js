import React, { useEffect } from 'react'

// Hooks
import { useService } from '@xstate/react'
import { useForm } from 'react-hook-form'

// Resolvers
import { yupResolver } from '@hookform/resolvers'

// Auth Controller
import { AuthService } from '../../organisms/provider'

// Model
import { forgotSchema } from './model'

// Gatsby
import { Link, navigate } from 'gatsby'

// Material
import {
  TextField,
  Button,
  LinearProgress,
  Divider,
  Typography,
  Link as Btn,
} from '@material-ui/core'

// Components
import AuthTitle from '../../molecules/auth_title'

// Styles
import styles from './styles.module.scss'

/**
 * NOTE:
 * =====
 * for now just use alert to show the errors
 */
const ForgotSection = () => {
  const [current, send] = useService(AuthService)

  const loading = current.matches('loading')

  // The form and its validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(forgotSchema)
  })

  useEffect(() => {
    if(current.matches({ idle: 'user' })) {
      navigate('/profile')
    }
  }, [current.value]) // eslint-disable-line react-hooks/exhaustive-deps

  async function _handleSubmit(data) {
    send('FORGOT', {
      email: data.email
    })
  }

  return (
    <>
      <section
        className={styles['forgotSection']}
      >
        
        <div
          className={styles['forgotContainer']}
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
            title='Forgot Password'
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
              <Button
                disableElevation
                type='submit'
                variant='contained'
                color='secondary'
                disabled={loading}
              >
                Request Reset
              </Button>
            </div>

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
          </form>
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

export default ForgotSection

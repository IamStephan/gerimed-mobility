import React, { useState } from 'react'

// Hooks
import { useForm } from 'react-hook-form'

// Schema
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

// Gatsby
import { Link } from 'gatsby'

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
  terms: yup.boolean()
})

/**
 * NOTE:
 * =====
 * for now just use alert to show the errors
 */
const RegisterSection = () => {
  const { enqueueSnackbar } = useSnackbar()

  // The form and its validation
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(registerShema)
  })

  // Shows user is submitting the form
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)


  async function _handleSubmit(data) {
    // setSubmitting(true)

    // if(!data.terms) {
    //   const errorMessage = 'You need to agree to the terms and policies.'
    //   enqueueSnackbar(errorMessage, {
    //     variant: 'error'
    //   })

    //   setSubmitting(false)
    //   return
    // }

    // const results = await Register({
    //   protocol: site.siteMetadata.protocol,
    //   server: site.siteMetadata.server,
    //   port: site.siteMetadata.port
    // }, {
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   email: data.email,
    //   password: data.password
    // })

    // // Results only return a success or an error so show them all
    // results.notis.forEach(({ message }) => {
    //   enqueueSnackbar(message, {
    //     variant: results.type
    //   })
    // })

    // if(results.type === 'success') {
    //   reset()
    // }

    // setSubmitting(false)
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
                      terms of use {' '}
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
                disabled={submitting}
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

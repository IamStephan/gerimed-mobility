import React, { useState } from 'react'


// Schema
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

// Material
import {
  TextField,
  Button,
  Typography,
  LinearProgress,
  Link as Btn,
  Divider
} from '@material-ui/core'

// Gatsby
import { Link } from 'gatsby'

// Components
import AuthTitle from '../../../../components/authTitle'

// Hooks
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

// API
import { RequestPasswordReset } from '../../../../api/auth'

// Styles
import styles from './styles.module.scss'

// Schema Definition
const emailSchema = yup.object().shape({
  email: yup.string().email('Please provide a valid email.').required('Email is required.')
})

const EmailMode = props => {
  const {
    site,
  } = props

  const { enqueueSnackbar } = useSnackbar()

  // The form and its validation
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(emailSchema)
  })

  // Shows user is submitting the form
  const [submitting, setSubmitting] = useState(false)

  async function _handleSubmit(data) {
    setSubmitting(true)

    const results = await RequestPasswordReset({
      protocol: site.siteMetadata.protocol,
      server: site.siteMetadata.server,
      port: site.siteMetadata.port
    }, {
      email: data.email
    })

    results.notis.forEach(({ message }) => {
      enqueueSnackbar(message, {
        variant: results.type
      })
    })

    if(results.type === 'success') {
      reset()
    }

    setSubmitting(false)
  }

  return (
    <div
      className={styles['emailContainer']}
    >
      {
        submitting ? (
          <div>
            <LinearProgress
              color='secondary'
            />

            <br/>
          </div>
        ): null
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
          <Button
            disableElevation
            type='submit'
            variant='contained'
            color='secondary'
            disabled={submitting}
          >
            Send Request
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
  )
}

export default EmailMode

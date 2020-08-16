import React, { useState } from 'react'

// SVGs
import Logo from '../../../../svg/logo_green.svg'

// Schema
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

// Gatsby
import { Link } from 'gatsby'

// Material
import { TextField, Button, Divider, Typography } from '@material-ui/core'

// Hooks
import { useForm } from 'react-hook-form'

// API
import axios from 'axios'

// Styles
import styles from './styles.module.scss'

// Schema Definition
const emailSchema = yup.object().shape({
  email: yup.string().email('Please provide a valid email.').required('Email is required.')
})

const EmailMode = props => {
  const {
    site,
    setNotis,
  } = props

  // The form and its validation
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(emailSchema)
  })

  // Shows user is submitting the form
  const [submittingMail, setSubmittingMail] = useState(false)

  function _handleSubmit(data) {
    setSubmittingMail(true)
    setNotis([])

    axios.post(`${site.siteMetadata.protocol}://${site.siteMetadata.server}:${site.siteMetadata.port}/auth/forgot-password`, {
      email: data.email
    }).then(() => {
      // Notification to check mail
      setNotis([{
        id: Math.random(),
        title: 'Success',
        type: 'success',
        message: 'Please check your email for the reset link.'
      }])
      setSubmittingMail(false)
    }).catch((e) => {
      // Client error to server
      if(e.response) {
        const errors = e.response?.data?.message[0]?.messages

        const listOfErrors = []
        
        for(let i = 0; i < errors?.length; i++) {
          listOfErrors.push({
            id: errors[i].id,
            title: 'Error',
            type: 'error',
            message: errors[i].message
          })
        }

        setNotis(listOfErrors)
      } else {
        // unhandled Errors
        setNotis([{
          id: Math.random(),
          title: 'Error',
          type: 'error',
          message: e.message
        }])
      }
      
      setSubmittingMail(false)
    })

    return true
  }

  return (
    <div
      className={styles['emailContainer']}
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
          Password Reset
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
            name='email'
            variant='outlined'
            color='secondary'
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
            disabled={submittingMail}
          >
            Send Request
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EmailMode

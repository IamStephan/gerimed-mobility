import React, { useState } from 'react'

// Template
import TabTemplate from '../../components/tabTemplate'

// Gatbsy
import { useStaticQuery, graphql } from 'gatsby'

// Constants
import { PROFILE_ACTIONS } from '../../../../constants/state'

// State
import { dispatch, useGlobalState } from '../../../../state/profile'

// Hooks
import { useForm } from 'react-hook-form'

// API
import axios from 'axios'

// Schema
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

// Material
import { Typography, ButtonGroup, Button, TextField } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

// Schema Definition
const infoSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required.'),
  lastName: yup.string().required('Last Name is required.'),
  phone: yup.string()
})

/**
 * TODO: validate more field more rigid
 */

const Info = () => {
  // Meta info
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            server
            port
          }
        }
      }
    `
  )

  const [info] = useGlobalState('info')
  const [auth] = useGlobalState('auth')

  const [editMode, setEditMode] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // The form and its validation
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(infoSchema),
    // This is not reactive and needs to be reset
    defaultValues: {
      firstName: info.firstName,
      lastName: info.lastName,
      phone: info.phone,
    }
  })

  function _handleSubmit(data) {
    setSubmitting(true)

    // Data construction
    const dataToSubmit = {
      'first_name': data.firstName,
      'last_name': data.lastName,
      'phone': data.phone
    }
    
    axios.put(`http://${site.siteMetadata.server}:${site.siteMetadata.port}/users/me`, { ...dataToSubmit }, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      }
    }).then (res => {
      // v always returns the current user values
      const { data } = res

      const reData = {
        firstName: data['first_name'],
        lastName: data['last_name'],
        phone: data['phone']
      }

      // Success update state
      dispatch({
        type: PROFILE_ACTIONS.updateInfo,
        ...reData
      })

      // Update the form defaults!
      reset(reData)
      
      setEditMode(false)
      setSubmitting(false)
    }).catch(e => {
      alert('Could Not Update')
      console.log(e.response)

      setEditMode(false)
      setSubmitting(false)
    })
  }

  function OpenEditMode() {
    setEditMode(true)
  }

  function CloseEditMode() {
    setEditMode(false)
  }

  return (
    <TabTemplate
      title='Account Information'
    >
      <form
        noValidate
        className={styles['container']}
        onSubmit={handleSubmit(_handleSubmit)}
      >
        <div
          className={styles['row']}
        >
          <div
            className={styles['left']}
          >
            <Typography
              className={styles['caption']}
            >
              First Name
            </Typography>
          </div>

          <div
            className={styles['right']}
          >
            {
              editMode ? (
                <TextField
                  color='secondary'
                  variant='outlined'
                  name='firstName'
                  inputRef={register}
                  error={errors.firstName}
                  helperText={errors.firstName?.message}
                />
              ) : (
                <Typography>
                  {
                    info.firstName
                  }
                </Typography>
              )
            }
          </div>
        </div>

        <div
          className={styles['row']}
        >
          <div
            className={styles['left']}
          >
            <Typography
              className={styles['caption']}
            >
              Last Name
            </Typography>
          </div>

          <div
            className={styles['right']}
          >
            {
              editMode ? (
                <TextField
                  color='secondary'
                  variant='outlined'
                  name='lastName'
                  inputRef={register}
                  error={errors.lastName}
                  helperText={errors.lastName?.message}
                />
              ) : (
                <Typography>
                  {
                    info.lastName
                  }
                </Typography>
              )
            }
          </div>
        </div>

        <div
          className={styles['row']}
        >
          <div
            className={styles['left']}
          >
            <Typography
              className={styles['caption']}
            >
              Email
            </Typography>
          </div>

          <div
            className={styles['right']}
          >
            <Typography>
              {
                info.email
              }
            </Typography>
          </div>
        </div>

        <div
          className={styles['row']}
        >
          <div
            className={styles['left']}
          >
            <Typography
              className={styles['caption']}
            >
              Phone Number
            </Typography>
          </div>

          <div
            className={styles['right']}
          >
            {
              editMode ? (
                <TextField
                  color='secondary'
                  variant='outlined'
                  name='phone'
                  inputRef={register}
                  error={errors.phone}
                  helperText={errors.phone?.message}
                />
              ) : (
                <Typography>
                  {
                    info.phone || '-'
                  }
                </Typography>
              )
            }
          </div>
        </div>

        <div
          className={styles['actions']}
        >

          {
            editMode ? (
              <ButtonGroup
                disabled={submitting}
                disableElevation
                color='secondary'
              >
                <Button
                  variant='contained'
                  type='submit'
                >
                  Save
                </Button>
                <Button
                  variant='outlined'
                  onClick={CloseEditMode}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            ) : (
              <Button
                variant='outlined'
                color='secondary'
                onClick={OpenEditMode}
              >
                Edit
              </Button>
            )
          }
        </div>
      </form>
    </TabTemplate>
  )
}

export default Info

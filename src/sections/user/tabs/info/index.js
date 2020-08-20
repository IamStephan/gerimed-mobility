import React, { useState } from 'react'

// Template
import TabTemplate from '../../components/tabTemplate'

// Constants
import { PROFILE_ACTIONS } from '../../../../constants/state'

// State
import { dispatch, useGlobalState } from '../../../../state/profile'

// Hooks
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

// API
import { UpdateUser } from '../../../../api/user'

// Schema
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

// Material
import { Typography, ButtonGroup, Button, TextField, LinearProgress } from '@material-ui/core'

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
 *       ! DO THIS ON THE SERVER !
 */
const Info = props => {
  const {
    site
  } = props

  const { enqueueSnackbar } = useSnackbar()

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

  async function _handleSubmit(info) {
    const {
      firstName,
      lastName,
      phone
    } = info

    const { token } = auth

    setSubmitting(true)

    const submitData = {
      'first_name': firstName,
      'last_name': lastName,
      'phone': phone
    }


    const results = await UpdateUser({
      protocol: site.siteMetadata.protocol,
      server: site.siteMetadata.server,
      port: site.siteMetadata.port
    }, { token }, {
      dataToSubmit: submitData
    })

    results.notis.forEach(({ message }) => {
      enqueueSnackbar(message, {
        variant: results.type
      })
    })

    if(results.type === 'success') {
      const { data } = results

      const newData = {
        firstName: data['first_name'],
        lastName: data['last_name'],
        phone: data['phone'],
      }

      reset(newData)

      dispatch({
        type: PROFILE_ACTIONS.updateInfo,
        ...newData
      })

      setEditMode(false)
    }

    setSubmitting(false)
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
      {
        submitting ? (
          <LinearProgress
            color='secondary'
          />
        ) : null
      }
      
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
                  disabled={submitting}
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
                  disabled={submitting}
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
                  disabled={submitting}
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

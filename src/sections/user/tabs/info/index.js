import React, { useState, useEffect } from 'react'

// Template
import TabTemplate from '../../components/tabTemplate'

// Hooks
import { useService } from '@xstate/react'
import { useForm } from 'react-hook-form'

// Auth Controller
import { AuthService } from '../../../../organisms/provider'

// Model
import { InfoSchema } from './model'

// Schema
import { yupResolver } from '@hookform/resolvers'

// Material
import { Typography, ButtonGroup, Button, TextField, LinearProgress } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const Info = () => {
  const [current, send] = useService(AuthService)

  const [isEditing, setIsEditing] = useState(false)

  const info = {
    first_name: current.context.user?.first_name || '',
    last_name: current.context.user?.last_name || '',
    email: current.context.user?.email || '',
    phone: current.context.user?.phone || '',
  }

  const defaultValues = {
    firstName: info.first_name,
    lastName: info.last_name,
    phone: info.phone
  }

  // The form and its validation
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(InfoSchema),
    defaultValues
  })

  const loading = current.matches('loading') || !current.context.user

  async function _handleSubmit(data) {
    const {
      firstName,
      lastName,
      phone
    } = data

    send('UPDATE_ME', {
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      }
    })
  }

  /**
   * Used to update the form values
   */
  useEffect(() => {
    if(isEditing) {
      reset(defaultValues)
    }
  }, [current.context.user, isEditing]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function listenSuccessLoad(state) {
      if(state.changed && state.event.type === 'done.invoke.loading.update') {
        setIsEditing(false)
      }
    }
    AuthService.onTransition(listenSuccessLoad)

    return () => {
      AuthService.off(listenSuccessLoad)
    }
  }, [])

  function _toggleEditMode() {
    setIsEditing(prev => !prev)
  }

  return (
    <TabTemplate
      title='Account Information'
    >
      {
        loading ? (
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
              isEditing ? (
                <TextField
                  color='secondary'
                  variant='outlined'
                  name='firstName'
                  inputRef={register}
                  disabled={loading}
                  error={errors.firstName}
                  helperText={errors.firstName?.message}
                />
              ) : (
                <Typography>
                  {
                    info['first_name']
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
              isEditing ? (
                <TextField
                  color='secondary'
                  variant='outlined'
                  name='lastName'
                  inputRef={register}
                  disabled={loading}
                  error={errors.lastName}
                  helperText={errors.lastName?.message}
                />
              ) : (
                <Typography>
                  {
                    info['last_name']
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
                info['email']
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
              isEditing ? (
                <TextField
                  color='secondary'
                  variant='outlined'
                  name='phone'
                  inputRef={register}
                  error={errors.phone}
                  disabled={loading}
                  helperText={errors.phone?.message}
                />
              ) : (
                <Typography>
                  {
                    info['phone'] || '-'
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
            isEditing ? (
              <ButtonGroup
                disabled={loading}
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
                  onClick={_toggleEditMode}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            ) : (
              <Button
                variant='outlined'
                color='secondary'
                onClick={_toggleEditMode}
                disabled={loading}
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

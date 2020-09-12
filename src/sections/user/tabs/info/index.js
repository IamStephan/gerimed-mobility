import React from 'react'

// Template
import TabTemplate from '../../components/tabTemplate'

// Hooks
import { useUser } from '../../../../hooks/useUser'
import { useMachine } from '@xstate/react'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

// Controller
import { LocalState } from './controller'

// Model
import { InfoSchema } from './model'

// Schema
import { yupResolver } from '@hookform/resolvers'

// Material
import { Typography, ButtonGroup, Button, TextField, LinearProgress } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const Info = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [current] = useMachine(LocalState, {
    context: {
      notifications: {
        enqueueSnackbar
      }
    }
  })

  const { info } = useUser()

  // The form and its validation
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(InfoSchema),
    defaultValues: {
      firstName: info['first_name'],
      lastName: info['last_name'],
      phone: info['phone'],
    }
  })

  async function _handleSubmit(data) {
    
  }

  function OpenEditMode() {
  }

  function CloseEditMode() {
  }

  return (
    <TabTemplate
      title='Account Information'
    >
      {
        false ? (
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
              false ? (
                <TextField
                  color='secondary'
                  variant='outlined'
                  name='firstName'
                  inputRef={register}
                  disabled={false}
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
              false ? (
                <TextField
                  color='secondary'
                  variant='outlined'
                  name='lastName'
                  inputRef={register}
                  disabled={false}
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
              false ? (
                <TextField
                  color='secondary'
                  variant='outlined'
                  name='phone'
                  inputRef={register}
                  error={errors.phone}
                  disabled={false}
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
            false ? (
              <ButtonGroup
                disabled={false}
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

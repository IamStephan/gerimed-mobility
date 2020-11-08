import React, { useState, useEffect } from 'react'

// Template
import TabTemplate from '../../components/tabTemplate'

// Hooks
import { useForm } from 'react-hook-form'
import { useService } from '@xstate/react'

// Auth Controller
import { AuthService } from '../../../../organisms/provider'

// Form
import { yupResolver } from '@hookform/resolvers'

// Model
import {
  provinces,
  provincesSemantic,
  countries,
  countriesSemantic,
  shippingSchema
} from './model'

// Material
import { Typography, ButtonGroup, Button, TextField, Select, LinearProgress } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'


const Shipping = () => {
  const [current, send] = useService(AuthService)

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

  const [isEditing, setIsEditing] = useState(false)

  const shipping = {
    addressLineOne: current.context.user?.address?.addressLineOne || '',
    addressLineTwo: current.context.user?.address?.addressLineTwo || '',
    suburb: current.context.user?.address?.suburb || '',
    postCode: current.context.user?.address?.['post_code'] || '',
    province: current.context.user?.address?.province || '',
    country: current.context.user?.address?.country || '',
  }

  const defaultValues = shipping

  // The form and its validation
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(shippingSchema),
    defaultValues
  })

  const loading = current.matches('loading') || !current.context.user

  useEffect(() => {
    if(isEditing) {
      reset(defaultValues)
    }
  }, [isEditing]) // eslint-disable-line react-hooks/exhaustive-deps

  function _handleSubmit(data) {
    const {
      suburb,
      country,
      province,
      postCode,
      addressLineOne,
      addressLineTwo
    } = data
    
    send("UPDATE_ME", {
      data: {
        address: {
          suburb,
          country,
          province,
          post_code: postCode,
          addressLineOne,
          addressLineTwo
        }
      }
    })
  }

  function _toggleEditMode() {
    setIsEditing(prev => !prev)
  }

  return (
    <TabTemplate
      title='Shipping Information'
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
              Address Line One
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
                  name='addressLineOne'
                  inputRef={register}
                  disabled={loading}
                  error={errors.addressLineOne}
                  helperText={errors.addressLineOne?.message}
                />
              ) : (
                <Typography>
                  {
                    shipping?.addressLineOne || '-'
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
              Address Line Two
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
                  name='addressLineTwo'
                  inputRef={register}
                  disabled={loading}
                  error={errors.street}
                  helperText={errors.street?.message}
                />
              ) : (
                <Typography>
                  {
                    shipping?.addressLineTwo || '-'
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
              Suburb
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
                  name='suburb'
                  inputRef={register}
                  disabled={loading}
                  error={errors.suburb}
                  helperText={errors.suburb?.message}
                />
              ) : (
                <Typography>
                  {
                    shipping?.suburb || '-'
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
              Postal Code
            </Typography>
          </div>

          <div
            className={styles['right']}
          >
            {
              isEditing ? (
                <TextField
                  color='secondary'
                  type='number'
                  variant='outlined'
                  name='postCode'
                  inputRef={register}
                  disabled={loading}
                  error={errors.postCode}
                  helperText={errors.postCode?.message}
                />
              ) : (
                <Typography>
                  {
                    shipping?.postCode || '-'
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
              Province
            </Typography>
          </div>

          <div
            className={styles['right']}
          >
            {
              isEditing ? (
                <Select
                  native
                  color='secondary'
                  variant='outlined'
                  name='province'
                  inputRef={register}
                  disabled={loading}
                  error={errors.province}
                  helperText={errors.province?.message}
                >
                  {
                    provinces.map((prov, i) => (
                      <option
                        key={prov}
                        value={prov}
                      >
                        {provincesSemantic[i]}
                      </option>
                    ))
                  }
                </Select>
              ) : (
                <Typography>
                  {
                    shipping?.province ? provincesSemantic[provinces.indexOf(shipping?.province)] : '-'
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
              Country
            </Typography>
          </div>

          <div
            className={styles['right']}
          >
            {
              isEditing ? (
                <Select
                  native
                  color='secondary'
                  variant='outlined'
                  name='country'
                  inputRef={register}
                  disabled={loading}
                  error={errors.country}
                  helperText={errors.country?.message}
                >
                  {
                    countries.map((coun, i) => (
                      <option
                        key={coun}
                        value={coun}
                      >
                        { countriesSemantic[i] }
                      </option>
                    ))
                  }
                </Select>
              ) : (
                <Typography>
                  {
                    shipping?.country ? countriesSemantic[countries.indexOf(shipping?.country)] : '-'
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
                  onClick={() => _toggleEditMode(false)}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            ) : (
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => _toggleEditMode(true)}
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

export default Shipping

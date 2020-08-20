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
import { Typography, ButtonGroup, Button, TextField, Select } from '@material-ui/core'

// Styles
import styles from './styles.module.scss'

const provinces = ['EC', 'FS', 'GP', 'KZN', 'LP', 'MP', 'NC', 'NW', 'WC']
const provincesSemantic = ['Eastern Cape', 'Free State', 'Gauteng', 'Kwazulu Natal', 'Limpopo', 'Mpumlanga', 'Northern Cape', 'North West', 'Western Cape']

const countries = ['ZA']
const countriesSemantic = ['South Africa']

// Schema Definition
const shippingSchema = yup.object().shape({
  street: yup.string().required('Street is required.'),
  suburb: yup.string().required('Suburb is required.'),
  postCode: yup.number().required('Postal Code is required.'),
  province: yup.string().oneOf([...provinces]).required('Province is required.'),
  country: yup.string().oneOf([...countries]).required('Country is required.')
})

/**
 * TODO: validate fields more rigid
 */

const Shipping = props => {
  const {
    site
  } = props

  const { enqueueSnackbar } = useSnackbar()

  const [shipping] = useGlobalState('shipping')
  const [auth] = useGlobalState('auth')

  const [editMode, setEditMode] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // The form and its validation
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(shippingSchema),

    // Values are not always present
    defaultValues: {
      street: shipping?.street,
      suburb: shipping?.suburb,
      postCode: shipping?.postCode,
      province: shipping?.province,
      country: shipping?.country,
    }
  })

  async function _handleSubmit(data) {
    const {
      street,
      suburb,
      postCode,
      province,
      country
    } = data

    const { token } = auth

    setSubmitting(true)

    const submitData = {
      'address': {
        'street': street,
        'suburb': suburb,
        'post_code': postCode,
        'province': province,
        'country': country
      }
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
        street: data.address.street,
        suburb: data.address.suburb,
        postCode: data.address['post_code'],
        province: data.address.province,
        country: data.address.country
      }
      reset(newData)

      dispatch({
        type: PROFILE_ACTIONS.updateShipping,
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
      title='Shipping Information'
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
              Street
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
                  name='street'
                  inputRef={register}
                  error={errors.street}
                  helperText={errors.street?.message}
                />
              ) : (
                <Typography>
                  {
                    shipping?.street || '-'
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
              editMode ? (
                <TextField
                  color='secondary'
                  variant='outlined'
                  name='suburb'
                  inputRef={register}
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
              editMode ? (
                <TextField
                  color='secondary'
                  type='number'
                  variant='outlined'
                  name='postCode'
                  inputRef={register}
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
              editMode ? (
                <Select
                  native
                  color='secondary'
                  variant='outlined'
                  name='province'
                  inputRef={register}
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
              editMode ? (
                <Select
                  native
                  color='secondary'
                  variant='outlined'
                  name='country'
                  inputRef={register}
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

export default Shipping

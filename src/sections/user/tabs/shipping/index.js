import React, { useState } from 'react'

// Template
import TabTemplate from '../tabTemplate'

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

const Shipping = () => {
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

  function _handleSubmit(data) {
    setSubmitting(true)

    // Data construction
    const dataToSubmit = {
      'address': {
        'street': data.street,
        'suburb': data.suburb,
        'post_code': data.postCode,
        'province': data.province,
        'country': data.country,
      }
    }
    
    axios.put(`http://${site.siteMetadata.server}:${site.siteMetadata.port}/users/me`, { ...dataToSubmit }, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      }
    }).then (res => {
      // v always returns the current user values
      const { data } = res

      const reData = {
        street: data.address?.street,
        suburb: data.address?.suburb,
        postCode: data.address?.['post_code'],
        province: data.address?.province,
        country: data.address?.country,
      }

      dispatch({
        type: PROFILE_ACTIONS.updateShipping,
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

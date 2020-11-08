import React, { useEffect, useState } from 'react'

// Hooks
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'

// Global Controllers
import { CartService } from '../../../../organisms/provider'

// Material
import { Button, Select, TextField, Typography, CircularProgress } from '@material-ui/core'

// Model
import {
  FormSchema,
  countries,
  countriesSemantic,
  provinces,
  provincesSemantic
} from '../../model'

// Styles
import styles from './styles.module.scss'


const DetailsForm = props => {
  const {
    handleNext,
    cart,
    auth
  } = props

  const [currentCart, sendCart] = cart
  const [currentAuth] = auth

  const { register, setValue, handleSubmit, errors } = useForm({
    resolver: yupResolver(FormSchema)
  })

  const [isInitial, setIsInitial] = useState(true)

  const loading = currentCart.matches({ loading: 'setDetails' })

  function _handleSubmit(data) {
    /**
     * NOTE:
     * =====
     * There are optional fields, therefor, only
     * send the fields that are actually required plus
     * the optionals that are present
     */

    let contact = {
      email: data.email
    }

    if(data.phone) {
      contact.phone = data.phone
    }

    let address = {
      addressLineOne: data.addressLineOne,
      suburb: data.suburb,
      'post_code': data.postCode,
      province: data.province,
      country: data.country
    }

    if(data.addressLineTwo) {
      address.addressLineTwo = data.addressLineTwo
    }

    sendCart('SET_DETAILS', {
      address,
      contact
    })

    setIsInitial(false)
  }

  const _autoFill = () => {
    /**
     * Shipping Details
     */
    if(currentCart.context?.cartData?.address) {
      setValue('addressLineOne', currentCart.context.cartData.address.addressLineOne)
      setValue('addressLineTwo', currentCart.context.cartData.address.addressLineTwo)
      setValue('suburb', currentCart.context.cartData.address.suburb)
      setValue('postCode', currentCart.context.cartData.address['post_code'])
      setValue('province', currentCart.context.cartData.address.province)
      setValue('country', currentCart.context.cartData.address.country)
    }

    /**
     * Contact Details
     */

    // Email
    if(currentCart.context?.cartData?.contact?.email) {
      setValue('email', currentCart.context.cartData.contact.email)
    }

    // Phone
    if(currentCart.context?.cartData?.contact?.phone) {
      setValue('phone', currentCart.context.cartData.contact.phone)
    }
  }

  // Auto Fill for logged in users (This should only happen once) and carts with addresses
  useEffect(() => {
    if(!currentCart.context?.cartData && !currentAuth.context?.user) return
  
    _autoFill()
  }, [currentAuth.context, currentCart.context])  // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Listen for a successful details set
   */
  useEffect(() => {
    function checkSuccessfulSubmit(state) {
      if(!isInitial && state.changed && state.event.type === 'done.invoke.loading.setCartDetails') {
        handleNext()
      }
    }

    CartService.onTransition(checkSuccessfulSubmit)

    return () => {
      CartService.off(checkSuccessfulSubmit)
    }
  }, [isInitial])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form
      className={styles['details']}
      onSubmit={handleSubmit(_handleSubmit)}
    >
      <section
        className={styles['section']}
      >
        <div
          className={styles['left']}
        >
          <Typography
            variant='h4'
            color='secondary'
          >
            <b>Shipping information</b>
          </Typography>

          <Typography>
            This is where we will ship your order.
          </Typography>
        </div>

        <div
          className={styles['right']}
        >
          <div
            className={styles['field']}
          >
            <Typography
              className={styles['label']}
            >
              <b>Address</b>
            </Typography>

            <TextField
              variant='outlined'
              color='secondary'
              size='small'
              className={styles['input']}
              name='addressLineOne'
              inputRef={register}
              error={errors.addressLineOne}
              helperText={errors.addressLineOne?.message}
              disabled={loading}
            />
            <TextField
              variant='outlined'
              color='secondary'
              size='small'
              className={styles['input']}
              name='addressLineTwo'
              inputRef={register}
              error={errors.addressLineTwo}
              helperText={errors.addressLineTwo?.message}
              disabled={loading}
            />
          </div>

          <div
            className={styles['field']}
          >
            <Typography
              className={styles['label']}
            >
              <b>Suburb | City</b>
            </Typography>

            <TextField
              variant='outlined'
              color='secondary'
              size='small'
              className={styles['input']}
              name='suburb'
              inputRef={register}
              error={errors.suburb}
              helperText={errors.suburb?.message}
              disabled={loading}
            />
          </div>

          <div
            className={styles['field']}
          >
            <Typography
              className={styles['label']}
            >
              <b>Postal Code</b>
            </Typography>

            <TextField
              variant='outlined'
              type='number'
              color='secondary'
              size='small'
              className={styles['input']}
              name='postCode'
              inputRef={register}
              error={errors.postCode}
              helperText={errors.postCode?.message}
              disabled={loading}
            />
          </div>

          <div
            className={styles['field']}
          >
            <Typography
              className={styles['label']}
            >
              <b>Province</b>
            </Typography>

            <Select
              native
              color='secondary'
              variant='outlined'
              className={styles['input']}
              name='province'
              inputRef={register}
              error={errors.province}
              helperText={errors.province?.message}
              disabled={loading}
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
          </div>

          <div
            className={styles['field']}
          >
            <Typography
              className={styles['label']}
            >
              <b>Country</b>
            </Typography>

            <Select
              native
              color='secondary'
              variant='outlined'
              className={styles['input']}
              name='country'
              inputRef={register}
              error={errors.country}
              helperText={errors.country?.message}
              disabled={loading}
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
          </div>
        </div>
      </section>

      <section
        className={styles['section']}
      >
        <div
          className={styles['left']}
        >
          <Typography
            variant='h4'
            color='secondary'
          >
            <b>Contact Information</b>
          </Typography>

          <Typography>
            This is how we will reach out to you, concerning your order.
          </Typography>
        </div>

        <div
          className={styles['right']}
        >
          <div
            className={styles['field']}
          >
            <Typography
              className={styles['label']}
            >
              <b>Email</b>
            </Typography>

            <TextField
              variant='outlined'
              color='secondary'
              size='small'
              className={styles['input']}
              name='email'
              inputRef={register}
              error={errors.email}
              helperText={errors.email?.message}
              disabled={loading}
            />
          </div>

          <div
            className={styles['field']}
          >
            <Typography
              className={styles['label']}
            >
              <b>Contact Number</b>
            </Typography>

            <TextField
              variant='outlined'
              color='secondary'
              size='small'
              className={styles['input']}
              name='phone'
              inputRef={register}
              error={errors.phone}
              helperText={errors.phone?.message}
              disabled={loading}
            />
          </div>
        </div>
      </section>

      <div
        className={styles['actions']}
      >
        <Button
          variant='contained'
          color='secondary'
          type='submit'
          disableElevation
          disabled={loading}
          className={styles['action']}
        >
          Save
        </Button>

        {
          loading && (
            <CircularProgress
              size={20}
              color='secondary'
            />
          )
        }
      </div>
    </form>
  )
}

export default DetailsForm

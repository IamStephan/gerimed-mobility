import React from 'react'

// Material
import {
  Typography,
  Divider,
  TextField,
  Select,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

// Hooks
import { useService } from '@xstate/react'
import { useForm } from 'react-hook-form'

// Form
import { yupResolver } from '@hookform/resolvers'

// Model
import {
  FormSchema,
  provinces,
  provincesSemantic,
  countries,
  countriesSemantic
} from './model'

// Global Controller
import { CartService } from '../../organisms/provider'

// Template
import { Section } from '../../templates/content_layout'

// Styles
import styles from './styles.module.scss'

const CheckoutView = () => {
  const [current, send] = useService(CartService)

  function _handleSubmit(data) {

  }

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(FormSchema)
  })

  return (
    <Section
      className={styles['checkoutSection']}
    >

      <Typography
        gutterBottom
        variant='h3'
        color='secondary'
      >
        <b>Checkout</b>
      </Typography>

      <br />
      <Alert
        severity='warning'
      >
        <AlertTitle>
          <b>Checkout Temporarily Disabled</b>
        </AlertTitle>
        We are currently in the process of refining your checkout experience and the checkout should be up and running in no time.
      </Alert>
    </Section>
  )

  return (
    <Section
      className={styles['checkoutSection']}
    >
      <Typography
        gutterBottom
        variant='h3'
        color='secondary'
      >
        <b>Checkout</b>
      </Typography>

      <div
        className={styles['checkoutView']}
      >
        <div
          className={styles['left']}
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
                className={styles['sectionExplain']}
              >
                <Typography
                  color='secondary'
                  variant='h5'
                >
                  <b>Shipping Address</b>
                </Typography>

                <Typography
                  variant='body2'
                >
                  This is where we will deliver your order.
                </Typography>
              </div>

              {/* <Divider
                orientation='vertical'
                flexItem
              /> */}

              <div
                className={styles['sectionForm']}
              >
                <div
                  className={styles['field']}
                >
                  <TextField
                    className={styles['input']}
                    variant='outlined'
                    color='secondary'
                    label='Address Line Two'
                  />
                </div>

                <div
                  className={styles['field']}
                >
                  <TextField
                    className={styles['input']}
                    variant='outlined'
                    color='secondary'
                    label='Suburb'
                  />
                </div>

                <div
                  className={styles['field']}
                >
                  <TextField
                    className={styles['input']}
                    variant='outlined'
                    color='secondary'
                    label='Postal Code'
                  />
                </div>

                <div
                  className={styles['field']}
                >
                  <Select
                    native
                    color='secondary'
                    variant='outlined'
                    name='province'
                    label='Province'
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
                  <Select
                    native
                    color='secondary'
                    variant='outlined'
                    name='country'
                    label='Country'
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
            </div>

            <div
              className={styles['row']}
            >
              <div
                className={styles['sectionExplain']}
              >
                <Typography
                  color='secondary'
                  variant='h5'
                >
                  <b>Contact Details</b>
                </Typography>

                <Typography
                  variant='body2'
                >
                  Prefered method of us reaching out to you
                </Typography>
              </div>

              <div
                className={styles['sectionForm']}
              >
                <div
                  className={styles['field']}
                >
                  <TextField
                    className={styles['input']}
                    variant='outlined'
                    color='secondary'
                    label='Email'
                  />
                </div>

                <div
                  className={styles['field']}
                >
                  <TextField
                    className={styles['input']}
                    variant='outlined'
                    color='secondary'
                    label='Contact Number'
                  />
                </div>
              </div>
            </div>
          </form>
          
        </div>

        <div
          className={styles['right']}
        >

        </div>
      </div>
    </Section>
  )
}

export default CheckoutView

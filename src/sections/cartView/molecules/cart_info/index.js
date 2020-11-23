import React, { useCallback } from 'react'

// Material
import {
  Divider,
  Typography,
  Button,

  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core'
import {
  ChevronRightOutlined,
} from '@material-ui/icons'

// Gatsby
import { Link } from 'gatsby'

// Utils
import { CalculateCartTotals } from '../../../../utils/js/calculateCartTotals'
import { ShippingOptions } from '../../../../utils/js/calculateShipping'
import { Rand } from '../../../../utils/js'

// Styles
import styles from '../../styles.module.scss'

// Constants

const CartInfo = props => {
  const {
    products = [],
    isEditing = false,
    shippingOption,
    setShippingOption,
    saveShippingOption = () => {}
  } = props

  function _handleRadio(e) {
    const { target: { value } } = e

    setShippingOption(value)
  }

  function _handleProceed() {
    saveShippingOption()
  }

  const totals = useCallback((products) => {
    return CalculateCartTotals(products, shippingOption)
  }, [shippingOption])

  return (
    <div
      className={styles['cartInfo']}
    >
      <div
        className={styles['row']}
      >
        <Typography
          variant='overline'
        >
          Products: 
        </Typography>

        <Typography
          className={styles['amount']}
        >
          { Rand(totals(products).productsTotal).format() }
        </Typography>
      </div>

      <div
        className={styles['row']}
      >
        <Typography
          variant='overline'
        >
          Shipping: 
        </Typography>

        <Typography
          className={styles['amount']}
        >
          { Rand(totals(products).shippingTotal).format() }
        </Typography>
      </div>

      {
        (totals(products).savingsTotal > 0) && (
          <div
            className={styles['row']}
          >
            <Typography
              variant='overline'
            >
              Discount: 
            </Typography>
    
            <Typography
              className={styles['amount']}
            >
              - { Rand(totals(products).savingsTotal).format() }
            </Typography>
          </div>
        )
      }

      <Divider />

      <div
        className={styles['row']}
      >
        <Typography
          variant='overline'
        >
          Total: 
        </Typography>

        <Typography
          className={styles['amount']}
        >
          <b>{ Rand(totals(products).total).format() }</b>
        </Typography>
      </div>

      <Divider /> <br />

      <div>
        <FormControl
          color='secondary'
        >
          <FormLabel>
            Shipping Options
          </FormLabel>

          <RadioGroup
            value={shippingOption}
            onChange={_handleRadio}
          >
            <FormControlLabel
              control={<Radio />}
              value={ShippingOptions.courierGuy}
              label='The Courier Guy'
            />
            <FormControlLabel
              control={<Radio />}
              value={ShippingOptions.store}
              label='Store collection'
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div
        className={styles['rowEnd']}
      >
        <Button
          disableElevation
          endIcon={<ChevronRightOutlined />}
          color='secondary'
          variant='contained'
          onClick={_handleProceed}
          disabled={isEditing}
        >
          Proceed
        </Button>
      </div>
    </div>
  )
}

export default CartInfo

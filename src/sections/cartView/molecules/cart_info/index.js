import React, { useCallback } from 'react'

// Material
import { Divider, Typography, Button } from '@material-ui/core'
import {
  ChevronRightOutlined,
} from '@material-ui/icons'

// Gatsby
import { Link } from 'gatsby'

// Utils
import { shipping } from '../../../../utils/js/calculateShipping'
import { Rand } from '../../../../utils/js'

// Styles
import styles from '../../styles.module.scss'

const CartInfo = props => {
  const {
    products = [],
    isEditing = false
  } = props

  const totals = useCallback((products) => {
    const productsTotal = products.reduce((acc, curr) => {
      return acc + (curr.product.price * curr.quantity) 
    }, 0)

    const shippingWeight = products.reduce((acc, curr) => {
      let weight = 0

      if(curr.product.weight) {
        weight = curr.product.weight
      }

      return acc + (weight * curr.quantity)
    }, 0) 

    const shippingTotal = shipping.courierGuy(shippingWeight)

    const savingsTotal = products.reduce((acc, curr) => {
      let discount = 0

      if(curr.product.product_discount?.discounted_price) {
        discount = curr.product.price - curr.product.product_discount?.discounted_price
      }

      return acc + (discount * curr.quantity)
    }, 0)

    const total = productsTotal + shippingTotal - savingsTotal

    return {
      productsTotal,
      shippingTotal,
      savingsTotal,
      total
    }
  }, [])

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
              Savings: 
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

      <div
        className={styles['rowEnd']}
      >
        <Button
          disableElevation
          endIcon={<ChevronRightOutlined />}
          color='secondary'
          variant='contained'
          component={Link}
          to='/checkout'
          disabled={isEditing}
        >
          Proceed
        </Button>
      </div>

      
    </div>
  )
}

export default CartInfo

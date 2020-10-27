import React, { useCallback } from 'react'

// Material
import {
  Typography,
  Avatar,
  IconButton,
  Chip,
  TextField
} from '@material-ui/core'
import {
  CloseOutlined,
} from '@material-ui/icons'

// Gatsby
import { navigate } from 'gatsby'

// Utils
import { stringify } from 'qs'
import { Rand } from '../../../../utils/js/currency'
import { strapiImageUrl } from '../../../../utils/js'

// Styles
import styles from '../../styles.module.scss'

const CartItem = props => {
  const {
    product,
    isEditing,
    handleProductQuantity = null,
    handleProductRemove = null,
    index
  } = props

  function _categoryFilter(category) {
    let filter = {
      categories: [category]
    }

    let queryString = stringify(filter)

    navigate(`/shop?${queryString}`)
  }

  const urlPicker = useCallback((url, formats) => {
    const preferedSize = 'thumbnail'
    const baseUrl = process.env.GATSBY_API_URL

    return strapiImageUrl(preferedSize, baseUrl, url, formats)
  }, [])

  function _handleChange(e) {
    if(!handleProductQuantity) return

    const { target: { value } } = e

    handleProductQuantity(index, value)
  }

  const priceToDisplay = useCallback(() => {
    const shopOnlyI = product.product.shopOnly
    const isLimitedI = product.product.isLimited
    const outOfStockI = (Number(product.quantity) < 1)
    const onSaleI = !!product.product.product_discount?.discounted_price

    const SalePrice = () => (
      <>
        <strike
          className={styles['strike']}
        >
          {Rand(product.product.price).format()}  
        </strike>
        {' '}
        { Rand(product.product.product_discount?.discounted_price).format() }
      </>
    )

    if(shopOnlyI) {
      return '-'
    } else {
      if(isLimitedI) {
        if(outOfStockI) {
          return Rand(product.product.price).format()
        } else if(onSaleI) {
          return <SalePrice />
        } else {
          return Rand(product.product.price).format()
        }
      } else {
        if(onSaleI) {
          return <SalePrice />
        } else {
          return Rand(product.product.price).format()
        }
      }
    }
  }, [])

  return (
    <div
      className={styles['cartItem']}
    >
      <div
        className={styles['img']}
      >
        <Avatar
          variant='square'
          className={styles['imgShowcase']}
          src={urlPicker(product.product.showcase[0].url, product.product.showcase[0].formats)}
        />
      </div>

      <div
        className={styles['data']}
      >
        <Typography
          className={styles['title']}
        >
          <b>{product.product.name}</b>
        </Typography>

        <Typography
          className={styles['price']}
        >
          { priceToDisplay() }
        </Typography>

        <div
          className={styles['categoryContainer']}
        >
          {
            product.product.categories.length ? product.product.categories.map((category, i) => (
              <Chip
                key={category.id}
                className={styles['category']}
                label={category.name}
                color='secondary'
                variant='outlined'
                onClick={() => _categoryFilter(category.name)}
                size='small'
                clickable
              />
            )) : (
              <Chip
                className={styles['category']}
                label={'Unsorted'}
                color='secondary'
                variant='outlined'
                size='small'
                clickable
              />
            )
          }
        </div>
      </div>

      <div
        className={styles['input']}
      >
        <TextField
          disabled={!isEditing}
          variant='outlined'
          color='secondary'
          type='number'
          label='Quantity'
          value={product.quantity}
          onChange={_handleChange}
        />
      </div>

      {
        isEditing && (
          <div
            className={styles['remove']}
          >
            <IconButton
              size='small'
              onClick={() => handleProductRemove(index)}
            >
              <CloseOutlined
                fontSize='inherit'
              />
            </IconButton>
          </div>
        )
      }
    </div>
  )
}

export default CartItem

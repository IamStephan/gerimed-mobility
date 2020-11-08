import React, { useCallback } from 'react'

// Material
import {
  Typography,
  Avatar,
  IconButton,
  Chip,
  TextField,
  Link as Btn
} from '@material-ui/core'
import {
  CloseOutlined,
} from '@material-ui/icons'

// Gatsby
import { navigate, Link } from 'gatsby'

// Truncate
import TruncateText from 'react-text-truncate'

// Utils
import { stringify } from 'qs'
import { Rand } from '../../../../utils/js/currency'
import { strapiImageUrl } from '../../../../utils/js'

// Styles
import styles from '../../styles.module.scss'

const Title = props => {
  const {
    productID,
    title
  } = props

  return (
    <Typography
      className={styles['titleContainer']}
      component='div'
    >
      <Btn
        color='inherit'
        className={styles['title']}
        component={Link}
        to={`/product?id=${productID}`}
      >
        <b>
          <TruncateText
            text={title}
            truncateText='...'
            line={2}
          />
        </b>
      </Btn>
    </Typography>
  )
}

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
        <span
          className={styles['normal']}
        >
          { Rand(product.product.product_discount?.discounted_price).format() }
        </span>
        
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
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

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
        <Title
          title={product.product.name}
          productID={product.product.id}
        />

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

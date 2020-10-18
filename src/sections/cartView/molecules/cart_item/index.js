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
    name,
    categories,
    showcase,
    quantity,
    price,
    isEditing,
    id
  } = props

  function _categoryFilter(category) {
    let filter = {
      categories: [category]
    }

    let queryString = stringify(filter)
    console.log(queryString)

    navigate(`/shop?${queryString}`)
  }

  const urlPicker = useCallback((url, formats) => {
    const preferedSize = 'thumbnail'
    const baseUrl = process.env.GATSBY_API_URL

    return strapiImageUrl(preferedSize, baseUrl, url, formats)
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
          src={urlPicker(showcase[0].url, showcase[0].formats)}
        />
      </div>

      <div
        className={styles['data']}
      >
        <Typography
          className={styles['title']}
        >
          <b>{name}</b>
        </Typography>

        <Typography
          className={styles['price']}
        >
          {Rand(price).format()}
        </Typography>

        <div
          className={styles['categoryContainer']}
        >
          {
            categories.length ? categories.map((category, i) => (
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
          value={quantity}
        />
      </div>

      {
        isEditing && (
          <div
            className={styles['remove']}
          >
            <IconButton
              size='small'
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

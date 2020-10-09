import React from 'react'

// Material
import {
  Divider,
  Typography,
  Avatar,
  IconButton
} from '@material-ui/core'
import {
  CloseOutlined
} from '@material-ui/icons'

// Templates
import { Section } from '../../templates/content_layout'

// Styles
import styles from './styles.module.scss'

const CartItem = props => {
  const {
    name,
    categories,
    url,
    quantity,
    id
  } = props

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
        >
          Item
        </Avatar>
      </div>

      <div
        className={styles['data']}
      >
        <div>
          Product Name
        </div>

        <div>
          Categories
        </div>
      </div>

      <div
        className={styles['input']}
      >
        Quantity
      </div>

      <div
        className={styles['remove']}
      >
        <IconButton>
          <CloseOutlined />
        </IconButton>
      </div>
    </div>
  )
}

const CartView = () => {
  return (
    <Section
      className={styles['cartContainer']}    
    >
      <Typography
        gutterBottom
        variant='h3'
        color='secondary'
      >
        <b>Your Cart</b>
      </Typography>

      <Divider />

      <div
        className={styles['cartView']}
      >
        <div
          className={styles['left']}
        >
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>

        <Divider
          orientation='vertical'
          flexItem
        />

        <div
          className={styles['right']}
        >
          tyghbj
        </div>
      </div>

    </Section>
  )
}

export default CartView

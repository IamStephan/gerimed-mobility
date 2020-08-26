import React from 'react'

// Lodash
import { round } from 'lodash'

// Material
import { Typography, Chip, Link as Btn } from '@material-ui/core'

// Gatsby
import { Link } from 'gatsby'

// Text
import TruncateText from 'react-text-truncate'

// Styles
import styles from './styles.module.scss'

const Title = props => {
  const {
    to,
    title
  } = props

  return (
    <Typography>
      <Btn
        color='inherit'
        className={styles['title']}
        component={Link}
        to={to}
      >
        <TruncateText
          text={title}
          truncateText='...'
          line={2}
        />
      </Btn>
    </Typography>
  )
}

const ShopItem = props => {
  const {
    name,
    price,
    showcase,
    categories
  } = props

  function formatPrice(price) {
    const currency = new Intl.NumberFormat('en-UK', {
      style: 'currency',
      currency: 'ZAR',
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 2
    })

    return currency.format(price)
  }

  return (
    <div
      className={styles['item']}
    >
      <div
        className={styles['imgContainer']}
      >
        <img
          className={styles['img']}
          src={`http://localhost:1337${showcase[0].url}`}
        />
      </div>
      
      <Title
        title={name}
      />

      <div
        className={styles['categoryContainer']}
      >
        {
          categories.map((category, i) => (
            <Chip
              key={category.id}
              className={styles['category']}
              label={category.name}
              color='secondary'
              variant='outlined'
              size='small'
              clickable
            />
          ))
        }
      </div>

      <Typography
        className={styles['price']}
      >
        {formatPrice(price)}
      </Typography>
    </div>
  )
}

export default ShopItem

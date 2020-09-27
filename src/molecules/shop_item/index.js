import React, { useCallback } from 'react'

// Material
import { Typography, Chip, Link as Btn } from '@material-ui/core'

// Gatsby
import { Link, navigate } from 'gatsby'

// URL
import { stringify } from 'qs'

// Text
import TruncateText from 'react-text-truncate'

// Utils
import { strapiImageUrl } from '../../utils/js'

// Styles
import styles from './styles.module.scss'

const Title = props => {
  const {
    productID,
    title
  } = props

  return (
    <Typography
      className={styles['titleContainer']}
    >
      <Btn
        color='inherit'
        className={styles['title']}
        component={Link}
        to={`/product?id=${productID}`}
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

/**
 * TODO:
 * ======
 *  - show when an item is depleted
 *  - show when an item is on sale
 *  - Show add to cart on hover
 */

const ShopItem = props => {
  const {
    id,
    name,
    price,
    showcase,
    categories
  } = props

  function _categoryFilter(category) {
    let filter = {
      categories: [category]
    }

    let queryString = stringify(filter)
    console.log(queryString)

    navigate(`/shop?${queryString}`)
  }

  const formatPrice = useCallback(() => {
    const currency = new Intl.NumberFormat('en-UK', {
      style: 'currency',
      currency: 'ZAR',
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 2
    })

    return currency.format(price)
  }, [])

  const url = useCallback(() => {
    const preferedSize = 'small'
    const baseUrl = process.env.GATSBY_API_URL
    const url = showcase[0].url
    const formats = showcase[0].formats

    return strapiImageUrl(preferedSize, baseUrl, url, formats)
  }, [])

  return (
    <div
      className={styles['item']}
    >
      <div
        className={styles['imgContainer']}
      >
        <Link
          to={`/product?id=${id}`}
        >
          <img
            className={styles['img']}
            src={url()}
          />
        </Link>
      </div>
      
      <Title
        title={name}
        productID={id}
      />

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

      <Typography
        className={styles['price']}
      >
        {formatPrice(price)}
      </Typography>
    </div>
  )
}

export default ShopItem
